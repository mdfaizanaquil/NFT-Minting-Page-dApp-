// --- CONFIGURATION ---
const CONTRACT_ADDRESS = "PASTE_YOUR_DEPLOYED_NFT_CONTRACT_ADDRESS_HERE";
const CONTRACT_ABI = [
    // We only need the ABI for the function we want to call
    "function safeMint(address to) public"
];

// --- ELEMENTS ---
const connectWalletBtn = document.getElementById('connectWalletBtn');
const mintBtn = document.getElementById('mintBtn');
const statusDiv = document.getElementById('status');

// --- APP LOGIC ---
let signer = null;
let provider = null;
let contract = null;

connectWalletBtn.addEventListener('click', async () => {
    if (typeof window.ethereum === "undefined") {
        statusDiv.innerText = "Please install MetaMask!";
        return;
    }

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        
        connectWalletBtn.style.display = 'none';
        mintBtn.style.display = 'inline-block';
        statusDiv.innerText = `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
    } catch (error) {
        statusDiv.innerText = `Error connecting: ${error.message}`;
    }
});

mintBtn.addEventListener('click', async () => {
    if (!contract || !signer) {
        statusDiv.innerText = "Please connect your wallet first.";
        return;
    }

    try {
        statusDiv.innerText = "Minting... Please confirm the transaction in MetaMask.";
        mintBtn.disabled = true;

        const userAddress = await signer.getAddress();
        const tx = await contract.safeMint(userAddress);
        
        statusDiv.innerText = `Transaction sent! Waiting for confirmation... Hash: ${tx.hash}`;
        await tx.wait();

        statusDiv.innerHTML = `✅ Mint Successful!<br>View your transaction on the explorer: <a href="https://basescan.org/tx/${tx.hash}" target="_blank">View Transaction</a>`;
    } catch (error) {
        statusDiv.innerText = `❌ Error minting: ${error.message}`;
    } finally {
        mintBtn.disabled = false;
    }
});
