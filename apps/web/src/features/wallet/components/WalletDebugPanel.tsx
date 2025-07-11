'use client'


import { useWalletClient } from 'wagmi'
import { useState } from 'react'
import WalletConnectModal from './WalletConnectModal'
import { walletStore } from '../store/walletStore'
import { useWalletSnapshot } from '../hooks/useWalletSnapshot'
import {useIsClient } from '../hooks/useIsClient'

export default function WalletDebugPanel() {
  const {  addressShort, chainId, ensName, chainName, isConnected } = useWalletSnapshot()

  // const chainName = walletStore((s) => s.chainName) || '未知网络'
  // const addressShort = walletStore((s) => s.address) || '未连接';

  const { data: walletClient } = useWalletClient()
  const [open, setOpen] = useState(false);

  const isClient = useIsClient()
if (!isClient) return null

  return (
    <div className="p-4 border rounded mt-6 space-y-2 bg-gray-50 text-sm">
      <h2 className="font-semibold text-lg">🔍 Wallet Debug Panel</h2>

      {!isConnected && (
        <>
          <button
            onClick={() => setOpen(true)}
            className="px-3 py-1 border rounded bg-black text-white hover:opacity-80"
          >
            连接钱包
          </button>
          <WalletConnectModal open={open} onClose={() => setOpen(false)} />
        </>
      )}

      <div>✅ 连接状态: <span className="font-mono">{isConnected ? '已连接' : '未连接'}</span></div>
      <div>👛 钱包地址: <span className="font-mono">{addressShort || '—'}</span></div>
      <div>🧠 ENS 名称: <span className="font-mono">{ensName || '无'}</span></div>
      <div>🔗 网络名称: <span className="font-mono">{chainName}</span></div>
      <div>🔗 当前链 ID: <span className="font-mono">{chainId}</span></div>
      <div>⚙️ WalletClient: <span className="font-mono">{walletClient ? '✅ 可用' : '❌ 不可用'}</span></div>
    </div>
  )
}
