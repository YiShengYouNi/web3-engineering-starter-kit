// features/auth/components/SignInCard.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSignLoginFactory } from '../hooks/useSignLoginFactory'
import { useLoginExpiry} from '../hooks/useLoginExpiry'
import { Button } from '@/components/ui/button'
import { useWalletSnapshot } from '@/features/wallet/hooks/useWalletSnapshot'
import  { authStore } from '../store/authStore'

export function SignInCard() {
  const { addressShort, isConnected } = useWalletSnapshot() // 使用 useWalletSnapshot 获取钱包状态
  
  const [mode, setMode] = useState<'eip191' | 'eip712'>('eip191') // 选择 EIP-191 或 EIP-712 模式
   const [error, setError] = useState<string | null>(null)


  

   const {
    signIn,
    isLoggingIn,
    isSigned,
    signature,
    expired,
    clearSignature,
  } = useSignLoginFactory(mode)

  useLoginExpiry(mode, clearSignature)

  const handleLogout = () => {
    authStore.getState().reset()
    setError(null)
  }

  useEffect(() => {
    if (expired) {
      setError('签名已过期，请重新登录')
    }
  }, [expired])

  return (
    <div className="border p-4 rounded bg-gray-50 text-sm space-y-2">
      <h2 className="font-semibold text-lg">🔐 签名登录认证</h2>
      <div className="flex gap-2 mb-2">
        <Button
          variant={mode === 'eip191' ? 'default' : 'outline'}
          onClick={() => setMode('eip191')}
        >
          EIP-191
        </Button>
        <Button
          variant={mode === 'eip712' ? 'default' : 'outline'}
          onClick={() => setMode('eip712')}
        >
          EIP-712
        </Button>
      </div>
      {!isConnected && <div className="text-red-600">请先连接钱包</div>}

      {isConnected && (
        <>
          <div>👛 钱包地址：<span className="font-mono">{addressShort}</span></div>
          <div>🪪 登录状态：
            {isSigned ? (
              <span className="text-green-600 font-medium"> 已完成签名</span>
            ) : (
              <span className="text-yellow-600"> 未签名</span>
            )}
            {expired && <span className="text-red-500 ml-2">(已过期)</span>}
          </div>

         <div className="flex gap-2">
            <Button
              onClick={signIn}
              disabled={isLoggingIn || (isSigned && !expired)}
            >
              {isLoggingIn ? '签名中...' : isSigned ? (expired ? '重新签名' : '已签名') : '点击签名登录'}
            </Button>

            <Button variant="destructive" onClick={handleLogout}>退出登录</Button>
          </div>

          {isSigned && signature  && (
            <div className="text-xs text-gray-500 break-all">
              ✍️ 签名：{signature.slice(0, 18)}...{signature.slice(-10)}
            </div>
          )}
          {error && (
            <div className="text-xs text-red-600">❌ {error}</div>
          )}
        </>
      )}
    </div>
  )
}