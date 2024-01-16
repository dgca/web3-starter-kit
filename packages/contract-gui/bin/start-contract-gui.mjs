#!/usr/bin/env node
import { spawn } from "child_process";
import { readFileSync } from "fs";
import { resolve, join, dirname } from "path";
import { argv } from "process";
import { fileURLToPath } from "url";

const configBasePath = resolve();
const configRelativePath = argv[2] ?? "./contract-gui-config.json";
const configPath = join(configBasePath, configRelativePath);

async function getConfig() {
  const configFile = readFileSync(configPath, "utf8");
  return JSON.parse(configFile);
}

function startNextServer(port = 3001) {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const packageRoot = join(dirname(currentFilePath), "..");
    process.chdir(packageRoot);

    const child = spawn("npm", ["run", "start", "--", "-p", port], {
      stdio: "inherit",
      shell: true,
      env: {
        ...process.env,
        CONTRACT_GUI_BASE_PATH: configBasePath,
        CONTRACT_GUI_CONFIG_PATH: configPath,
      },
    });

    child.on("error", (err) => {
      console.error(`Failed to start subprocess: ${err.message}`);
    });

    child.on("exit", (code, signal) => {
      if (code) console.log(`Child process exited with code ${code}`);
      else if (signal)
        console.log(`Child process killed with signal ${signal}`);
      else console.log("Child process exited successfully");
    });
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const config = await getConfig();
  startNextServer(config.port);
}

main();
