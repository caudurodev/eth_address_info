# About
A simple interface to lookup information about an Ethereum address. A user can add any valid Mainnet ETH address and get the current balance for the address and a list of recent transactions.

## Setup

### Etherscan API

You will need to add a .env file to the root of this project with your Etherscan API key [Get your free key here](https://etherscan.io/login). There is a `.env.example` file which you can rename to `.env`

### Instal modules
```pnpm i``` 
or use npm, yarn, etc.

### Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



# Potential Improvements
This project has lots of room for improvement. Here are some ideas:

- Connect a browser extension wallet to obtain a wallet address instead of typing in the input
- Switch Ethereum networks (Mainnet, Sepolia, Goerli)
- Add more Blockchains and Explorer integrations
- Display conversion value from Eth to Fiat (USD, EUR, etc)
- Link to blockexplorer for each transaction
- Pagination of transactions (only showing 1 page currently)
- Filters: Addresses, Validated Contracts, etc
- Sorting of transactions based on retrieved values
- Improved responsive html