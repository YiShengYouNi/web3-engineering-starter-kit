// features/auth/hooks/useAuthToken.ts
import { useEffect, useCallback } from 'react'
import { authStore } from '../store/authStore'

const TOKEN_KEY = 'auth-token'

export function useAuthToken() {

  const token = authStore((s) => s.authToken)

  // 初始化从 localStorage 加载 token
  useEffect(() => {
    const localToken = localStorage.getItem(TOKEN_KEY)
    if (localToken) {
      authStore.getState().setAuthToken(localToken)
    }
  }, [])

  const saveToken = useCallback((t: string) => {
    authStore.getState().setAuthToken(t)
    localStorage.setItem(TOKEN_KEY, t)
  }, [])

  const clearToken = useCallback(() => {
    authStore.getState().clearAuthToken()
    localStorage.removeItem(TOKEN_KEY)
  }, [])

  return {
    token,
    saveToken,
    clearToken,
    isAuthed: !!token,
  }
}
