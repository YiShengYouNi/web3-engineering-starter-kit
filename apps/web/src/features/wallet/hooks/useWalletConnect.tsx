// features/wallet/hooks/useWalletConnect.ts

import { useConnect, useDisconnect, useAccount, useChains, useChainId, useEnsName } from 'wagmi'
import { useEffect } from 'react'
import { walletStore } from '../store/walletStore'

export function useWalletConnect() {
  const { connectors, connect, status: connectStatus } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected, connector } = useAccount()
  const chainId = useChainId()
  const chains = useChains() 
  const chain = chains.find((c) => c.id === chainId) || { id: chainId, name: 'Unknown' }

  // console.log('useWalletConnect', 'connected chain:', chain.name );
 const { data: ens } = useEnsName({ address })
  const {
    setAddress,
    setConnector,
    setChainId: setChain,
    setLastConnectorId,
    setEnsName,
    setChainName,
    lastConnectorId,
    reset,
  } = walletStore.getState();


  // 自动连接上次连接器
  useEffect(() => {
    if(!isConnected&& lastConnectorId) {
        const last = connectors.find((c) => c.id === lastConnectorId)
        if (last) connect({ connector: last })
    }
  }, [connectors, lastConnectorId, isConnected])

    // ✅ 钱包状态变化时，写入 store
  useEffect(() => {
    if (isConnected && address && connector) {
      setAddress(address)
      setConnector(connector)
      setChain(chainId)
      setChainName(chain.name)
      setEnsName(ens?? null)
    } else {
      reset()
    }
  }, [isConnected, address, connector, chainId])

  const handleConnect = async (connector: typeof connectors[number]) => {
    setLastConnectorId(connector.id)
    await connect({ connector })
  }

  return {
    connectors,
    connectStatus,
    isConnected,
    address,
    currentConnector: connector,
    handleConnect,
    disconnect,
  }
}
