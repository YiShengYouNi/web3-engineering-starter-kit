import { useQuery } from '@tanstack/react-query'
import { getHengContract } from '@contract/heng'
import { walletStore } from '@/features/wallet/store/walletStore'
import { type PublicClient } from 'viem'

export function useTotalSupply(publicClient: PublicClient) {
  // 从 wallet store 中获取当前链 ID
  const chainId = walletStore((s) => s.chainId)
  return useQuery({
    queryKey: ['heng', 'totalSupply', chainId],
    queryFn: async () => {
      if (!chainId) throw new Error('chainId not ready')
      const contract = getHengContract(chainId, publicClient)
      return contract.read.totalSupply()
    },
    enabled: !!chainId,
    staleTime: 10_000,
  })
}
