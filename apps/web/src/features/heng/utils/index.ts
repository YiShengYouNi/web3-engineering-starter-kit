interface TokenMeta {
  address: `0x${string}`
  symbol: string
  name?: string,
  decimals?: number
  image?: string // URL
}

export async function addTokenToWallet({ address, symbol, decimals, image }: TokenMeta) {
  if (!window?.ethereum || !window.ethereum.request) {
    throw new Error('当前环境不支持添加 Token')
  }

  try {
    const success = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
          image,
        },
      },
    })

    return success
  } catch (err) {
    console.error('[AddTokenError]', err)
    throw new Error('添加 Token 到钱包失败')
  }
}
