
import { getContract, type WalletClient, type PublicClient } from 'viem'
import { hengAbi } from '@abi/heng'
import { getContractAddressByChainId } from '@chains' // ✅ 来自 chains.ts 工具函数

export function getHengContract(chainId: number,client: PublicClient | WalletClient): ReturnType<typeof getContract> {
  return getContract({
    abi: hengAbi,
    address: getContractAddressByChainId(chainId),
    client,
  } as const)
}

export const getHengAddress = (chainId: number): `0x${string}` => {
  return getContractAddressByChainId(chainId) as `0x${string}`;
}