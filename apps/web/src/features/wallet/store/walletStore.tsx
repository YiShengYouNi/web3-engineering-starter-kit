// features/wallet/store/walletStore.ts
import { createStore } from 'zustand/vanilla'
import { Connector } from 'wagmi'

export interface WalletState {
  address: `0x${string}` | null, // Ethereum address in checksum format
  connector: Connector | null, // The connector used for the wallet connection
  ensName?: string | null, // Optional ENS name associated with the address
  chainId: number | bigint | undefined, // The current chain ID the wallet is connected to
  chainName?: string | null, // Optional name of the current chain
  lastConnectorId: string | null, // ID of the last used connector for auto-reconnect
  setAddress: (address: `0x${string}` | null) => void
  setConnector: (connector: Connector | null) => void
  setChainId: (chainId: number | bigint | undefined) => void
  setChainName: (chainName: string | null) => void
  setEnsName: (ensName: string | null) => void
  setLastConnectorId: (id: string) => void
  reset: () => void
}

export const walletStore = createStore<WalletState>()((set) => ({
  lastConnectorId: null,
  address: null,
  connector: null,
  chainId: undefined,
  chainName: null,
  ensName: null,
  setAddress: (address) => set({ address }),
  setConnector: (connector) => set({ connector }),
  setChainId: (chainId) => set({ chainId }),
  setChainName: (chainName) => set({ chainName }),
  setEnsName: (ensName) => set({ ensName }),
  setLastConnectorId: (id) => set({ lastConnectorId: id }),
  reset: () => set({ address: null, connector: null, chainId: undefined, lastConnectorId: null, ensName: null }),
}))