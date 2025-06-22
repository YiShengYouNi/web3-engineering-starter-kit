// features/wallet/store/walletStore.ts
import { create } from 'zustand'
import { Connector } from 'wagmi'

interface WalletState {
  address: `0x${string}` | null, // Ethereum address in checksum format
  connector: Connector | null, // The connector used for the wallet connection
  ensName?: string | null, // Optional ENS name associated with the address
  chainId: number | null, // The current chain ID the wallet is connected to
  lastConnectorId: string | null, // ID of the last used connector for auto-reconnect
  setAddress: (address: `0x${string}` | null) => void
  setConnector: (connector: Connector | null) => void
  setChainId: (chainId: number | null) => void
  setEnsName: (ensName: string | null) => void
  setLastConnectorId: (id: string) => void
  reset: () => void
}

export const walletStore = create<WalletState>()((set) => ({
  lastConnectorId: null,
  address: null,
  connector: null,
  chainId: null,
  ensName: null,
  setAddress: (address) => set({ address }),
  setConnector: (connector) => set({ connector }),
  setChainId: (chainId) => set({ chainId }),
  setEnsName: (ensName) => set({ ensName }),
  reset: () => set({ address: null, connector: null, chainId: null }),
  setLastConnectorId: (id) => set({ lastConnectorId: id }),
}))
