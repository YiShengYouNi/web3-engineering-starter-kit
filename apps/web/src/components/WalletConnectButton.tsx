
'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useConnect, useDisconnect, useAccount } from 'wagmi'
import { useState, useEffect } from 'react'

export function WalletConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [connectingId, setConnectingId] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // ❗ 避免 SSR 内容渲染出错

  if (isConnected && address) {
    return (
      <Button
      variant="secondary"
        onClick={() => disconnect()}
      >
        断开连接 ({address.slice(0, 6)}...{address.slice(-4)})
      </Button>
    )
  }

  return (
  
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>连接钱包</Button>
      </DialogTrigger>
      <DialogContent  aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>选择钱包</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-2">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => {
                setConnectingId(connector.uid),
                connect({ connector })}}
              disabled={ isPending}
            >
              {connector.name}
              {isPending && connectingId === connector.uid && ' (连接中...)'}
            </Button>
          ))}
           {status === 'error' && error && (
            <p className="text-sm text-red-500 mt-2">连接失败：{error.message}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
)
}
