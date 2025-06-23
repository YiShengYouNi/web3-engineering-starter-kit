// features/wallet/WalletProvider.tsx
'use client'

import { useWalletEvents } from '@/features/wallet/hooks/useWalletEvents'

export function WalletProvider({ children }: { children: React.ReactNode }) {
  useWalletEvents()
  return children
}