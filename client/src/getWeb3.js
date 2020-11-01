import Web3 from "web3";

const getWeb3 = () =>
  new Promise(async (resolve) => {
    console.log("Start initializing web3...");
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        resolve({ account: accounts[0], web3 });
      } catch (e) {
        // still give the web3 instance (but no account)
        resolve({ web3, error: "Please grant Metamask access!" });
      }
    } else {
      resolve({ error: "Please install the Metamask extension!" });
    }
  });

export default getWeb3;
