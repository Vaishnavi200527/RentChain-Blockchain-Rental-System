
import { useState } from "react";
import {
  LayoutDashboard,
  FilePlus2,
  Files,
  History,
  Home,
  Wallet,
  Bell,
  Search,
  CheckCircle2,
} from "lucide-react";

import {
  connectWallet,
  createBlockchainAgreement
} from "./blockchain/contract";

import "./index.css";

// CURRENT GANACHE CONFIGURATION
const CHAIN_ID = 1337;
const CHAIN_HEX = "0x539";
const NETWORK_NAME = "Ganache Local Network";
const RPC_URL = "http://127.0.0.1:7545";

// Make sure MetaMask is connected to the correct Ganache network.
async function ensureGanacheNetwork() {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask.");
  }

  let chainId = await window.ethereum.request({
    method: "eth_chainId"
  });

  if (chainId.toLowerCase() !== CHAIN_HEX.toLowerCase()) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAIN_HEX }]
      });
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: CHAIN_HEX,
            chainName: NETWORK_NAME,
            nativeCurrency: {
              name: "Ether",
              symbol: "ETH",
              decimals: 18
            },
            rpcUrls: [RPC_URL]
          }]
        });
      } else {
        throw error;
      }
    }
  }
}

function getErrorMessage(error) {
  return (
    error?.reason ||
    error?.shortMessage ||
    error?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletError, setWalletError] = useState("");
  const [connecting, setConnecting] = useState(false);

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Create Agreement", icon: FilePlus2 },
    { name: "My Agreements", icon: Files },
    { name: "Transactions", icon: History }
  ];

  async function handleConnectWallet() {
    try {
      setConnecting(true);
      setWalletError("");

      await ensureGanacheNetwork();

      const wallet = await connectWallet();

      if (!wallet?.address) {
        throw new Error("Unable to retrieve wallet address.");
      }

      setWalletAddress(wallet.address);
    } catch (error) {
      setWalletError(getErrorMessage(error));
    } finally {
      setConnecting(false);
    }
  }

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">
            <Home size={23} />
          </div>

          <div>
            <h2>RentChain</h2>
            <span>Blockchain Rental System</span>
          </div>
        </div>

        <p className="menu-label">MAIN MENU</p>

        <nav>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="network-status">
            <span className="status-dot"></span>
            Local Blockchain
            <small>Ganache Network · {CHAIN_ID}</small>
          </div>
        </div>

      </aside>

      <main className="main-content">

        <header className="topbar">

          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search agreements..."
            />
          </div>

          <div className="top-actions">

            <button className="icon-button" type="button">
              <Bell size={19} />
            </button>

            <button
              className="wallet-button"
              onClick={handleConnectWallet}
              disabled={connecting}
              type="button"
            >
              <Wallet size={17} />

              {connecting
                ? "Connecting..."
                : walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : "Connect Wallet"}
            </button>

          </div>

        </header>

        {walletError && (
          <div className="error-message">
            {walletError}
          </div>
        )}

        <section className="page-content">

          {activePage === "Dashboard" && (
            <DashboardPage
              walletAddress={walletAddress}
              onCreate={() => setActivePage("Create Agreement")}
              onViewAll={() => setActivePage("My Agreements")}
            />
          )}

          {activePage === "Create Agreement" && (
            <CreateAgreementPage
              walletAddress={walletAddress}
              onConnect={handleConnectWallet}
            />
          )}

          {activePage === "My Agreements" && (
            <div className="welcome">
              <div>
                <p className="eyebrow">RENTCHAIN / AGREEMENTS</p>
                <h1>My Agreements</h1>
                <p className="subtitle">
                  View rental agreements recorded on the blockchain.
                </p>
                <p>
                  Agreement records will be displayed here.
                  Connect your contract data to load them.
                </p>
              </div>

              <button
                className="primary-button"
                onClick={() => setActivePage("Create Agreement")}
              >
                + Create Agreement
              </button>
            </div>
          )}

          {activePage === "Transactions" && (
            <div className="welcome">
              <div>
                <p className="eyebrow">RENTCHAIN / BLOCKCHAIN</p>
                <h1>Transactions</h1>
                <p className="subtitle">
                  Blockchain transaction history and verification.
                </p>
                <p>
                  Successfully submitted transaction hashes will
                  be available after connecting transaction history.
                </p>
              </div>
            </div>
          )}

        </section>

      </main>

    </div>
  );
}

function DashboardPage({
  walletAddress,
  onCreate,
  onViewAll
}) {
  return (
    <>
      <div className="welcome">

        <div>
          <p className="eyebrow">RENTCHAIN / OVERVIEW</p>

          <h1>Dashboard</h1>

          <p className="subtitle">
            Manage your rental agreements securely using blockchain.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={onCreate}
        >
          + Create Agreement
        </button>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Agreements"
          value="—"
          change="Awaiting blockchain data"
        />

        <StatCard
          title="Pending Agreements"
          value="—"
          change="Awaiting blockchain data"
        />

        <StatCard
          title="Accepted Agreements"
          value="—"
          change="Awaiting blockchain data"
        />

        <StatCard
          title="Blockchain Network"
          value={CHAIN_ID}
          change="Ganache Local Network"
        />

      </div>

      <div className="section-heading">

        <div>
          <h2>Recent Agreements</h2>
          <p>
            Overview of your rental agreement activity
          </p>
        </div>

        <button
          className="text-button"
          onClick={onViewAll}
        >
          View All
        </button>

      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>AGREEMENT ID</th>
              <th>PROPERTY</th>
              <th>MONTHLY RENT</th>
              <th>TENANT</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="5">
                No agreements loaded yet. Create an agreement
                to begin recording blockchain transactions.
              </td>
            </tr>
          </tbody>

        </table>

      </div>

      {walletAddress && (
        <div className="wallet-info">

          <h3>Connected Wallet</h3>

          <p>{walletAddress}</p>

          <span>
            Ganache Local Network · Chain ID: {CHAIN_ID}
          </span>

        </div>
      )}

      <div className="footer-note">
        <span className="status-dot"></span>
        Connected to Ganache Local Blockchain · Network ID: {CHAIN_ID}
      </div>

    </>
  );
}

function CreateAgreementPage({
  walletAddress,
  onConnect
}) {
  const [formData, setFormData] = useState({
    propertyReference: "",
    tenant: "",
    monthlyRent: "",
    securityDeposit: "",
    startDate: "",
    endDate: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
    setSuccess(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess(null);

    try {
      setLoading(true);

      if (!window.ethereum) {
        throw new Error("Please install MetaMask.");
      }

      // Validate wallet connection.
      await ensureGanacheNetwork();

      const accounts = await window.ethereum.request({
        method: "eth_accounts"
      });

      if (!accounts.length) {
        throw new Error(
          "Please connect your Landlord MetaMask account first."
        );
      }

      // Validate required fields.
      if (!formData.propertyReference.trim()) {
        throw new Error("Enter the property reference.");
      }

      if (!/^0x[a-fA-F0-9]{40}$/.test(formData.tenant.trim())) {
        throw new Error("Enter a valid tenant wallet address.");
      }

      if (
        formData.tenant.toLowerCase() ===
        accounts[0].toLowerCase()
      ) {
        throw new Error(
          "Landlord and tenant addresses must be different."
        );
      }

      if (
        !Number.isFinite(Number(formData.monthlyRent)) ||
        Number(formData.monthlyRent) <= 0
      ) {
        throw new Error("Monthly rent must be greater than zero.");
      }

      if (
        !Number.isFinite(Number(formData.securityDeposit)) ||
        Number(formData.securityDeposit) < 0
      ) {
        throw new Error("Security deposit cannot be negative.");
      }

      if (!formData.startDate || !formData.endDate) {
        throw new Error("Please select both rental dates.");
      }

      const startTimestamp = Math.floor(
        new Date(formData.startDate + "T00:00:00").getTime() / 1000
      );

      const endTimestamp = Math.floor(
        new Date(formData.endDate + "T00:00:00").getTime() / 1000
      );

      if (startTimestamp <= Math.floor(Date.now() / 1000)) {
        throw new Error("Rental start date must be in the future.");
      }

      if (endTimestamp <= startTimestamp) {
        throw new Error(
          "Rental end date must be after the start date."
        );
      }

      // Create blockchain transaction.
      const result = await createBlockchainAgreement(formData);

      setSuccess(result);

      // Clear form after successful transaction.
      setFormData({
        propertyReference: "",
        tenant: "",
        monthlyRent: "",
        securityDeposit: "",
        startDate: "",
        endDate: ""
      });

    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="welcome">

        <div>
          <p className="eyebrow">RENTCHAIN / AGREEMENTS</p>

          <h1>Create Agreement</h1>

          <p className="subtitle">
            Enter rental details and record the agreement on blockchain.
          </p>
        </div>

      </div>

      <div className="form-card">

        <div className="form-heading">

          <div className="form-heading-icon">
            <FilePlus2 size={22} />
          </div>

          <div>
            <h2>Rental Agreement Details</h2>

            <p>
              Complete all required fields to create a new agreement.
            </p>
          </div>

        </div>

        {!walletAddress ? (
          <div className="form-note">
            <strong>Connect your Landlord wallet first.</strong>

            <button
              type="button"
              className="primary-button"
              onClick={onConnect}
            >
              <Wallet size={17} /> Connect MetaMask
            </button>
          </div>
        ) : (
          <div className="form-note">
            <strong>Connected Landlord:</strong>
            <span>{walletAddress}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-field">

              <label htmlFor="propertyReference">
                Property Reference *
              </label>

              <input
                id="propertyReference"
                name="propertyReference"
                type="text"
                placeholder="e.g. FLAT-A105"
                value={formData.propertyReference}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-field">

              <label htmlFor="tenant">
                Tenant Wallet Address *
              </label>

              <input
                id="tenant"
                name="tenant"
                type="text"
                placeholder="0x..."
                value={formData.tenant}
                onChange={handleChange}
                required
              />

              <small>
                Enter the tenant's Ganache/MetaMask wallet address.
              </small>

            </div>

            <div className="form-field">

              <label htmlFor="monthlyRent">
                Monthly Rent (₹) *
              </label>

              <input
                id="monthlyRent"
                name="monthlyRent"
                type="number"
                min="1"
                step="1"
                placeholder="e.g. 15000"
                value={formData.monthlyRent}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-field">

              <label htmlFor="securityDeposit">
                Security Deposit (₹)
              </label>

              <input
                id="securityDeposit"
                name="securityDeposit"
                type="number"
                min="0"
                step="1"
                placeholder="e.g. 30000"
                value={formData.securityDeposit}
                onChange={handleChange}
              />

            </div>

            <div className="form-field">

              <label htmlFor="startDate">
                Rental Start Date *
              </label>

              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />

            </div>

            <div className="form-field">

              <label htmlFor="endDate">
                Rental End Date *
              </label>

              <input
                id="endDate"
                name="endDate"
                type="date"
                min={formData.startDate || undefined}
                value={formData.endDate}
                onChange={handleChange}
                required
              />

            </div>

          </div>

          <div className="form-note">

            <strong>Blockchain network:</strong>

            {NETWORK_NAME}

            <span>Chain ID: {CHAIN_ID}</span>

            <span>RPC: {RPC_URL}</span>

          </div>

          {error && (
            <div className="error-message form-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">

              <CheckCircle2 size={24} />

              <h3>Agreement created successfully!</h3>

              <p>
                Agreement ID: #{success.agreementId}
              </p>

              <p>Transaction Hash:</p>

              <code>{success.transactionHash}</code>

              <p className="success-hint">
                Transaction confirmed on Ganache.
              </p>

              {success.transactionHash && (
                <button
                  type="button"
                  className="text-button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      success.transactionHash
                    )
                  }
                >
                  Copy Transaction Hash
                </button>
              )}

            </div>
          )}

          <div className="form-actions">

            <button
              type="reset"
              className="secondary-button"
              disabled={loading}
              onClick={() => {
                setFormData({
                  propertyReference: "",
                  tenant: "",
                  monthlyRent: "",
                  securityDeposit: "",
                  startDate: "",
                  endDate: ""
                });
                setError("");
                setSuccess(null);
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading || !walletAddress}
            >
              {loading
                ? "Waiting for confirmation..."
                : "Create on Blockchain"}
            </button>

          </div>

        </form>

      </div>

    </>
  );
}

function StatCard({ title, value, change }) {
  return (
    <div className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <span>{change}</span>
    </div>
  );
}

export default App;
