// apps/web/app/signIn.tsx
'use client'

import {SignInCard} from '@/features/auth/components/SignInCard'
import { useSignLogin712 } from '@/features/auth/hooks/useSignLogin712'
import { useWalletSnapshot } from '@/features/wallet/hooks/useWalletSnapshot'
import { useAuthToken } from '@/features/auth/hooks/useAuthToken'
import {  useState } from 'react'
import { Button } from '@/components/ui/button'
import { showError, showSuccess } from '@/lib/toast'

export default function SignInPage() {
  const { isConnected, address } = useWalletSnapshot()
  const { signIn, isSigned, signature, message } = useSignLogin712()
  const { token, saveToken, clearToken, isAuthed } = useAuthToken()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!signature || !message || !address) {
      showError('请先完成签名登录')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, message, signature }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '登录失败')

      saveToken(data.token)
      showSuccess('登录 token 获取成功')
    } catch (e) {
      showError(`Token 获取失败: ${(e as Error).message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <SignInCard />

      <div className="border p-4 rounded bg-white space-y-2 text-sm">
        <h2 className="font-semibold text-lg">🎯 Token 校验登录</h2>

        <Button
          onClick={handleSubmit}
          disabled={!isConnected || !isSigned || isSubmitting || isAuthed}
        >
          {isAuthed ? '✅ 已登录' : isSubmitting ? '请求中...' : '提交签名获取 Token'}
        </Button>

        {isAuthed && (
          <div className="text-xs text-gray-600 break-all">
            🔐 当前 Token: {token}
          </div>
        )}
      </div>
    </div>
  )
}