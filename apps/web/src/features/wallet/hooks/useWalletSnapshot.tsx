
import { shortAddress } from '../utils'
import { walletStore } from '../store/walletStore'

export function useWalletSnapshot() {

  return walletStore((s) => ({
    address: s.address,
    chainId: s.chainId,
    connector: s.connector,
    ensName: s.ensName,
    isConnected: !!s.address && !!s.connector,
    addressShort: s.address ? shortAddress(s.address) : '',
    lastConnectorId: s.lastConnectorId,
  }))
}
