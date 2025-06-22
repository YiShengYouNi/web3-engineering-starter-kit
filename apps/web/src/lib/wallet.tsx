
import { createConfig } from 'wagmi'
import { http } from 'viem';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors'
import { mainnet, polygon, optimism, sepolia, base, polygonMumbai } from 'wagmi/chains'

const projectId =  process.env.NEXT_PUBLIC_PROJECT_ID ?? '';  // Replace with your actual project ID


const chains = [sepolia, base, polygonMumbai, mainnet, polygon, optimism] as const;
const transports = {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [polygonMumbai.id]: http(),
    [optimism.id]: http(),
    [polygon.id]: http(),
  };

const connectors = [
  injected({ }),
  walletConnect({  projectId }),
  coinbaseWallet({ appName: 'Web3DappInterface' })
]

export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports,
  ssr: true, // Enable SSR for wagmi
})
