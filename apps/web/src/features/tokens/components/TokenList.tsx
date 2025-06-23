'use client'

import { useUserTokens } from '../hooks/useUserTokens'
import { useState } from 'react'
import TokenDetailModal from './TokenDetailModal'
import TokenItem from './TokenItem'

export default function TokenList() {
  const { data: tokens = [], isLoading } = useUserTokens()
  const [selectedToken, setSelectedToken] = useState(null)

  if (isLoading) return <div>加载中...</div>
  if (!tokens || tokens.length === 0) return <div>暂无 Token</div>

  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-lg">🎒 我的代币</h2>
      <ul className="space-y-1">
        {tokens.map((token) => (
         <TokenItem key={token.address} token={token} onClick={setSelectedToken} />
        ))}
      </ul>
      <TokenDetailModal token={selectedToken} onClose={() => setSelectedToken(null)} />
    </div>
  )
}