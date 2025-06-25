// features/auth/hooks/useAuthGuard.ts
import { useEffect } from "react"
import { useRouter } from "next/router"
import { authStore } from "../store/authStore"
import { showError } from "@/lib/toast"

interface UseAuthGuardOptions {
  requireSignature?: boolean
  redirectTo?: string
  returnStatus?: boolean // 默认为 false 时会自动跳转
  validDuration?: number // 签名有效期，单位为毫秒，默认为 15 分钟
}

/**
 * Hook: 用于路由保护与登录校验
 */
export const useAuthGuard = ({
  requireSignature = true,
  redirectTo = "/login",
  returnStatus = false,
   validDuration = 15 * 60 * 1000, // 15分钟
}: UseAuthGuardOptions = {}) => {
  const router = useRouter()
  const {
    authToken,
    loginSig191,
    loginSig712,
    loginTime191,
    loginTime712,
  } = authStore.getState()

   const now = Date.now()

  const isSig191Valid =
    !!loginSig191 && !!loginTime191 && now - loginTime191 < validDuration

  const isSig712Valid =
    !!loginSig712 && !!loginTime712 && now - loginTime712 < validDuration


const hasValidSig = requireSignature ? isSig191Valid || isSig712Valid : true

  const isLoggedIn = !!authToken && hasValidSig


  useEffect(() => {
    if (!isLoggedIn && !returnStatus) {
      showError("请先登录")
      router.replace(redirectTo)
    }
  }, [isLoggedIn, redirectTo, returnStatus, router])

  return returnStatus ? isLoggedIn : undefined
}
