import { useEffect } from 'react'
import { useChains, useAccount, useChainId, useEnsName } from 'wagmi'
import { walletStore } from '../store/walletStore'

export function useWalletEvents() {

  const { address, connector } = useAccount()
  const chainId = useChainId()
  const chains = useChains()
  const chain = chains.find((c) => c.id === chainId) || { id: chainId, name: 'Unknown' }
  const { data: ens } = useEnsName({ address })

  useEffect(() => {
    // 初始设置
    walletStore.setState({ address, chainId, connector, chainName: chain.name, ensName: ens ?? null })

    if (!connector) return

    // 🔁 监听账号变化
    const handleChange = (data: {
      account?: `0x${string}`
      chain?: { id: number }
    }) => {
      if (data.account) walletStore.setState({ address: data.account })
      if (data.chain?.id) walletStore.setState({ chainId: data.chain.id })
    }

    const handleDisconnect = () => {
      walletStore.getState().reset()
    }
    const conn = connector as Partial<{
      on: (event: string, fn: (...args: any[]) => void) => void
      off: (event: string, fn: (...args: any[]) => void) => void
    }>


    conn.on?.('change', handleChange)
    conn.on?.('disconnect', handleDisconnect)

    return () => {
      conn.off?.('change', handleChange)
      conn.off?.('disconnect', handleDisconnect)
    }
  }, [connector, address, chainId])
}
