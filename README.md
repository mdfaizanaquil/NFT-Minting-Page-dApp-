# Simple NFT Minting dApp

This is a simple front-end application (dApp) that allows users to connect their MetaMask wallet and mint a unique, on-chain generated SVG NFT from a specified smart contract.

## Features
- Connects to MetaMask.
- Mints an NFT by calling a smart contract function.
- Displays the transaction hash and a link to the block explorer upon success.

## How to Use
1.  **Deploy Your Contract:** First, deploy the `MyNFT.sol` contract (the version with on-chain SVG generation) using Remix IDE to a network like Base or Sepolia.
2.  **Configure the dApp:**
    * Open the `script.js` file.
    * Paste your deployed contract's address into the `CONTRACT_ADDRESS` variable.
3.  **Run the dApp:**
    * Simply open the `index.html` file in your web browser.

This project demonstrates how to build a user interface for a smart contract, a core skill for any Web3 developer.
