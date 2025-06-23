import { useMutation } from '@tanstack/react-query'
import { walletStore } from '@/features/wallet/store/walletStore'
import { getHengContract } from '@contract/heng'
import { type WalletClient, parseEther } from 'viem'

export function useMint(walletClient: WalletClient) {
  // 从 wallet store 中获取当前链 ID 和钱包地址
  const chainId = walletStore((s) => s.chainId)
  const address = walletStore((s) => s.address)

  return useMutation({
    mutationKey: ['heng', 'mint'],
    mutationFn: async (amount :BigInt) => {
      if (!chainId || !address) throw new Error('钱包未连接')

      const contract = getHengContract(chainId, walletClient)

      const hash = await contract.write.mint(address, amount );
      return hash
    },
  })
}
