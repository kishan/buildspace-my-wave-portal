# Buildspace - Build a Web3 App with Solidity + Ethereum Smart Contracts

Tutorial: https://app.buildspace.so/projects/CO02cf0f1c-f996-4f50-9669-cf945ca3fb0b

This repo contains code for smart contract. Contract is currently deployed on rinkeby test network

Front-end code lives here: https://replit.com/@KishanPatel32/waveportal-starter-project

Scripte to simulate smart contract waves: `npx hardhat run scripts/run.js`

### How to re-deploy smart contract
After making any changes to smart contract, you will need to re-deploy and update FE code by:
1. Deploy smart contract again: run `npx hardhat run scripts/deploy.js --network rinkeby`
2. Update the contract address on FE: change `contractAddress` in `App.js` to be the new contract address
3. Update the abi file on FE: copy `artifacts/contracts/WavePortal.sol/WavePortal.json` into `src/utils/WavePortal.json`

### How to set up app
Navigate to replit where FE is hosted and run code. This should build UI and provide webpage where you can interact with smart contract which should already be deployed.
