import { useWalletClient } from 'wagmi'

export function useActiveWalletClient() {
  const { data: client } = useWalletClient()
  return client
}
