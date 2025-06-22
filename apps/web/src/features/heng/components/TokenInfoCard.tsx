'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useHengContract } from '../hooks/useHengContract'
import { useHengRole } from '../hooks/useHengRole'
import { formatUnits } from 'viem'
import { MintButton } from './MintButton'
import {AddToWalletButton} from './AddToWalletButton'
import { SetLogoButton } from './SetLogoButton'

interface Props {
  address: `0x${string}`
}

export function TokenInfoCard({address}:Props) {

  const { readContract } = useHengContract()
  const { isMinter } = useHengRole(address)

  const [balance, setBalance] = useState<string>('0')
  const [symbol, setSymbol] = useState<string>('HENG')
  const [name, setName] = useState<string>('Heng Token')
  const [decimals, setDecimals] = useState<number>(18)
  const [logoURI, setLogoURI] = useState<string | null>(null)

  // console.log('🚀 TokenInfoCard:', 'isMinter:', isMinter)

  useEffect(() => {
    if (!address || !readContract) return

    async function fetchData(contract: NonNullable<typeof readContract>) {
      try {
        const [rawBalance, tokenSymbol, tokenName, tokenDecimals, uri] = await Promise.all([
          contract.read.balanceOf([address]),
          contract.read.symbol(),
          contract.read.name(),
          contract.read.decimals(),
          contract.read.logoURI(),
        ])
        console.log('🚀 Token 合约信息:', 'logo:', uri);
        setBalance(formatUnits(rawBalance, tokenDecimals))
        setSymbol(tokenSymbol)
        setName(tokenName)
        setDecimals(tokenDecimals)
        setLogoURI(uri)
      } catch (err) {
        console.warn('🚨 Token 合约信息获取失败:', err)
      }
    }

    fetchData(readContract)
  }, [address, readContract])

  return (
    <Card className="max-w-md w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          {logoURI && (
            <img
              src={logoURI}
              alt="token logo"
              className="w-8 h-8 rounded-full object-cover border"
              width={64}
              height={64}
            />
          )}
          {name} ({symbol})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          当前地址余额：<span className="text-black">{balance} {symbol}</span>
        </div>
       
        <MintButton isMinter={isMinter} />

        <AddToWalletButton
          address={address}
          name={name}
          symbol={symbol}
          decimals={decimals}
          image={logoURI}
        />
        <SetLogoButton />
      </CardContent>
    </Card>
  )
}
