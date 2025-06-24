
import { useCallback, useState } from 'react';
import { useSignMessage, useSignTypedData } from 'wagmi';
import { authStore } from '../store/authStore';
import { showError, showSuccess } from '@/lib/toast'
import { useWalletSnapshot } from '@/features/wallet/hooks/useWalletSnapshot';


export function useSignLoginFactory(mode: 'eip191' | 'eip712') {

  const { address, isConnected, chainId } = useWalletSnapshot() // 获取钱包状态

  const [isLoggingIn, setIsLoggingIn] = useState(false)


  const loginKey = mode === 'eip191' ? 'loginSig191' : 'loginSig712'
  const loginTimeKey = mode === 'eip191' ? 'loginTime191' : 'loginTime712'
  const loginMsgKey = mode === 'eip191' ? 'loginMessage191' : 'loginMessage712'

  const sig = authStore.getState()[loginKey] as string | null
  const msg = authStore.getState()[loginMsgKey] as string | null
  const ts = authStore.getState()[loginTimeKey] as number | null


  const { signMessageAsync } = useSignMessage()
  const { signTypedDataAsync } = useSignTypedData()

  const signIn = useCallback(async () => {
    if (!address || !isConnected) {
      showError('请先连接钱包')
      return
    }
    setIsLoggingIn(true);

    try {

      const timestamp = BigInt(Math.floor(Date.now() / 1000));
      let signature = ''
      let message = ''

      if (mode === 'eip191') {
        message = `登录签名认证\n地址：${address}\n时间：${new Date().toISOString()}`
        signature = await signMessageAsync({ message })
      } else {
        const typedMsg = { wallet: address, timestamp }
        message = JSON.stringify(typedMsg)
        signature = await signTypedDataAsync({
          domain: {
            name: 'Web3 Engineering Starter',
            version: '1',
            chainId,
          },
          types: {
            Login: [
              { name: 'wallet', type: 'address' },
              { name: 'timestamp', type: 'uint256' },
            ],
          },
          primaryType: 'Login',
          message: typedMsg,
        })
      }
      authStore.setState({
        [loginKey]: signature,
        [loginTimeKey]: timestamp,
        [loginMsgKey]: message,
      })
      showSuccess(`${mode.toUpperCase()} 登录成功`)
    } catch (err) {
      showError(`${mode.toUpperCase()} 登录失败`)
    } finally {
      setIsLoggingIn(false);
    }
  }, [address, isConnected, chainId, mode, signMessageAsync, signTypedDataAsync]);


  return {
    signIn,
    isLoggingIn,
    isSigned: !!sig,
    signature: sig,
    message: msg,
    expired: ts ? Math.floor(Date.now() / 1000) - ts > 600 : false,
    clearSignature: () => authStore.setState({ [loginKey]: null, [loginTimeKey]: null, [loginMsgKey]: null })
  }
}

