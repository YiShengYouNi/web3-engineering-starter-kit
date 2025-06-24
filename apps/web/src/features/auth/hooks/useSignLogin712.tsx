// features/auth/hooks/useSignLogin712.ts
import { useCallback, useState } from 'react'
import { useAccount, useSignTypedData } from 'wagmi'
import { authStore } from '../store/authStore'
import { showError, showSuccess } from '@/lib/toast'
import { useChainId } from 'wagmi'
import { useWalletSnapshot } from '@/features/wallet/hooks/useWalletSnapshot'

// EIP-712 类型定义
// 定义了登录消息的结构，包含钱包地址和时间戳
// 可根据实际需求扩展更多字段。例如：添加用户ID、应用名称等
const EIP712_TYPES = {
  Login: [
    { name: 'wallet', type: 'address' },
    { name: 'timestamp', type: 'uint256' },
  ],
}

export function useSignLogin712() {
  // const { address, isConnected } = useAccount()
  // const chainId = useChainId()
  const {address, isConnected, chainId} = useWalletSnapshot() // 获取钱包状态
  const { signTypedDataAsync } = useSignTypedData()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  

  const signIn = useCallback(async () => {
    if (!isConnected || !address) {
      showError('请先连接钱包')
      return
    }

    try {
      setIsLoggingIn(true)
      const timestamp = Math.floor(Date.now() / 1000)
      const value = { wallet: address, timestamp }

      const signature = await signTypedDataAsync({
        domain: {
          name: 'Web3 Engineering Starter',
          version: '1',
          chainId,
        },
        types: EIP712_TYPES,
        primaryType: 'Login',
        message: value,
      })

      authStore.setState({
        loginSig712: signature,
        loginMessage712: JSON.stringify(value),
        loginTime712: timestamp, 
      })
      showSuccess('EIP-712 登录成功')
    } catch (err) {
      showError('EIP-712 登录失败')
    } finally {
      setIsLoggingIn(false)
    }
  }, [address, isConnected, signTypedDataAsync, chainId])

  return {
    signIn,
    isLoggingIn,
    isSigned: !!authStore.getState().loginSig712,
    signature: authStore.getState().loginSig712,
    message: authStore.getState().loginMessage712,
  }
}