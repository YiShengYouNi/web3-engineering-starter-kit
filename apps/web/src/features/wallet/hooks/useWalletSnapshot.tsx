
import { useShallow } from 'zustand/shallow'
import { useStore } from 'zustand/react'
import { shortAddress } from '../utils'
import { walletStore, type WalletState } from '../store/walletStore'


export const useWalletSnapshot = () => {
  const selector = useShallow((s:WalletState) => ({
    address: s.address,
    chainId: s.chainId,
    chainName: s.chainName,
    connector: s.connector,
    ensName: s.ensName,
    isConnected: !!s.address && !!s.connector,
    addressShort: s.address ? shortAddress(s.address) : '',
    lastConnectorId: s.lastConnectorId,
  }))

  return useStore(walletStore, selector)
}