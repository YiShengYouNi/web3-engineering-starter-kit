
import { getContract, type WalletClient, type PublicClient, type GetContractReturnType, type Address } from 'viem'
import { hengAbi } from '@abi/heng'
import { getAddressByChainIdAndTokenName } from '@chains'

export function getHengContract(chainId: number | bigint, client: PublicClient | WalletClient): GetContractReturnType<typeof hengAbi, PublicClient | WalletClient> {
  return getContract({
    abi: hengAbi,
    address: getAddressByChainIdAndTokenName(chainId, 'heng'),
    client,
  } as const)
}

export const getHengAddress = (chainId: number| bigint): Address => {
  return getAddressByChainIdAndTokenName(chainId, 'heng');
}