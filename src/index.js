const ethers = require('ethers');
const express = require('express');
const QRCode = require('qrcode')

var ABI = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Deposit",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "uint256",
                "name": "transId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "merchantId",
                "type": "uint256"
            }
        ],
        "name": "Purchase",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "transId",
                "type": "uint256"
            }
        ],
        "name": "TokenRedeem",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Withdrawl",
        "type": "event"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "owner",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "balances",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "transId",
            "type": "uint256"
        }],
        "name": "getPurchaseRecord",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "merchantId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "transId",
                "type": "uint256"
            }
        ],
        "name": "insertPurchaseRecord",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "newTransactionId",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "transId",
                "type": "uint256"
            }
        ],
        "name": "tokenRedeem",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "transactionIdIterable",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "name": "transactions",
        "outputs": [{
                "internalType": "uint256",
                "name": "merchantId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "transId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "wallet",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const app = express();

const CONTRACT_ADDRESS = '0x630B84d98194189C229D08Eff3Ae43603131afB6';
const port = process.env.PORT || 3000;

//const provider = ethers.providers.InfuraProvider('ropsten');

const provider = ethers.getDefaultProvider('ropsten', {
    etherscan: 'XG8SVMQUJIWP8HRJRIPNZZGJ9C617HGYMT'
});

//const provider = ethers.getDefaultProvider('http://localhost:7545');
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);



app.get('/getBalance', async(req, res) => {
    wallet_address = req.query.wallet;
    var value = await contract.balanceOf(wallet_address);
    var balance = (value / (10 ** 18)).toString();
    var balanceToJson = "{\"balance\"\: " + balance + "}";
    var balanceObj = JSON.parse(balanceToJson);
    try {
        res.send(balanceObj);
    } catch (e) {
        res.send(e);
    }
})

app.get('/getClaimDetails', async(req, res) => {
    var details = [];
    transId = req.query.transId;
    var value = await contract.getPurchaseRecord(transId);
    for (var i = 0; i < value.length; i++) {
        details[i] = value[i].toString();
    }
    var detailsToJson = "{\"merchantId\"\: " + details[0] + ",";
    detailsToJson += "\"price\"\: " + details[1] + ",";
    detailsToJson += "\"transId\"\: " + details[2] + ",";
    detailsToJson += "\"date\"\: " + details[3] + "}";
    var detailsObj = JSON.parse(detailsToJson);
    try {
        res.send(detailsObj);
    } catch (e) {
        res.send(e);
    }
})

app.get('/getRewards', async(req, res) => {
    const privateKey = '789b46357a2a86720d7d834b20ba3f10489fee88244b94007c4c4992286273cd';
    const signWallet = new ethers.Wallet(privateKey, provider);
    //const signer = signWallet.connect(InfuraProvider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signWallet);
    wallet = req.query.wallet;
    tokens = req.query.tokens;
    transId = req.query.transId;

    await contract.tokenRedeem(wallet, (tokens * 10 ** 18).toString(), transId);

    let topic = ethers.utils.id("TokenRedeem(address, uint, uint)");
    filter = {
        to: wallet,
        transId: transId,
        topic: [topic]
    };
    provider.on(filter, (result) => {
        //console.log(result);
    });
    contract.on("TokenRedeem", (from, to, value, event) => {
        //console.log("from to value: " + from.toString(), to.toString(), value.toString());
        //console.log("blockNUmber: " + event.blockNumber);
    });

    var balanceToJson = "{\"balance\"\: " + tokens + "}";
    var balanceObj = JSON.parse(balanceToJson);
    try {
        res.send(balanceObj);
    } catch (e) {
        res.send(e);
    }
    /*
        var value = await contract.tokenRedeem(wallet, tokens * 10 ** 18, transId);
        var balance = (value / (10 ** 18)).toString();
        console.log(value);
        var balanceToJson = "{\"balance\"\: " + balance + "}";
        var balanceObj = JSON.parse(balanceToJson);
        
        */
})

app.get('/upClaimDetails', async(req, res) => {
    price = req.query.price;
    date = req.query.date;
    merchantId = req.query.merchantId;

    await contract.insertPurchaseRecord(merchantId,date);
    value = await contract.tokenRedeem(merchantId,date,transId);
    try {
        res.send("Transaction uploaded to blockchain.");
    } catch (e) {
        res.send(e);
    }
})

// Fake for Demo Purpose

var purchaseRecord = {};    

var transId = 1000;

app.get('/upDetails', async(req, res) => {
    transId = transId+1;
    price = req.query.price;
    merchantId = req.query.merchantId;
    newRecord = {
        "price": price,
        "tokens": price*0.1,
        "merchantId": merchantId
    }

    purchaseRecord[transId] = newRecord;

    transIdQRCode = transId.toString();
    QRCode.toString(transIdQRCode, function(err, code){
        if(err) return console.log(err)
        res.setHeader('content-type', 'image/png');
        QRCode.toFileStream(res, transIdQRCode);
    })
})

app.get('/getDetails', async(req, res) => {
    transId = req.query.transId;
    try{
        merchantId = purchaseRecord[transId]["merchantId"];
        price = purchaseRecord[transId]["price"];
        tokens = purchaseRecord[transId]["tokens"];
        
        var detailsToJson = "{\"id\"\: " + transId + ",";
        detailsToJson += "\"merchantId\"\: " + merchantId + ",";
        detailsToJson += "\"price\"\: " + price + ",";
        detailsToJson += "\"tokens\"\: " + tokens + "}";
    
        var detailsObj = JSON.parse(detailsToJson);
        res.send(detailsObj);
    }catch(e){
        res.send(e);
    }
})

app.get('/getPoints', async(req, res) => {
    try {
    const privateKey = '789b46357a2a86720d7d834b20ba3f10489fee88244b94007c4c4992286273cd';
    const signWallet = new ethers.Wallet(privateKey, provider);
    //const signer = signWallet.connect(InfuraProvider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signWallet);
    wallet = req.query.wallet;
    tokens = req.query.tokens;

    await contract.transfer(wallet, (tokens * 10 ** 18).toString());

    var balanceToJson = "{\"balance\"\: " + tokens + "}";
    var balanceObj = JSON.parse(balanceToJson);
    
        res.send(balanceObj);
    } catch (e) {
        res.send(e);
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})