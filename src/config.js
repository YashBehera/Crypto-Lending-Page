export const ABI = [
    {
      "inputs": [],
      "name": "depositCollateral",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "interestRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "duration",
          "type": "uint256"
        }
      ],
      "name": "borrow",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "loanId",
          "type": "uint256"
        }
      ],
      "name": "repay",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "loanId",
          "type": "uint256"
        }
      ],
      "name": "liquidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "collateralBalance",
      "outputs": [
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
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "loans",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "collateral",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "interestRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "dueDate",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "repaid",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  export const CONTRACT_ADDRESS = "0x7844C4869DD09F594cf8e2f6Ce03beC24fd6082E"; // Replace with your contract's address

//LendingPlatform)0x9bE9bdEE07C397Ba3AE57f25bAce420AE773462f
//LendingPlatform2=> 0xe8aF72fd790aACB4F030EBcaFE2B332e459b3cA8
//LendingPlatformOptimize3=> 0x08c4b9588313768Fd9EA7d68c573ae3333a0CFb2
//LendingPlatformOptimize4=> 0x48288B0c74FD9Cc57c814436fC246537d49796a5
//LendingPlatformOptimize5=> 0x2ffC9F9305fb872AbE4F8E04B9D3C1f5EA26B129
//LendingPlatformOptimize5=> 0xC487bAE703d0804EdcaB1c1999933E226e40ae3A
//LendingPlatformOptimize5=> 0x6dC13278cfB4bf1125Fbd8457CD1257Eebbfec9a
//LendingPlatformOptimize5=> 0xdC414bE3833Cef9aF1b07a6F17B3a52511562C03
//LendingPlatformOptimize5=> 0x6A97FFC804A7e3199967fab12E0bA67e88b99C8D
//LendingPlatformOptimize5=> 0xF106D76E364a44d6CE5740dF0Fe57e75430aab12
//LendingPlatformOptimize5=> 0xa5250E6e55170ba9E8ed25f8Ad7087F8d8A36b99
//LendingPlatformOptimize5=> 0x7844C4869DD09F594cf8e2f6Ce03beC24fd6082E

//VM MAINET FORK
//LendingPlatformOptimize5=> 0xd9145CCE52D386f254917e481eB44e9943F39138


//TEST TOKEN => 0xCa944937a3221f6797a4dff14361707Bb75fAA85
//TEST TOKEN => 0x9AB94E460D7f021dCAc864af5B6dF20CB7b8ECB4