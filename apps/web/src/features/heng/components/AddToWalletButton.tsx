'use client'

import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { walletStore } from '@/features/wallet/store/walletStore'
import { getHengAddress } from '@contract/heng'
import { addTokenToWallet } from '../utils'

export default function AddToWalletButton({
  symbol = '',
  decimals = 18,
  image,
  name,
}: {
  symbol: string
  decimals?: number
  image?: string
  name?: string
}) {

  const address = walletStore((s) => s.address)
  const chainId = walletStore((s) => s.chainId)

  if (!chainId || !address) return null

  const contractAddress = getHengAddress(chainId)

  const handleClick = async () => {
    try {
      await addTokenToWallet({
        address: contractAddress,
        symbol,
        decimals,
        image,
        name,
      })

      toast.success(`已请求添加 ${symbol} 到钱包`)
    } catch (err: any) {
      toast.error(err.message ?? '添加失败')
    }
  }

  return (
    <Button variant="secondary" onClick={handleClick}>
      添加 {symbol} 到钱包
    </Button>
  )
}
