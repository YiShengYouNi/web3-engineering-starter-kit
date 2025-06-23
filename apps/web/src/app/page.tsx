'use client'
import {useAccount } from "wagmi";
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
    
  
        {address && (
          <TokenInfoCard address={address} />
        ) }
      </div> 
    </main>
     
    </div>
  );
}
