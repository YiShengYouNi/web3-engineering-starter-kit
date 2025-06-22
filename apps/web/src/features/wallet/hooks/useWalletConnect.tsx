// features/wallet/hooks/useWalletConnect.ts

import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { walletStore } from '../store/walletStore'

export function useWalletConnect() {
  const { connectors, connect, status: connectStatus } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnected, connector } = useAccount()

  const { lastConnectorId, setLastConnectorId } = walletStore()

   const [connectingId, setConnectingId] = useState<string | null>(null)

  // 自动连接上次连接器
  useEffect(() => {
    const last = connectors.find((c) => c.id === lastConnectorId)
    if (last) connect({ connector: last })
  }, [connectors])

  const handleConnect = async (connector: typeof connectors[number]) => {
    setLastConnectorId(connector.id)
    setConnectingId(connector.id)
    await connect({ connector })
  }

  return {
    connectors,
    connectStatus,
    isConnected,
    connectingId,
    address,
    currentConnector: connector,
    handleConnect,
    disconnect,
  }
}
