import { walletStore } from '@/features/wallet/store/walletStore'
import { useQuery } from '@tanstack/react-query'
import { useWalletSnapshot } from '@/features/wallet/hooks/useWalletSnapshot'

export interface TokenInfo {
  address: `0x${string}`
  name: string
  symbol: string
  decimals: number
  balance: string
  logoURI?: string
}

export function useUserTokens() {
  const {address, chainId} = useWalletSnapshot();

  return useQuery<TokenInfo>({
    queryKey: ['tokens', address, chainId],
    enabled: !!address && !!chainId,
    queryFn: async () => {
      const response = await fetch(`/api/tokens?address=${address}&chainId=${chainId}`)
      const data = await response.json()
      return data.tokens // 你从 API 拿到的 token 列表
    },
  })
}
