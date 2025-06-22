'use client'

import { Button } from '@/components/ui/button'

interface Props {
  address: `0x${string}`
  symbol: string
  name: string
  decimals?: number
  image?: string | null
}

export function AddToWalletButton({
  address,
  symbol,
  name,
  decimals = 18,
  image,
}: Props) {
 

  const handleClick = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('请先安装 MetaMask 钱包')
        return
      }

      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
            image,
          },
        },
      })

      if (wasAdded) {
        console.log(`✅ ${symbol} 添加成功`)
      } else {
        console.log(`⛔ 用户取消了添加 ${symbol}`)
      }
    } catch (error) {
      console.error('添加失败:', error)
    }
  }

  return (
    <Button variant="secondary" onClick={handleClick}>
      添加 {symbol} 到钱包
    </Button>
  )
}
