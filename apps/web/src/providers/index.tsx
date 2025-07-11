'use client'

import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiConfig } from '@/lib/wallet'
import { WalletProvider} from './WalletProvider'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletProvider> 
          {children}
          </WalletProvider>
        
      </QueryClientProvider>
    </WagmiProvider>
  )
}
