'use client'

import { useState } from 'react'
import { useMint } from '../hooks/useMint'
import { WalletClient } from 'viem' 

export default function MintButton({ walletClient }: { walletClient: WalletClient }) {
  const [amount, setAmount] = useState('1')
  const { mutate: mint, isPending, isSuccess, data: txHash, error } = useMint(walletClient)

  return (
    <div className="space-y-2">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-2 py-1 rounded w-full"
        min={1}
      />

      <button
        onClick={() => mint(BigInt(amount))}
        disabled={isPending || !amount}
        className="bg-black text-white px-4 py-1 rounded w-full hover:opacity-90"
      >
        {isPending ? '铸造中...' : 'Mint'}
      </button>

      {isSuccess && txHash && (
        <div className="text-green-600 text-sm break-all">
          成功发送交易：{txHash}
        </div>
      )}
      {error && (
        <div className="text-red-500 text-sm">
          铸造失败：{error.message}
        </div>
      )}
    </div>
  )
}

