'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import type { TokenInfo } from '../hooks/useUserTokens'

interface Props {
  token: TokenInfo | null
  onClose: () => void
}

export default function TokenDetailModal({ token, onClose }: Props) {
  if (!token) return null

  return (
    <Dialog open={!!token} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{token.name}</DialogTitle>
        <div className="text-sm space-y-1 mt-2">
          <div>符号：{token.symbol}</div>
          <div>余额：{token.balance}</div>
          <div>合约地址：<span className="font-mono text-xs">{token.address}</span></div>
          <div>精度：{token.decimals}</div>
          {token.logoURI && <img src={token.logoURI} alt="logo" className="w-12 h-12 mt-2" />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
