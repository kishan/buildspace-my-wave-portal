const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();
	// compile our contract and generate the necessary files we need to work with our contract under the artifacts directory
	const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
	// Hardhat will create a local Ethereum network for us, but just for this contract.
	//
	// Then, after the script completes it'll destroy that local network. 
	// So, every time you run the contract, it'll be a fresh blockchain.
	//  
	// What's the point? It's kinda like refreshing your local server every time so you always 
	// start from a clean slate which makes it easy to debug errors.
	const waveContract = await waveContractFactory.deploy({
		value: hre.ethers.utils.parseEther("0.1"),
	  });
	// We'll wait until our contract is officially deployed to our local blockchain! Our constructor runs when we actually deploy.
	await waveContract.deployed();
  
	// waveContract.address gives us the address of the deployed contract
	// This address is how we can actually find our contract on the blockchain
	// This will be more important a bit later once we deploy to a real Ethereum network.
	console.log('Contract deployed to:', waveContract.address);
	console.log('Contract deployed by:', owner.address);

	/*
	 * Get Contract balance
	 */
	let contractBalance = await hre.ethers.provider.getBalance(
		waveContract.address
	);
	console.log(
		"Contract balance:",
		hre.ethers.utils.formatEther(contractBalance)
	);
  
	let waveCount;
	waveCount = await waveContract.getTotalWaves();

	// owner waves once
	let waveTxn = await waveContract.wave("Owner message 1");
	await waveTxn.wait();
	waveCount = await waveContract.getTotalWaves();
  
	// random waves once
	waveTxn = await waveContract.connect(randomPerson).wave("Rando 1");
	await waveTxn.wait();
	waveCount = await waveContract.getTotalWaves();

	// owner waves another time
	// waveTxn = await waveContract.wave("Owner message 2");
	// await waveTxn.wait();
	// waveCount = await waveContract.getTotalWaves();

	/*
	 * Get Contract balance to see what happened!
	 */
	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log(
	  "Contract balance:",
	  hre.ethers.utils.formatEther(contractBalance)
	);

	let allWaves = await waveContract.getAllWaves();
	console.log("getAllWaves: ", allWaves);
  };
  
  const runMain = async () => {
	try {
	  await main();
	  process.exit(0);
	} catch (error) {
	  console.log(error);
	  process.exit(1);
	}
  };
  
  runMain();