

import { useEffect } from 'react'

export function useLoginExpiry(mode: 'eip191' | 'eip712',clear: () => void) {  
  useEffect(() => {
    const key = mode === 'eip191' ? 'loginTime191' : 'loginTime712'
    const raw = localStorage.getItem('auth-store')
    if (!raw) return
    try {
      const data = JSON.parse(raw)
      const ts = data.state?.[key] as number | undefined
      if (ts && Math.floor(Date.now() / 1000) - ts > 600) {
        clear()
      }
    } catch (e) {}
  }, [mode, clear])
}