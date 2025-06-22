'use client'
import {useAccount } from "wagmi";
import { WalletConnectButton } from '@/components/WalletConnectButton';
import { TokenInfoCard } from "@/features/heng/components/TokenInfoCard";
import WalletDebugPanel from '@/features/wallet/components/WalletDebugPanel'

export default function Home() {
  const { address } = useAccount()
  return (
    <div className=" justify-center bg-gradient-to-tr from-primary to-accent text-white">
     <main className=" bg-gray-50 dark:bg-zinc-900 p-6 text-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold">DApp 首页</h1>
   
      <WalletDebugPanel />
      <div className="max-w-2xl mx-auto space-y-8">
      
        {/* <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Heng Token DApp</h1>
         <WalletConnectButton />
        </header>

        {address ? (
          <TokenInfoCard address={address} />
        ) : (
          <div className="rounded-2xl p-6 border dark:border-zinc-700 bg-white dark:bg-zinc-800 text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              ⚠️ 请先连接钱包以查看 Token 信息
            </p>
          </div>
        )}*/}
      </div> 
    </main>
     
    </div>
  );
}
