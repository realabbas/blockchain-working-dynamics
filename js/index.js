let blockchain = [];

function addToBlockchain() {
  const data = document.getElementById('data').value;
  if (data.trim() === '') {
    alert('Please enter some data.');
    return;
  }

  const newBlock = {
    index: blockchain.length + 1,
    data: data,
    previousHash: getPreviousBlockHash(),
    timestamp: Date.now(),
    hash: ''
  };

  newBlock.hash = calculateHash(newBlock);

  blockchain.push(newBlock);

  updateBlockchainUI();
}

function calculateHash(block) {
  const dataString = block.index + block.data + block.previousHash + block.timestamp;
  return CryptoJS.SHA256(dataString).toString();
}

function getPreviousBlockHash() {
  if (blockchain.length > 0) {
    return blockchain[blockchain.length - 1].hash;
  }
  return '0';
}

function updateBlockchainUI() {
  const blockchainDiv = document.getElementById('blockchain');
  blockchainDiv.innerHTML = '';

  for (const block of blockchain) {
    const blockDiv = document.createElement('div');
    blockDiv.classList.add('block');

    blockDiv.innerHTML = `
      <p><strong>Block #${block.index}</strong></p>
      <p>Data: ${block.data}</p>
      <p>Timestamp: ${new Date(block.timestamp).toLocaleString()}</p>
      <p>Previous Hash: ${block.previousHash}</p>
      <p>Hash: ${block.hash}</p>
    `;

    blockchainDiv.appendChild(blockDiv);
  }

  updateBlockchainConcepts();
}

function updateBlockchainConcepts() {
  const conceptsDiv = document.getElementById('concepts');
  const latestBlock = blockchain[blockchain.length - 1];

  conceptsDiv.innerHTML = `
    <h3>Blockchain Concepts</h3>
    <p><strong>Hashing:</strong> A cryptographic function that converts data into a fixed-length string (hash). Any change in data will result in a completely different hash.</p>
    <p><strong>Linking Blocks:</strong> Each block in the blockchain contains the hash of the previous block, creating a chain-like structure that ensures the integrity of the data.</p>
    <p><strong>Immutability:</strong> Once a block is added to the blockchain, it cannot be altered or deleted, making the blockchain tamper-proof and secure.</p>
    <h3>Latest Block Details</h3>
    <p><strong>Block #${latestBlock.index}</strong></p>
    <p>Data: ${latestBlock.data}</p>
    <p>Timestamp: ${new Date(latestBlock.timestamp).toLocaleString()}</p>
    <p>Previous Hash: ${latestBlock.previousHash}</p>
    <p>Hash: ${latestBlock.hash}</p>
  `;
}