import fs from "fs";
import { join } from "path";

import { buildContractsMap } from "./buildContractsMap";

async function getLocalContractsMap() {
  if (
    process.env.NEXT_PUBLIC_USE_LOCAL_CONFIG !== "true" ||
    process.env.NODE_ENV === "production"
  ) {
    return null;
  }

  const contractsMap = await import("../local-config/index");
  return contractsMap.default.contracts;
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
