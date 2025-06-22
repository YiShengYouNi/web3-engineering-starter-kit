// apps/web/scripts/test-token-info.ts
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
import { hengAbi } from 'config/abi/heng'

async function main() {
  const client = createPublicClient({
    chain: sepolia,
    transport: http('https://sepolia.infura.io/v3/ee6aea002dea45cf8d61f0eeb78b9fe0'), // ❗ 请替换为自己的 RPC
  })

  const address = '0x98Af4488A1B9E9415c5Cf5512e6F9f49488E33fa' // ❗请替换成你部署的 Heng 合约地址

  const name = await client.readContract({
    address,
    abi: hengAbi,
    functionName: 'name',
  })

  const symbol = await client.readContract({
    address,
    abi: hengAbi,
    functionName: 'symbol',
  })

  const decimals = await client.readContract({
    address,
    abi: hengAbi,
    functionName: 'decimals',
  })

  const balance = await client.readContract({
    address,
    abi: hengAbi,
    functionName: 'balanceOf',
    args: ['0xbd21a1242983e4A1DcA597300e0986e22CA304b1'], // ❗替换为你自己的钱包地址
  })

  console.log('🧾 Token name:', name)
  console.log('🔣 Token symbol:', symbol)
  console.log('🧮 Token decimals:', decimals)
  console.log('💰 Your balance:', balance.toString())
}

main().catch(console.error)
