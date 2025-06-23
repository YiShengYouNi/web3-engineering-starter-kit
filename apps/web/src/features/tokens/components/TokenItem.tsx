// features/tokens/components/TokenItem.tsx
'use client'

import type { TokenInfo } from '../hooks/useUserTokens'

interface Props {
  token: TokenInfo
  onClick: (token: TokenInfo) => void
}

export default function TokenItem({ token, onClick }: Props) {
  return (
    <li>
      <button
        className="text-blue-600 underline hover:opacity-80"
        onClick={() => onClick(token)}
      >
        {token.symbol} ({token.name})
      </button>
    </li>
  )
}
