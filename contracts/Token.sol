//SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract Token{

    struct purchaseRecords{
        uint merchantId;
        uint price;
        uint transId;
        uint256 date;
        address wallet;
    }

    mapping(address => uint) public balances;
    mapping(address => mapping(address => uint)) public allowance;
    mapping(uint => purchaseRecords) public transactions;

    uint public totalSupply = 10000*10**18;
    string public name = "JY";
    string public symbol = "ECO";
    uint public decimals = 18;

    address issuer;
    uint public transactionIdIterable = 1000;

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
    event Deposit(address indexed to, uint value);
    event Withdrawl(address indexed from, uint value);
    
    event Purchase(uint indexed transId, uint256 indexed date, uint price, uint merchantId);
    event TokenRedeem(address indexed to, uint value, uint indexed transId);


    constructor() {
        balances[msg.sender] = totalSupply;
        issuer = msg.sender;
    }

    function balanceOf(address owner) public view returns(uint) {
        return balances[owner];
    }

    // Securty to-be-implemented
    function transfer(address to, uint value) public returns(bool){
        require(balanceOf(msg.sender) >= value, 'balance too low');
        balances[to] += value;
        balances[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    // function of (Purchase, Reward) 
    function transferFrom(address from, address to, uint value) public returns(bool){
        require(balanceOf(from) >= value, 'balance too low');

        if(from != msg.sender && allowance[from][msg.sender] != type(uint).max){
            require(allowance[from][msg.sender] >= value, 'allowance too low');
            allowance[from][msg.sender] -= value;
        }
        
        balances[to] += value;
        balances[from] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint value) public returns(bool){
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function deposit() public payable{
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint value) public{
        require(balanceOf(msg.sender) >= value);
        balances[msg.sender] -= value;
        payable(msg.sender).transfer(value);
        emit Withdrawl(msg.sender, value);
    }

    // Security to-be-implemented
    function insertPurchaseRecord(uint price, uint merchantId, uint256 date, uint transId) public returns(bool) {
        require(transId != transactions[transId].transId, 'Transaction already exists');
        transactions[transId].price = price;
        transactions[transId].merchantId = merchantId;
        transactions[transId].date = date;
        transactions[transId].transId = transId;

        emit Purchase(transId, date, price, merchantId);
        return true;
    }

    function getPurchaseRecord(uint transId) public view returns(uint, uint, uint, uint256){
        return(transactions[transId].merchantId, transactions[transId].price, transactions[transId].transId, transactions[transId].date);
    }

    // Security to-be-implemented
    function tokenRedeem(address to, uint value, uint transId) public returns(uint){
        require(transId == transactionIdIterable, 'Transaction Not Match');
        require(balanceOf(issuer) >= value, 'balance too low');

        // Fill up user's wallet to record
        transactions[transId].wallet == to;

        balances[to] += value;
        balances[issuer] -= value;
        emit TokenRedeem(to, value, transId);
        return value;
    }

    // Security to-be-implemented
    function newTransactionId() public returns(uint){
        transactionIdIterable += 1;
        return transactionIdIterable;
    }
}