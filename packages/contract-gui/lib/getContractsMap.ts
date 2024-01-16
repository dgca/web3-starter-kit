import fs from "fs";
import { join } from "path";

import { buildContractsMap } from "./buildContractsMap";

async function getLocalContractsMap() {
  if (
    process.env.NODE_ENV === "production" ||
    process.env.CONTRACT_GUI_USE_LOCAL_CONTRACTS_MAP !== "true"
  ) {
    return null;
  }

  const contractsMap = await import("../contracts-map/index");
  return contractsMap.default;
}

export async function getContractsMap() {
  const localContractsMap = await getLocalContractsMap();
  if (localContractsMap) {
    return localContractsMap;
  }

  if (typeof process.env.CONTRACT_GUI_CONFIG_PATH !== "string") {
    throw new Error("CONTRACT_GUI_CONFIG_PATH env var not set");
  }
  if (typeof process.env.CONTRACT_GUI_BASE_PATH !== "string") {
    throw new Error("CONTRACT_GUI_BASE_PATH env var not set");
  }

  const configFile = fs.readFileSync(
    process.env.CONTRACT_GUI_CONFIG_PATH,
    "utf8",
  );
  const config = JSON.parse(configFile);
  const artifactsPath = join(
    process.env.CONTRACT_GUI_BASE_PATH,
    config.artifactsDir,
  );

  return buildContractsMap(
    artifactsPath,
    config.contracts,
    config.defaultAddresses,
  );
}
