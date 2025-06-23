import { useQuery } from '@tanstack/react-query'
import { getHengContract } from '@contract/heng'
import { walletStore } from '@/features/wallet/store/walletStore'
// import {useWalletSnapshot} from '@/features/wallet/hooks/useWalletSnapshot'
import { type PublicClient } from 'viem'

export function useIsMinter(publicClient: PublicClient) {
  // 从 wallet store 中获取当前钱包地址和链 ID
  const address = walletStore((s) => s.address)
  const chainId = walletStore((s) => s.chainId)
  // const { address, chainId} = useWalletSnapshot();

  return useQuery({
    queryKey: ['heng', 'isMinter', address, chainId],
    queryFn: async () => {
      if (!chainId || !address) throw new Error('wallet not ready')
      const contract = getHengContract(chainId, publicClient)
      return contract.read.minters([address])
    },
    enabled: !!address && !!chainId,
    staleTime: 10_000,
  })
}
