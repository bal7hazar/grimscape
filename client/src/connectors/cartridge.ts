import { Connector } from "@starknet-react/core";
import CartridgeConnector from "@cartridge/connector";
import { getContractByName } from "@dojoengine/core";
import { dojoConfig } from "../../dojo.config";

export const cartridge = (): { connectors: Connector[] } => {
  const namespace: string = "grimscape";

  const config = dojoConfig();
  const actions = getContractByName(config.manifest, namespace, "Actions")?.address;
  const paymaster = { caller: "0x414e595f43414c4c4552" };
  const rpc = import.meta.env.VITE_PUBLIC_NODE_URL;
  const policies = [
    {
      target: actions,
      method: "signup",
    },
    {
      target: actions,
      method: "rename",
    },
    {
      target: actions,
      method: "create",
    },
    {
      target: actions,
      method: "perform",
    },
    {
      target: actions,
      method: "multiperform",
    },
  ];

  const cartridge = new CartridgeConnector({
    rpc,
    policies,
    paymaster,
  }) as never as Connector;

  return { connectors: [cartridge] };
};