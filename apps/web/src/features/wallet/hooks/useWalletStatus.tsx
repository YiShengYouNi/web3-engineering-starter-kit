import { useAccount, useChainId, useEnsName } from 'wagmi'
import { shortAddress } from '../utils'

export function useWalletStatus() {
  const { address, isConnected, connector } = useAccount()
  const chainId = useChainId()
  const { data: ens } = useEnsName({ address })

  return {
    address,
    addressShort: address ? shortAddress(address) : '',
    isConnected,
    connector,
    chainId,
    ensName: ens,
  }
}
