import abi from "./abi/abi.json" assert {type: "json"};

const connect = new Promise((res, rej) => {
    if(typeof window.ethereum == "undefined") {
        rej("Install Metamask");
    }
    window.ethereum.request({method: "eth_requestAccounts"});
    
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi,"0xa724b4E3f300C04fB41c9086A2E2227b1BB484fA");

    console.log(contract);
    web3.eth.getAccounts().then((accounts) => {
        contract.methods
        .totalSupply()
        .call({ from: accounts[0] })
        .then((supply) => {
            contract.methods
            .getBuildings()
            .call({ from: accounts[0] })
            .then((data) => {
                res({ supply: supply, buildings: data });
                
            });
        });

    });

});

export default connect;