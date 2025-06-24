// features/auth/hooks/useSignLogin.ts
import { useCallback, useState } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import { showError, showSuccess } from '@/lib/toast'
import { authStore } from '../store/authStore'

export function useSignLogin() {
  const { address, isConnected } = useAccount()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { signMessageAsync } = useSignMessage()

  const signIn = useCallback(async () => {
    if (!isConnected || !address) {
      showError('请先连接钱包')
      return
    }

    try {
      setIsLoggingIn(true)

      // 1. 构造登录消息（可扩展为服务端下发）
      const message = `登录签名认证\n地址：${address}\n时间：${new Date().toISOString()}`

      // 2. 发起签名
      const signature = await signMessageAsync({ message })

      // 3. 保存登录状态（可扩展为服务端校验）
      authStore.setState({ loginSig191: signature, loginMessage191: message })

      showSuccess('登录成功')
    } catch (err) {
      showError('签名登录失败')
    } finally {
      setIsLoggingIn(false)
    }
  }, [address, isConnected, signMessageAsync])

  return {
    signIn,
    isLoggingIn,
    isSigned: !!authStore.getState().loginSig191,
    signature: authStore.getState().loginSig191,
    message: authStore.getState().loginMessage191,
  }
}
