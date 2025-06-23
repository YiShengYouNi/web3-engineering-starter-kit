import { useQuery } from '@tanstack/react-query'
import { getHengContract } from '@contract/heng'
import { walletStore } from '@/features/wallet/store/walletStore'
import { ChainDoesNotSupportContract, type PublicClient } from 'viem'

export function useTokenMeta(publicClient: PublicClient) {
  const chainId = walletStore((s) => s.chainId)

  return useQuery({
    queryKey: ['heng', 'tokenMeta', chainId],
    queryFn: async () => {
      if (!chainId) throw new Error('chainId not ready')

      const contract = getHengContract(chainId, publicClient)
      const [name, symbol, decimals, logoURI] = await Promise.all([
        contract.read.name(),
        contract.read.symbol(),
        contract.read.decimals(),
        contract.read.logoURI?.() ?? '', // optional
      ])

      return { name, symbol, decimals, logoURI }
    },
    enabled: !!chainId,
    staleTime: 60_000,
  })
}
