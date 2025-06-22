'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useAccount } from 'wagmi'
import { useHengContract } from '../hooks/useHengContract'
import { useHengRole } from '../hooks/useHengRole'

export function SetLogoButton() {
  const { address } = useAccount()
  const { writeContract } = useHengContract()
  const { isOwner } = useHengRole(address)

  const [logoUrl, setLogoUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSetLogo = async () => {
    if (!writeContract || !logoUrl) return
    try {
      setLoading(true)
      await writeContract.write.setLogoURI!([logoUrl])
      toast.success('✅ Token logo 更新成功')
    } catch (err) {
      console.error('❌ 更新失败:', err)
      toast.error('❌ 更新失败，请检查钱包或合约权限')
    } finally {
      setLoading(false)
    }
  }

  if (!isOwner) return null

  return (
    <div className="space-y-2">
      <Input
        type="url"
        placeholder="请输入已上传的 IPFS 图标链接（HTTPS）"
        value={logoUrl}
        onChange={(e) => setLogoUrl(e.target.value)}
      />
      <Button onClick={handleSetLogo} disabled={loading || !logoUrl}>
        {loading ? '更新中...' : '更新 Logo 地址'}
      </Button>
    </div>
  )
}
