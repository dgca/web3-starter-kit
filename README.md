# (WIP) web3-starter-kit

Current status: This is what I'm git cloning to start a new web3 project.

Future status: This is an npx tool that bootstraps a web3 project with a React front-end, choice of CSS framework, choice of solidity framework, and includes a contract debugging tool.

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).
