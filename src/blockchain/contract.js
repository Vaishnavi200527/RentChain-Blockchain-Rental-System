
import { ethers } from "ethers";

// =====================================
// GANACHE CONFIGURATION
// =====================================

export const GANACHE_CHAIN_ID = 1337;

export const GANACHE_RPC_URL = "http://127.0.0.1:7545";

// =====================================
// DEPLOYED CONTRACT ADDRESS
// =====================================
export const CONTRACT_ADDRESS =
  "0xEBA5E2B1780ca9fEA27aE2844372CDa2F4bE97d2";

// =====================================
// RENTAL AGREEMENT ABI
// =====================================

export const CONTRACT_ABI = [
  "function nextAgreementId() view returns (uint256)",

  "function createAgreement(string _propertyReference, address _tenant, uint256 _monthlyRent, uint256 _securityDeposit, uint256 _startDate, uint256 _endDate) returns (uint256)",

  "function acceptAgreement(uint256 _id)",

  "function getAgreement(uint256 _id) view returns (uint256 id, string propertyReference, address landlord, address tenant, uint256 monthlyRent, uint256 securityDeposit, uint256 startDate, uint256 endDate, bool accepted, uint256 createdAt)",

  "event AgreementCreated(uint256 indexed id, address indexed landlord, address indexed tenant)",

  "event AgreementAccepted(uint256 indexed id, address indexed tenant)"
];

// =====================================
// CONNECT METAMASK WALLET
// =====================================

export async function connectWallet() {

  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  if (!accounts || accounts.length === 0) {
    throw new Error("No MetaMask account found.");
  }

  const provider = new ethers.BrowserProvider(
    window.ethereum
  );

  const network = await provider.getNetwork();

  if (Number(network.chainId) !== GANACHE_CHAIN_ID) {
    throw new Error(
      "Please connect to Ganache Local (Chain ID: 1337)."
    );
  }

  return {
    address: ethers.getAddress(accounts[0]),
    provider
  };
}

// =====================================
// GET CONTRACT INSTANCE
// =====================================

export async function getRentalContract(
  withSigner = false
) {

  const { provider } = await connectWallet();

  const code = await provider.getCode(
    CONTRACT_ADDRESS
  );

  if (code === "0x") {
    throw new Error(
      "Contract not found. Please deploy RentalAgreement on the current Ganache network and update CONTRACT_ADDRESS."
    );
  }

  const signer = withSigner
    ? await provider.getSigner()
    : provider;

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );
}

// =====================================
// CREATE RENTAL AGREEMENT
// =====================================

export async function createBlockchainAgreement(formData) {

  const { address: landlordAddress } =
    await connectWallet();

  if (!ethers.isAddress(formData.tenant)) {
    throw new Error("Invalid tenant wallet address.");
  }

  const tenantAddress = ethers.getAddress(
    formData.tenant.trim()
  );

  if (
    tenantAddress.toLowerCase() ===
    landlordAddress.toLowerCase()
  ) {
    throw new Error(
      "Tenant address must be different from landlord address."
    );
  }

  if (!formData.propertyReference?.trim()) {
    throw new Error("Property reference is required.");
  }

  const monthlyRent = BigInt(formData.monthlyRent);

  const securityDeposit = BigInt(
    formData.securityDeposit || "0"
  );

  if (monthlyRent <= 0n || securityDeposit < 0n) {
    throw new Error("Invalid rent or security deposit.");
  }

  const startTimestamp = Math.floor(
    new Date(
      `${formData.startDate}T00:00:00`
    ).getTime() / 1000
  );

  const endTimestamp = Math.floor(
    new Date(
      `${formData.endDate}T00:00:00`
    ).getTime() / 1000
  );

  if (
    !Number.isFinite(startTimestamp) ||
    !Number.isFinite(endTimestamp)
  ) {
    throw new Error("Invalid rental dates.");
  }

  if (
    startTimestamp <= Math.floor(Date.now() / 1000)
  ) {
    throw new Error(
      "Rental start date must be in the future."
    );
  }

  if (endTimestamp <= startTimestamp) {
    throw new Error(
      "Rental end date must be after the start date."
    );
  }

  const contract = await getRentalContract(true);

  const nextId = await contract.nextAgreementId();

  const transaction = await contract.createAgreement(
    formData.propertyReference.trim(),
    tenantAddress,
    monthlyRent,
    securityDeposit,
    BigInt(startTimestamp),
    BigInt(endTimestamp)
  );

  const receipt = await transaction.wait();

  if (!receipt || receipt.status !== 1) {
    throw new Error("Transaction failed.");
  }

  let agreementId = null;

  for (const log of receipt.logs) {
    try {
      const parsed = contract.interface.parseLog(log);

      if (parsed?.name === "AgreementCreated") {
        agreementId = parsed.args.id.toString();
        break;
      }
    } catch {
      // Ignore unrelated logs.
    }
  }

  if (agreementId === null) {
    agreementId = nextId.toString();
  }

  return {
    agreementId,
    transactionHash: receipt.hash,
    blockNumber: receipt.blockNumber,
    landlordAddress,
    tenantAddress
  };
}

// =====================================
// GET AGREEMENT DETAILS
// =====================================

export async function getAgreement(agreementId) {

  const contract = await getRentalContract(false);

  const a = await contract.getAgreement(
    BigInt(agreementId)
  );

  return {
    id: a.id.toString(),
    propertyReference: a.propertyReference,
    landlord: a.landlord,
    tenant: a.tenant,
    monthlyRent: a.monthlyRent.toString(),
    securityDeposit: a.securityDeposit.toString(),
    startDate: a.startDate.toString(),
    endDate: a.endDate.toString(),
    accepted: a.accepted,
    createdAt: a.createdAt.toString()
  };
}

// =====================================
// TENANT ACCEPT AGREEMENT
// =====================================

export async function acceptBlockchainAgreement(
  agreementId
) {

  const contract = await getRentalContract(true);

  const signerAddress =
    await contract.runner.getAddress();

  const agreement = await contract.getAgreement(
    BigInt(agreementId)
  );

  if (
    agreement.tenant.toLowerCase() !==
    signerAddress.toLowerCase()
  ) {
    throw new Error(
      "Only the designated tenant can accept this agreement."
    );
  }

  if (agreement.accepted) {
    throw new Error(
      "Agreement has already been accepted."
    );
  }

  const transaction = await contract.acceptAgreement(
    BigInt(agreementId)
  );

  const receipt = await transaction.wait();

  if (!receipt || receipt.status !== 1) {
    throw new Error("Agreement acceptance failed.");
  }

  return {
    agreementId: agreementId.toString(),
    transactionHash: receipt.hash,
    blockNumber: receipt.blockNumber
  };
}
