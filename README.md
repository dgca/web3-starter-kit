# (WIP) web3-starter-kit

Current status: This is what I'm git cloning to start a new web3 project.

Future status: This is an npx tool that bootstraps a web3 project with a React front-end, choice of CSS framework, choice of solidity framework, and includes a contract debugging tool.

## Requirements

- Node 18
- NPM

## Getting started

1. Clone this repo
2. Run `npm install`

## Running commands

This project uses [Nx](https://nx.dev). To run commands, use the following syntax: `nx <target> <project> <...options>`

Where `<target>` is the command you want to run, `<project>` is the project you want to run it on, and `<...options>` are any additional options you want to pass to the command.

E.g. if you want to run the `dev` command on the `frontend` project, you would run `nx dev frontend`.

Note that if you do not have Nx installed globally, you will need to use `npx nx` instead of `nx`.

Learn more about running Nx commands [in the Nx docs](https://nx.dev/core-features/run-tasks).

## Projects

### `contracts`

- Start local node: `nx node contracts`
- Compile contracts and run build script: `nx build contracts`
- Deploy to local node: `nx deploy-local contracts`
- Compile contracts, run build script, deploy to local node, and watch for changes: `nx dev contracts`

### `ui-kit`

- Build: `nx build ui-kit`
- Build in dev mode and watch for changes: `nx dev ui-kit`