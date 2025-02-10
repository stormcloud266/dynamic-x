import { http, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import type { Chain } from "viem";

export const hyperTestnet = {
  id: 998,
  name: "HyperEVM",
  nativeCurrency: { name: "Hype", symbol: "HYPE", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://api.hyperliquid-testnet.xyz/evm"] },
  },
  blockExplorers: {
    default: { name: "Purrsec", url: "https://testnet.purrsec.com" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
    },
  },
} as const satisfies Chain;

export const hyperTestnetDynamic = {
  blockExplorerUrls: [hyperTestnet.blockExplorers.default.url],
  chainId: hyperTestnet.id,
  networkId: hyperTestnet.id,
  chainName: "HyperEVM Testnet",
  name: hyperTestnet.name,
  vanityName: hyperTestnet.name,
  iconUrls: ["/hyper-evm-logo.png"],
  nativeCurrency: {
    ...hyperTestnet.nativeCurrency,
    iconUrl: "/hyper-evm-logo.png",
  },
  rpcUrls: [hyperTestnet.rpcUrls.default.http[0]],
};

export const config = createConfig({
  chains: [hyperTestnet],
  multiInjectedProviderDiscovery: false,
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [hyperTestnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
