//SPDX-License-Identifier: MIT
pragma solidity^0.8.20;

import "solmate/src/tokens/ERC20.sol";

contract PathnerEscrow {

    //PRIZE CONFIG
    //BASE MAINNET ADDRESS - 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
    //BASE SEPOLIA TESTNET 
    ERC20 immutable usdc = ERC20(0x036CbD53842c5426634e7929541eC2318f3dCF7e);
    uint256 constant CREDIT_MULTIPLIER = 50;
    uint256 stdRate = 5e6;
    uint256 constant RATE_LIMIT = 5e6;

    //FEE CONFIG
    uint256 feeBalance;
    uint256 revenue;
    address maker;

    struct Task {
        address token; 
        uint256 bounty;
        uint256 claims;
    }

    //CONFIG
    uint256 isActive = 1;
    
    //MAPPINGS
    mapping(address => uint256) public subscription;
    mapping(address => uint256) public taskList;
    mapping(address => mapping(uint256 => Task)) task;

    //EVENTS
    event CreditPurchase(address indexed creator, uint256 indexed credits);
    event Created(address indexed creator, address token, uint256 indexed amount, uint256 indexed claims);
    event BountyPayment(address indexed creator, address[] indexed recepients, uint256 indexed amount, uint256 claims);
    event Withdrawn(address indexed maker, uint256 indexed amount);
    event RateUpdate(uint256 indexed rate);
    
    constructor () {
        maker = msg.sender;
    }

    function buyCredits(uint256 amount) external {
        require(amount >= RATE_LIMIT, "fee too low");
        bool success = usdc.transferFrom(msg.sender, address(this), amount);
        require(success);
        revenue += amount;
        feeBalance += amount;
        uint256 credit = amount * CREDIT_MULTIPLIER;
        subscription[msg.sender] = credit;
        emit CreditPurchase(msg.sender, credit);
    }

    function createBounties(address token, uint256 claims, uint256 amount) external {
        require(claims != 0 && amount != 0, "invalid reward");
        require(subscription[msg.sender] >= stdRate, "insufficient credit");
        
        bool success = ERC20(token).transferFrom(msg.sender, address(this), amount);
        require(success);    
        subscription[msg.sender] -= stdRate;

        uint256 index = taskList[msg.sender];
        task[msg.sender][index] = Task(token, amount, claims);
        ++taskList[msg.sender];
        emit Created(msg.sender, token, amount, claims);
    }


    function payBounty(address[] calldata recepients, address token, uint256 postId) public {
        require (recepients.length <= 10, "10 at a time");
        //uint256 claims = task[msg.sender][postId].claims - recepient;
        if(task[msg.sender][postId].token == token){
            //probably not the best implementation but should work
            uint256 claimsDiff = task[msg.sender][postId].claims - recepients.length;
            uint256 claims = task[msg.sender][postId].claims;
            uint256 amount = task[msg.sender][postId].bounty/claims;
            if(claimsDiff == 0){
                for(uint256 i; i <= claims; i++){
                    bool success = ERC20(token).transfer(recepients[i], amount);
                    require(success);
                }
            } else if (claimsDiff != 0){
                task[msg.sender][postId].claims = claimsDiff;
                for(uint256 i; i <= recepients.length; i++){
                    bool success = ERC20(token).transfer(recepients[i], amount);
                    require(success);
                }
            }
            emit BountyPayment(msg.sender, recepients, amount, claims);
        } revert("Try again");
    }

    //ADMIN CONFIG FUNCTIONS
    function deprecate() public {
        require(msg.sender == maker);
        isActive = 0;
    }

    function reinit() public {
        require(msg.sender == maker);
        isActive = 1;
    }

    function pullFunds(address to, uint256 amount) public {
        require(msg.sender == maker, "not the maker");
        feeBalance -= amount;
        bool pulled = usdc.transfer(to, amount);
        require(pulled);
        emit Withdrawn(msg.sender, amount);
    }

    function configRate(uint256 oldAmount, uint256 newAmount) public {
        require(msg.sender == maker, "not the maker");
        require(oldAmount == stdRate && newAmount >= RATE_LIMIT);
        stdRate = newAmount;
        emit RateUpdate(newAmount);
    }
}