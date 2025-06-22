import { useMemo } from 'react'
import { usePublicClient, useWalletClient, useChainId } from 'wagmi';
import { type PublicClient } from 'viem'
import { getHengAddress, getHengContract } from '@contract/heng'

export function useHengContract<
  const TAbi extends readonly unknown[],
  const TAddress extends `0x${string}`
>() {

  const chainId = useChainId();
  // console.log('🚀 useHengContract:', 'chainId:', chainId);
  const address = getHengAddress(chainId);

  const publicClient = usePublicClient() as PublicClient | undefined
  const { data: walletClient } = useWalletClient()


  const readContract = useMemo(() => {
    if (!publicClient || !address) return null
    return getHengContract(chainId, publicClient);
  }, [publicClient, address]);

  const writeContract = useMemo(() => {
    if (!walletClient || !address) return null
    return getHengContract(chainId, walletClient);
  }, [walletClient, address])


  return { readContract, writeContract }
}
