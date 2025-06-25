// apps/web/config/chains.ts

import type { Address } from 'viem'

export interface ChainConfig {
  id: number
  name: string
  nativeCurrency: string
  rpcUrls: string[]
  blockExplorers: {
    name: string
    url: string
  }
  contracts: {
    [key: string]: Address // 合约地址映射，key为合约名称, 如 heng: '0x1234434534553453534'
  }
}

export const ZERO_ADDRESS: Address = '0x0000000000000000000000000000000000000000';

export const CHAINS: Record<string, ChainConfig> = {
  mainnet: {
    id: 1,
    name: 'Ethereum',
    nativeCurrency: 'ETH',
    rpcUrls: ['https://rpc.ankr.com/eth'],
    blockExplorers: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
    },
    contracts: {
      heng: '0x0000000000000000000000000000000000000000', //TODO: 📝替换为实际地址
      //TODO: 可扩展更多合约地址
    },
  },
  sepolia: {
    id: 11155111,
    name: 'Sepolia',
    nativeCurrency: 'ETH',
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorers: {
      name: 'Etherscan',
      url: 'https://sepolia.etherscan.io',
    },
    contracts: {
      heng: '0x98Af4488A1B9E9415c5Cf5512e6F9f49488E33fa',
    },
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    nativeCurrency: 'MATIC',
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorers: {
      name: 'Polygonscan',
      url: 'https://polygonscan.com',
    },
    contracts: {
      heng: '0x0000000000000000000000000000000000000000', //TODO: 📝替换为实际地址
    },
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    nativeCurrency: 'ETH',
    rpcUrls: ['https://mainnet.optimism.io'],
    blockExplorers: {
      name: 'Optimistic Etherscan',
      url: 'https://optimistic.etherscan.io',
    },
    contracts: {
      heng: '0x0000000000000000000000000000000000000000', //TODO: 📝替换为实际地址
    },
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    nativeCurrency: 'ETH',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorers: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io',
    },
    contracts: {
      heng: '0x0000000000000000000000000000000000000000', //TODO: 📝替换为实际地址
    }
  }
}
// 根据网络ID获取网络信息
export function getChainById(chainId: number | bigint): ChainConfig | undefined {
  return Object.values(CHAINS).find((c) => c.id === chainId) || undefined
}

// 获取指定地址或交易的区块浏览器链接
export function getExplorerUrl(chainId: number | bigint, txOrAddress: string): string {
  const chain = getChainById(chainId)
  if (!chain) return ''
  const prefix = txOrAddress.length === 42 ? '/address/' : '/tx/'
  return `${chain.blockExplorers.url}${prefix}${txOrAddress}`
}

// 获取某个合约地址（如：heng token 合约）
export function getAddressByChainIdAndTokenName(chainId: number | bigint, tokenName: string): Address {
  const { contracts } = Object.values(CHAINS).find((c) => c.id === chainId) ?? {}
  return contracts ? contracts[tokenName] ?? null : ZERO_ADDRESS;
}