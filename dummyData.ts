export interface DataProp {
  id: number;
  tasker: string;
  task: string;
  ends_in: number;
  reward_amount: number;
  reward_token: string;
}

export const bountyData: DataProp[] = [
  {
    id: 1,
    tasker: "DecentraLabs",
    task: "Develop a smart contract for decentralized voting",
    ends_in: 72,
    reward_amount: 500,
    reward_token: "USDC",
  },
  {
    id: 2,
    tasker: "CryptoKitties",
    task: "Create an engaging NFT marketplace UI design",
    ends_in: 48,
    reward_amount: 0.5,
    reward_token: "ETH",
  },
  {
    id: 3,
    tasker: "ChainLink",
    task: "Implement a price feed oracle for DeFi applications",
    ends_in: 120,
    reward_amount: 1000,
    reward_token: "LINK",
  },
  {
    id: 4,
    tasker: "Uniswap",
    task: "Optimize gas fees for token swaps",
    ends_in: 96,
    reward_amount: 2500,
    reward_token: "UNI",
  },
  {
    id: 5,
    tasker: "Aave",
    task: "Develop a risk assessment model for crypto lending",
    ends_in: 168,
    reward_amount: 3000,
    reward_token: "AAVE",
  },
  {
    id: 6,
    tasker: "Polkadot",
    task: "Create a cross-chain interoperability solution",
    ends_in: 240,
    reward_amount: 5000,
    reward_token: "DOT",
  },
  {
    id: 7,
    tasker: "Filecoin",
    task: "Implement a decentralized storage solution for large datasets",
    ends_in: 144,
    reward_amount: 2000,
    reward_token: "FIL",
  },
];
