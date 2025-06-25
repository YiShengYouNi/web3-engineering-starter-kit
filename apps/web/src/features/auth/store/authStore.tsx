// features/auth/store/authStore.ts
import { createStore } from 'zustand/vanilla'
// import {create} from 'zustand';
import { persist } from 'zustand/middleware'

interface AuthState {
  loginSig191: string | null
  loginMessage191: string | null
  loginTime191: number | null
  loginSig712: string | null
  loginMessage712: string | null
  loginTime712: number | null
  authToken: string | null
  setToken: (token: string) => void
  clearToken: () => void
  reset: () => void
  //   setLoginSig191: (sig: string, expiry?: number) => void
  // setLoginSig712: (sig: string, expiry?: number) => void
}
type NoMiddleware = [] // 明确告诉 TS 是中间件空列表

export const authStore = createStore<AuthState>()(
  persist(
    (set) => ({
      loginSig191: null,
      loginMessage191: null,
      loginTime191: null,
      loginSig712: null,
      loginMessage712: null,
      loginTime712: null,
      authToken: null,
      setToken: (token) => set({ authToken: token }),
      clearToken: () => set({ authToken: null }),
      reset: () =>
        set({
          loginSig191: null,
          loginMessage191: null,
          loginTime191: null,
          loginSig712: null,
          loginMessage712: null,
          loginTime712: null,
          authToken: null,
        }),
    }),
    {
      name: 'auth-store',
      partialize: (s) => ({
        loginSig191: s.loginSig191,
        loginMessage191: s.loginMessage191,
        loginTime191: s.loginTime191,
        loginSig712: s.loginSig712,
        loginMessage712: s.loginMessage712,
        loginTime712: s.loginTime712,
        authToken: s.authToken,
      }),
    }
  )
)
