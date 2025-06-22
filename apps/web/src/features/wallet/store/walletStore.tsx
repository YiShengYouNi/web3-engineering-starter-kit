// features/wallet/store/walletStore.ts
import { create } from 'zustand'
import { Connector } from 'wagmi'

interface WalletState {
  
}

interface WalletState {
  address: `0x${string}` | null, // Ethereum address in checksum format
  connector: Connector | null, // The connector used for the wallet connection
  chainId: number | null, // The current chain ID the wallet is connected to
  lastConnectorId: string | null, // ID of the last used connector for auto-reconnect
  setAddress: (address: `0x${string}` | null) => void
  setConnector: (connector: Connector | null) => void
  setChainId: (chainId: number | null) => void
  setLastConnectorId: (id: string) => void
  reset: () => void
}

export const walletStore = create<WalletState>()((set) => ({
  lastConnectorId: null,
  address: null,
  connector: null,
  chainId: null,
  setAddress: (address) => set({ address }),
  setConnector: (connector) => set({ connector }),
  setChainId: (chainId) => set({ chainId }),
  reset: () => set({ address: null, connector: null, chainId: null }),
  setLastConnectorId: (id) => set({ lastConnectorId: id }),
}))
