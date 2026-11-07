# 🏠 RentChain – Blockchain-Based Rental Agreement System

A decentralized rental agreement management application built using **React.js, Solidity, Ethereum, MetaMask, Ganache, Remix IDE and Ethers.js**.

RentChain allows landlords to create rental agreements and tenants to accept them through their blockchain wallets. Agreement details and acceptance status are recorded on a local Ethereum-compatible blockchain using Solidity smart contracts.

---

## 📌 1. Project Overview

Traditional rental agreements generally involve paperwork, manual verification, signatures and centralized record keeping.

RentChain aims to make this process more transparent and secure using blockchain technology.

The application provides two main user roles:

- **Landlord:** Connects their wallet, enters rental details and creates a blockchain-based rental agreement.
- **Tenant:** Connects their own wallet and accepts the rental agreement.

The smart contract validates the operations and stores the agreement information on the blockchain.

### Main Features

- MetaMask wallet integration.
- Landlord and tenant wallet interaction.
- Creation of digital rental agreements.
- Unique agreement ID generation.
- Smart contract-based input validation.
- Tenant authorization before acceptance.
- Prevention of duplicate acceptance.
- Blockchain transaction confirmation.
- Event generation and transaction logs.
- Retrieval and verification of agreement details.

---

## 🛠️ 2. Technologies and Tools Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML and CSS | User interface and styling |
| Solidity | Smart contract development |
| Ethereum | Blockchain platform |
| Remix IDE | Smart contract compilation and deployment |
| MetaMask | Blockchain wallet and transaction approval |
| Ganache | Local Ethereum blockchain |
| Ethers.js | React-to-blockchain communication |
| Node.js | JavaScript runtime |
| npm | Package management |
| Vite | Frontend development server |
| VS Code | Code editor |
| Git and GitHub | Source code management |

---

## 💻 3. Prerequisites

Before starting, install the following software.

### 3.1 Node.js and npm

Download Node.js from:

https://nodejs.org/

Install the recommended LTS version.

Verify installation in the terminal:

```bash
node -v
npm -v
```

Both commands should display version numbers.

### 3.2 Visual Studio Code

Download:

https://code.visualstudio.com/

VS Code is used to open the project, edit source code and run terminal commands.

### 3.3 Ganache

Download Ganache:

https://archive.trufflesuite.com/ganache/

Ganache provides a local Ethereum blockchain with test accounts and ETH balances.

### 3.4 MetaMask

Install the MetaMask browser extension:

https://metamask.io/

MetaMask is used to connect landlord and tenant accounts and approve transactions.

### 3.5 Remix IDE

Open:

https://remix.ethereum.org/

Remix is used to compile, deploy and interact with the Solidity smart contract.

---

## 📥 4. Clone the GitHub Repository

Open the terminal in VS Code or PowerShell.

Clone the project:

```bash
git clone https://github.com/Vaishnavi200527/RentChain-Blockchain-Rental-System.git
```

Move into the project directory:

```bash
cd RentChain-Blockchain-Rental-System
```

Open the project in VS Code:

```bash
code .
```

Alternatively, open the cloned folder manually using VS Code.

---

## 📦 5. Install Project Dependencies

Open the VS Code terminal inside the project directory.

Run:

```bash
npm install
```

This command installs all dependencies listed in `package.json`.

The project uses packages such as:

- React
- React DOM
- Ethers.js
- Lucide React
- Vite

Wait until the installation finishes.

---

## ⛓️ 6. Set Up Ganache Local Blockchain

Ganache provides the local blockchain used for testing the application.

### Step 1: Open Ganache

Launch Ganache and create or open a workspace.

### Step 2: Configure the Network

Use the following configuration:

| Setting | Value |
|---|---|
| Network Name | Ganache Local Network |
| RPC URL | `http://127.0.0.1:7545` |
| Chain ID | `1337` |
| Currency | ETH |

Make sure the Ganache server is running on port `7545`.

**Important:** The Chain ID reported by the RPC endpoint must be `1337`. The RPC URL and Chain ID must match the network configured in MetaMask and the React application.

### Step 3: Check Ganache Accounts

Ganache generates multiple accounts, each containing test ETH.

For this project, use:

- Account 0 – Landlord
- Account 1 – Tenant

You can use different Ganache accounts if needed, but remember to update the tenant address in the agreement form.

---

## 🦊 7. Configure MetaMask

MetaMask connects the application and Remix to Ganache.

### Step 1: Add the Ganache Network

Open MetaMask.

If Ganache Local is not already configured, add a custom network.

Enter:

| Setting | Value |
|---|---|
| Network Name | Ganache Local |
| RPC URL | `http://127.0.0.1:7545` |
| Chain ID | `1337` |
| Currency Symbol | ETH |

If the network already exists, select it instead of creating a duplicate.

### Step 2: Import Ganache Accounts

To use the landlord and tenant accounts:

1. Open Ganache.
2. Select Account 0.
3. Reveal and copy its private key.
4. Open MetaMask.
5. Use the account import option.
6. Import Account 0 as the Landlord.
7. Repeat the process with Account 1 as the Tenant.

**Security warning:**

- Use only local test accounts generated by Ganache.
- Never use your personal wallet's private key.
- Never upload private keys to GitHub.
- Never share private keys in screenshots, messages or project documentation.
- Do not use Ganache test accounts for real funds.

### Step 3: Identify the Accounts

| Account | Role |
|---|---|
| Ganache Account 0 | Landlord |
| Ganache Account 1 | Tenant |

The landlord creates the agreement, and only the registered tenant can accept it.

---

## 📜 8. Smart Contract Compilation and Deployment

**IMPORTANT: Every team member must obtain the Solidity smart contract code directly from this GitHub repository. The contract code is already included in the project. You do not need to write the contract yourself or ask another team member to send it separately.**

### Step 1: Locate the Solidity File in the Repository

1. Open the cloned project in VS Code.
2. In the VS Code Explorer, open the `src` folder.
3. Inside `src`, open the `contracts` folder.
4. Locate the file named `RentalAgreement.sol`.

The exact path is:

```text
RentChain-Blockchain-Rental-System/
└── src/
    └── contracts/
        └── RentalAgreement.sol
```

5. Open `RentalAgreement.sol`.
6. Select the complete Solidity code using `Ctrl + A`.
7. Copy the code using `Ctrl + C`.

**This is the original smart contract source code provided in the GitHub repository. Use this exact file for deployment.**

### Step 2: Paste the Code into Remix IDE

1. Open https://remix.ethereum.org/
2. Open the File Explorer panel on the left.
3. Create a new file named `RentalAgreement.sol`.
4. Open the newly created file.
5. Paste the complete code copied from `src/contracts/RentalAgreement.sol` in VS Code using `Ctrl + V`.
6. Save the file.

**Alternative method:** You can also download the `RentalAgreement.sol` file from the GitHub repository and upload it directly into the Remix workspace using the File Explorer upload option.

Do not paste the GitHub README contents. Only copy the Solidity source code from `RentalAgreement.sol`.

### Step 3: Compile the Contract

1. Open the Solidity Compiler panel in Remix.
2. Select Solidity compiler version `0.8.20` or a compatible version.
3. Select `RentalAgreement.sol`.
4. Click **Compile RentalAgreement.sol**.
5. Confirm that compilation is successful.

### Step 4: Connect Remix to MetaMask

1. Open Deploy & Run Transactions.
2. Select **Browser Extension** as the environment.
3. Connect MetaMask when prompted.
4. Make sure MetaMask is connected to Ganache Local.
5. Select the Landlord account (Ganache Account 0).

### Step 5: Deploy the Contract

1. Select `RentalAgreement` from the contract dropdown.
2. Keep Value set to `0`.
3. Click **Deploy**.
4. Approve the deployment transaction in MetaMask.
5. Wait for the transaction to be mined.

After deployment, Remix displays the deployed contract under Deployed Contracts.

### Step 6: Copy the Contract Address

Copy the newly deployed contract address displayed in Remix.

Every teammate deploying on their own Ganache instance will receive a different contract address.

**Important:** Do not blindly reuse another person's contract address. The contract address must belong to the current teammate's Ganache blockchain.

---

## 🔗 9. Connect the Smart Contract to React

After successful deployment, connect the newly deployed contract to the React application.

Open the following file in VS Code:

```text
src/blockchain/contract.js
```

Locate the blockchain configuration.

The configuration should match your local Ganache network:

```javascript
export const GANACHE_CHAIN_ID = 1337;

export const GANACHE_RPC_URL =
  "http://127.0.0.1:7545";
```

Locate the contract address:

```javascript
export const CONTRACT_ADDRESS =
  "YOUR_NEWLY_DEPLOYED_CONTRACT_ADDRESS";
```

Replace the placeholder with the contract address copied from Remix.

For example:

```javascript
export const CONTRACT_ADDRESS =
  "0xYourDeployedContractAddress";
```

The contract ABI must also match the deployed `RentalAgreement.sol` contract.

It should include the functions and events used by the application:

- `nextAgreementId()`
- `createAgreement()`
- `acceptAgreement()`
- `getAgreement()`
- `AgreementCreated`
- `AgreementAccepted`

Save the file.

**Important:** Every team member must update the contract address after deploying their own smart contract. The address in this file is specific to their local blockchain deployment.

---

## 🚀 10. Run the RentChain Application

After installing dependencies and configuring the contract, start the React application.

In the VS Code terminal, run:

```bash
npm run dev
```

Vite will display a local development URL, normally:

```text
http://localhost:5173
```

Open that URL in Google Chrome or another supported browser.

The RentChain website should appear.

Keep the terminal running while using the application.

---

## 🧪 11. Test the Complete Project Workflow

Follow these steps to verify that all the main features work correctly.

### Test 1: Connect the Landlord Wallet

1. Open RentChain.
2. Navigate to the application dashboard.
3. Click Connect Wallet.
4. Select the Landlord account in MetaMask.
5. Approve the connection.

**Expected result:** The landlord wallet address should appear in the application.

### Test 2: Create a Rental Agreement

Navigate to **Create Agreement**.

Enter the following sample details:

| Field | Sample Value |
|---|---|
| Property Reference | FLAT-A105 |
| Tenant Wallet Address | Ganache Account 1 address |
| Monthly Rent | 15000 |
| Security Deposit | 30000 |
| Rental Start Date | A future date |
| Rental End Date | A date after the start date |

Click **Create on Blockchain**.

MetaMask will display a transaction confirmation.

Approve the transaction.

**Expected result:**

- Agreement is successfully created.
- A unique agreement ID is generated.
- Transaction hash is displayed.
- Ganache records the transaction.
- `AgreementCreated` event is emitted.

### Test 3: Verify the Agreement in Remix

Open Remix.

1. Navigate to Deploy & Run Transactions.
2. Open the deployed `RentalAgreement` contract.
3. Find the `getAgreement` function.
4. Enter the agreement ID.
5. Click Call.

Expected output should include:

- Agreement ID.
- Property reference.
- Landlord address.
- Tenant address.
- Monthly rent.
- Security deposit.
- Start date.
- End date.
- Acceptance status.

Before acceptance, the expected status is:

```text
accepted = false
```

### Test 4: Switch to the Tenant Account

Open MetaMask.

1. Switch from Landlord to Tenant.
2. Confirm that the selected account matches the tenant address stored in the agreement.
3. Keep Ganache Local selected.

The tenant must use the same blockchain network as the landlord.

### Test 5: Accept the Agreement

In Remix:

1. Expand the same deployed contract.
2. Find `acceptAgreement`.
3. Enter the agreement ID.
4. Click Transact.
5. Confirm the transaction in MetaMask.

**Expected result:**

- Transaction is successfully mined.
- `AgreementAccepted` event is generated.
- The transaction sender is the registered tenant.

### Test 6: Final Agreement Verification

Call:

```text
getAgreement(1)
```

Replace `1` with the agreement ID created in your test.

The expected final result is:

```text
accepted = true
```

This confirms that the tenant successfully accepted the rental agreement.

---

## 🔍 12. Smart Contract Functions

The `RentalAgreement` smart contract contains the following main functions.

### 12.1 createAgreement()

Creates a new rental agreement.

It accepts:

- Property reference.
- Tenant wallet address.
- Monthly rent.
- Security deposit.
- Rental start date.
- Rental end date.

The contract validates the information, generates an agreement ID, stores the agreement and emits `AgreementCreated`.

### 12.2 acceptAgreement()

Allows the registered tenant to accept an existing agreement.

The function checks:

- Agreement exists.
- Caller is the registered tenant.
- Agreement has not already been accepted.

After successful validation, the acceptance status becomes `true`.

### 12.3 getAgreement()

Retrieves agreement details using the agreement ID.

This is a read-only function and does not require a blockchain transaction fee when called as a normal read operation.

### 12.4 nextAgreementId()

Returns the next agreement ID available for creation.

---

## 📋 13. Events and Transaction Verification

The contract generates two important events.

| Event | Purpose |
|---|---|
| AgreementCreated | Records agreement creation |
| AgreementAccepted | Records tenant acceptance |

These events can be inspected in Remix transaction logs.

The Ganache transaction history can also be used to inspect blockchain activity.

Important information to check:

- Transaction hash.
- Block number.
- Sender wallet address.
- Contract address.
- Transaction status.
- Event logs.

---

## 🧰 14. Common Errors and Troubleshooting

### Error 1: MetaMask Not Connected

**Possible reason:** Wallet connection was not approved or the extension is unavailable.

**Solution:**

1. Make sure MetaMask is installed.
2. Unlock MetaMask.
3. Select the correct Ganache network.
4. Refresh RentChain.
5. Click Connect Wallet again.

### Error 2: Wrong Chain ID

**Possible reason:** MetaMask is connected to another blockchain network.

**Solution:**

Check that the Ganache RPC endpoint reports Chain ID `1337`.

The React application and MetaMask must use the same chain.

### Error 3: Contract Not Found

**Possible reason:** The contract address in `contract.js` is incorrect or the contract is not deployed on the selected Ganache instance.

**Solution:**

1. Open Remix.
2. Check the deployed contract address.
3. Copy the correct address.
4. Update `CONTRACT_ADDRESS` in `src/blockchain/contract.js`.
5. Save and refresh the website.

### Error 4: Gas Estimation Failed

**Possible reason:**

- Incorrect network.
- Incorrect contract address.
- Wrong wallet account.
- Smart contract validation failure.

**Solution:**

Check the selected MetaMask network, deployed contract address and account before retrying.

Do not force-send a transaction without understanding the failure.

### Error 5: Only Tenant Can Accept

**Possible reason:** The currently selected wallet does not match the registered tenant address.

**Solution:**

Switch MetaMask to the correct tenant account.

### Error 6: Already Accepted

**Possible reason:** The agreement has already been accepted.

**Solution:**

Create another agreement for a fresh acceptance test. The contract does not allow duplicate acceptance.

### Error 7: Agreement Does Not Exist

**Possible reason:** The entered agreement ID is incorrect or the agreement belongs to another contract deployment.

**Solution:**

Check the agreement ID and contract address.

### Error 8: Ganache Connection Failed

**Possible reason:** Ganache is not running or the RPC URL is incorrect.

**Solution:**

1. Open Ganache.
2. Start the local blockchain.
3. Verify port `7545`.
4. Check the RPC URL in MetaMask and `contract.js`.

---

## 📊 15. Testing and Expected Results

The following test cases can be used to verify the application.

| Test Case | Expected Result |
|---|---|
| Connect Landlord wallet | Wallet connected |
| Create valid agreement | Agreement created |
| Enter empty property reference | Transaction rejected |
| Enter invalid tenant address | Transaction rejected |
| Use zero monthly rent | Transaction rejected |
| Enter invalid rental dates | Transaction rejected |
| Accept agreement using correct tenant | Acceptance successful |
| Accept using another account | Transaction rejected |
| Accept same agreement again | Transaction rejected |
| Retrieve valid agreement ID | Agreement details returned |
| Retrieve invalid agreement ID | Read call reverts with "Agreement does not exist" |

### Successful Demonstration Scenario

The following workflow was successfully demonstrated during project development:

1. Landlord deployed the smart contract.
2. Landlord created Agreement ID `1`.
3. Property reference was `FLAT-A105`.
4. Monthly rent was `15000`.
5. Security deposit was `30000`.
6. The initial acceptance status was `false`.
7. Tenant switched to their own wallet.
8. Tenant executed `acceptAgreement(1)`.
9. The `AgreementAccepted` event was generated.
10. `getAgreement(1)` returned `accepted = true`.

New installations should repeat these steps using their own Ganache accounts and deployment.

---

## ⚠️ 16. Important Security Notes

- Never commit private keys or wallet recovery phrases to GitHub.
- Use only test accounts for the local development environment.
- Never store passwords or private keys in React source files.
- Do not expose sensitive personal information in blockchain transactions.
- Confirm the contract address before sending transactions.
- Keep the Solidity source code and contract ABI consistent.
- Do not use the prototype for real rental payments or legally binding transactions without additional legal, security and production review.

---

## ⚙️ 17. Project Limitations

This project is a working academic prototype.

- It uses a local Ganache blockchain.
- It requires MetaMask and a compatible network.
- Transactions require test ETH and gas.
- The current smart contract records agreement information and tenant acceptance status.
- It does not transfer rent or security deposits.
- It does not provide automatic escrow.
- It does not perform government identity verification or legal registration.
- It does not independently guarantee the legal enforceability of an agreement.

---

## 🔮 18. Future Enhancements

Possible improvements include:

- Digital identity verification.
- Rental document upload and hash verification.
- Automated rent payment integration.
- Security deposit escrow.
- Agreement renewal and termination.
- Dispute management.
- Email and application notifications.
- Production blockchain deployment.
- Mobile application support.

---

## 👥 19. Team Instructions

Every team member should:

1. Clone the GitHub repository.
2. Install Node.js and project dependencies.
3. Start Ganache and configure MetaMask.
4. Import their own local test accounts.
5. Open `src/contracts/RentalAgreement.sol` in VS Code.
6. Copy the complete Solidity code from that file.
7. Paste it into a new `RentalAgreement.sol` file in Remix IDE.
8. Compile and deploy the contract through Remix.
9. Copy the newly deployed contract address.
10. Update `CONTRACT_ADDRESS` in `src/blockchain/contract.js`.
11. Run the React application using `npm run dev`.
12. Connect the Landlord wallet.
13. Create a rental agreement.
14. Switch to the Tenant wallet.
15. Accept the agreement.
16. Verify the final status using `getAgreement()`.

**Remember:** The Solidity code is provided in this repository. Every team member must copy it from `src/contracts/RentalAgreement.sol` and use it in Remix IDE before deployment.

All team members should use their own local Ganache deployment. A contract deployed on one person's local computer will not automatically be available on another person's computer.

---

## 📁 20. Project Structure

```text
RentChain-Blockchain-Rental-System/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   ├── blockchain/
│   │   └── contract.js
│   ├── contracts/
│   │   └── RentalAgreement.sol
│   ├── components/
│   ├── pages/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── index.html
├── README.md
└── .gitignore
```

---

## ▶️ 21. Quick Start Commands

For teammates who have already completed the initial software installation:

```bash
git clone https://github.com/Vaishnavi200527/RentChain-Blockchain-Rental-System.git

cd RentChain-Blockchain-Rental-System

npm install
```

**Before running the application:**

1. Start Ganache.
2. Connect MetaMask to Ganache Local.
3. Copy the Solidity source from `src/contracts/RentalAgreement.sol` into Remix IDE.
4. Compile and deploy the contract using the Landlord account.
5. Copy the deployed contract address.
6. Update `CONTRACT_ADDRESS` in `src/blockchain/contract.js`.

Then start the application:

```bash
npm run dev
```

Open the local URL displayed by Vite, normally:

```text
http://localhost:5173
```

---

## 📚 22. References

- Ethereum: https://ethereum.org/
- Solidity: https://docs.soliditylang.org/
- Remix IDE: https://remix.ethereum.org/
- MetaMask: https://metamask.io/
- Ganache: https://archive.trufflesuite.com/ganache/
- Ethers.js: https://docs.ethers.org/
- React.js: https://react.dev/
- Vite: https://vite.dev/
- Node.js: https://nodejs.org/

---

## 🎓 Academic Project

**Project Name:** RentChain – Blockchain-Based Rental Agreement System

**Department:** Information Technology

**Institute:** Vivekanand Education Society's Institute of Technology

**Academic Year:** 2026–27

**Purpose:** Academic Mini-Project / Blockchain Case Study

---

⭐ If you find this project useful, feel free to explore the code, run the application and test the smart contract workflow.