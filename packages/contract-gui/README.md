# `@type_of/contract-gui`

`@type_of/contract-gui` is a tool for Solidity smart contract developers, enabling you to quickly spin up a web application to interact with your contracts while in development. Ideal for Hardhat and Foundry projects, this package uses your compiled contract ABIs to create an interactive GUI.

[**🎥 Video demo**](https://www.youtube.com/watch?v=s5IMzkf2uak)

## Features

- **Contract Interaction:** Easily interact with the contracts in your project. Choose a contract to see all read and write functions available.
- **Transaction Feedback:** Read contract data, submit write transactions, and simulate write transactions. See the result of your transaction in the web app. If your transaction fails, you'll see the error message.
- **Wallet Integration:** Uses Rainbowkit for wallet connectivity.

## Requirements

- A Solidity project with compiled contracts.
- Node.js >=18.0.0

## Installation

If your project does not have a `package.json`, create one. Then, run the following command:

```bash
npm i -D @type_of/contract-gui
```

## Usage

### Config

To use `@type_of/contract-gui`, you must define a `contract-gui-config.json` file at the root of your project. Here's an example of the configuration file:

```json
{
  "port": 3001,
  "artifactsDir": "./artifacts/contracts",
  "contracts": ["CoolToken", "BasedHams"],
  "walletConnectId": "abc123abc123abc123abc123abc123ab",
  "defaultAddresses": {
    "CoolToken": "0x0000000000000000000000000000000000000000"
  },
  "chains": {
    "hardhat": true,
    "baseSepolia": "https://base-sepolia.g.alchemy.com/v2/ALCHEMY_KEY_GOES_HERE"
  }
}
```

**Required Fields**

- **artifactsDir** (`string`): Path to the directory containing your compiled contract artifacts.
- **contracts** (`Array<string>`): Names of the contracts you want to interact with in the web app.
- **chains** (`Record<string, true | string>`): Defines the blockchain networks your app will support. Chain names must match the chains that `wagmi` supports. If the value is `true`, we'll use `wagmi`'s `publicProvider` (subject to rate limits) to connect to the chain. If the value is a string, we'll create a `jsonRpcProvider` and use that string as the provider URL.

**Optional Fields**

- **port** (number): The port number on which the web app will run. Defaults to `3001`.
- **walletConnectId** (string): Your WalletConnect project ID, used for wallet integration. If not provided, WalletConnect and RainbowKit will not be included as wallet options.
- **defaultAddresses** (object): Key-value pairs specifying default addresses for contracts. If not provided, you'll have to enter addresses manually in the web app.

### Add `package.json` script

Add the following script to your `package.json`:

```json
"scripts": {
  "gui": "start-contract-gui"
}
```

### Start the web app

```bash
npm run gui
```

This command serves a website (`http://localhost:3001` by default) where you can interact with your contracts.

## Contributing

Contributions are welcome! You have two ways to contribute:

- **Open a Pull Request or Issue:** If you have a specific suggestion or fix, feel free to open a pull request or issue on the project's repository.
- **Contact on Farcaster:** For more general feedback or discussions, you can reach out to me on Farcaster at [@typeof.eth](https://warpcast.com/typeof.eth).