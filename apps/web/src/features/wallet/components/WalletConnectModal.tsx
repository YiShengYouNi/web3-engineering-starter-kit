// features/wallet/components/WalletConnectModal.tsx
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle,DialogDescription } from '@/components/ui/dialog'
import { useWalletConnect } from '../hooks/useWalletConnect'

export default function WalletConnectModal({ open, onClose }: { open: boolean; onClose: () => void }) {

  const { connectors, handleConnect, isConnected } = useWalletConnect()

  // connectors.forEach((c) => {console.log(`Connector: ${c.name}, ID: ${c.id}, Ready: ${c.ready}`)})

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent aria-description='undefined'>
        <DialogHeader>
          <DialogTitle>连接钱包</DialogTitle>
           <DialogDescription>
              wallet connect modal
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {connectors.map((c) => (
            <button
              key={c.id}
              onClick={async () => {
                await handleConnect(c)
                if (isConnected) onClose()
              }}
              disabled={c.ready === false }
              className="w-full border px-3 py-2 rounded"
            >
              {c.name}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
