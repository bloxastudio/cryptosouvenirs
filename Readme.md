# CryptoSouvenirs

Location-based NFT minting app for travelers to buy a unique NFT of the cities they are currently visiting.

## Quick Start

Before you start working run the `npm run bootstrap` and `npm run build` commands in the root folder.

### Blockchain configuration

You'll find a _.env.example_ file in the _blockchain_ folder. Create your own _.env_ file based on that.

If you want to use Gas Reporter, then make sure the `REPORT_GAS` is set to `1` and you signed up to CoinMarketCap for an API key; set that key to the `COINMARKETCAP_API_KEY` variable.

If you want to deploy to Rinkeby, then fill out the `ALCHEMY_RINKEBY_URL` and `PRIVATE_KEY` variables.

### Starting Hardhat local node

1. Go to _blockchain_ and run `npm run start`.
2. Open a new terminal, then run `npm run deploy`.
