'use client'

import { useWalletClient, usePublicClient } from 'wagmi'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getAddressByChainIdAndTokenName, getExplorerUrl } from '@chains';
import { walletStore } from '@/features/wallet/store/walletStore'
import { useTotalSupply } from '../hooks/useTotalSupply'
import { useIsMinter } from '../hooks/useIsMinter'
import { useTokenMeta } from '../hooks/useTokenMeta'
import MintButton from './MintButton'
import AddToWalletButton from './AddToWalletButton'
import { getAddress } from 'viem';
// import { SetLogoButton } from './SetLogoButton'




export function TokenInfoCard() {
  const publicClient= usePublicClient()
  const { data: walletClient } = useWalletClient()
  const chainId = walletStore((s) => s.chainId)?? 0;
  const address= getAddressByChainIdAndTokenName(chainId, 'heng')

  const { data: totalSupply, isLoading: loadingSupply } = useTotalSupply(publicClient!)

  const { data: isMinter, isLoading: loadingMinter } = useIsMinter(publicClient!)

  const { data: meta, isLoading: loadingMeta } = useTokenMeta(publicClient!)

  const explorerLink = chainId && address ? getExplorerUrl(chainId, address) : ''

  // console.log('🚀 TokenInfoCard:', 'isMinter:', isMinter)

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <h2 className="font-semibold text-lg">🪙 Token 信息</h2>

          {loadingMeta ? (
            <div>加载元信息...</div>
          ) : (
            <>
              <div>名称：{meta?.name}</div>
              <div>符号：{meta?.symbol}</div>
              <div>总供应量：{loadingSupply ? '加载中...' : totalSupply?.toString()}</div>
              {meta?.logoURI && (
                <div className="flex items-center space-x-2">
                  <span>Logo：</span>
                  <img src={meta.logoURI} alt="Token Logo" className="w-6 h-6 rounded" />
                </div>
              )}
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          合约地址：<span className="text-black">{address}</span>
          {explorerLink && (
            <a
              href={explorerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              查看
            </a>
          )}
        </div>
        <div>
          Mint 权限：
          {loadingMinter ? '检测中...' : isMinter ? '✅ 你可以 Mint' : '❌ 无权限'}
        </div>

        {isMinter && walletClient && <MintButton walletClient={walletClient} />}

        <AddToWalletButton
          name={meta?.name}
          symbol={meta?.symbol || ''}
          decimals={meta?.decimals}
          image={meta?.logoURI}
        />
        {/* <SetLogoButton /> */}
      </CardContent>
    </Card>
  )
}
