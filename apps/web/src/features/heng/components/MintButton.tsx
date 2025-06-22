'use client'

import { useState } from 'react'
import { parseEther } from 'viem'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useHengContract } from '@/features/heng/hooks/useHengContract'
// import { useHengRole } from '@/features/heng/hooks/useHengRole'

export function MintButton({isMinter}: { isMinter?: boolean }) {
  const { address } = useAccount()
  const { writeContract } = useHengContract()
  // const { isMinter } = useHengRole()

  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const handleMint = async () => {
    if (!writeContract || !address || !amount) return

    try {
      setLoading(true)
      const txHash = await writeContract.write.mint([address, parseEther(amount)])
      console.log('✅ Minted, txHash:', txHash)
      alert('Mint 成功！请稍后刷新余额')
    } catch (err) {
      console.error(err)
      alert('Mint 失败，请检查是否为 minter')
    } finally {
      setLoading(false)
    }
  }

  if (!isMinter) return null

  return (
    <div className="mt-4 space-y-2">
      <input
        type="number"
        placeholder="输入 mint 数量"
        className="w-full px-4 py-2 rounded-xl border dark:border-zinc-700 bg-white dark:bg-zinc-800"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button
        onClick={handleMint}
        disabled={loading}
        className="w-full px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50"
      >
        {loading ? '铸造中...' : '铸造 Token'}
      </Button>
    </div>
  )
}
