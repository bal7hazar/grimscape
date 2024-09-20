import { getSyncEntities, getSyncEvents } from "@dojoengine/state";
import * as torii from "@dojoengine/torii-client";
import { models } from "./models.ts";
import { systems } from "./systems.ts";

import { defineContractComponents } from "./bindings/models.gen";
import { world } from "./world.ts";
import { Config } from "../../dojo.config.ts";
import { setupWorld } from "./bindings/contracts.gen";
import { DojoProvider } from "@dojoengine/core";
import { BurnerManager } from "@dojoengine/create-burner";
import { Account, RpcProvider } from "starknet";

export type SetupResult = Awaited<ReturnType<typeof setup>>;

export async function setup({ ...config }: Config) {
  // torii client
  const toriiClient = await torii.createClient({
    rpcUrl: config.rpcUrl,
    toriiUrl: config.toriiUrl,
    relayUrl: "",
    worldAddress: config.manifest.world.address || "",
  });

  // create contract components
  const contractModels = defineContractComponents(world);

  // create client components
  const clientModels = models({ contractModels });

  // fetch all existing entities from torii
  const sync = getSyncEntities(
    toriiClient,
    contractModels as any,
    [],
  );
  const eventSync = getSyncEvents(
    toriiClient,
    contractModels as any,
    undefined,
    []
  );

  const dojoProvider = new DojoProvider(config.manifest, config.rpcUrl);
  const client = await setupWorld(dojoProvider);

  const rpcProvider = new RpcProvider({
    nodeUrl: config.rpcUrl,
  });

  const burnerManager = new BurnerManager({
    masterAccount: new Account(
      rpcProvider,
      config.masterAddress,
      config.masterPrivateKey,
    ),
    feeTokenAddress: config.feeTokenAddress,
    accountClassHash: config.accountClassHash,

    rpcProvider,
  });

  try {
    await burnerManager.init();
    if (burnerManager.list().length === 0) {
      await burnerManager.create();
    }
  } catch (e) {
    console.error(e);
  }

  return {
    client,
    clientModels,
    contractModels,
    systemCalls: systems({ client, clientModels }),
    config,
    world,
    burnerManager,
    rpcProvider,
    sync,
    eventSync,
  };
}
