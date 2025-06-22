
import { getContract, type WalletClient, type PublicClient, type GetContractReturnType } from 'viem'
import { hengAbi } from '@abi/heng'
import { getContractAddressByChainId } from '@chains'

export function getHengContract(chainId: number, client: PublicClient | WalletClient): GetContractReturnType<typeof hengAbi, PublicClient | WalletClient> {
  return getContract({
    abi: hengAbi,
    address: getContractAddressByChainId(chainId),
    client,
  } as const)
}

export const getHengAddress = (chainId: number): `0x${string}` => {
  return getContractAddressByChainId(chainId) as `0x${string}`;
}