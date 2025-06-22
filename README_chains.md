# 🔗 多链配置模块说明（chains.ts）

为适配 Web3 多链开发需求，项目使用统一的 `chains.ts` 配置模块集中管理链信息，包括：

- 链 ID、名称、图标、原生代币名
- RPC 访问地址
- 区块浏览器信息
- 合约地址

该模块服务于 wagmi、合约交互、UI 展示、地址跳转等多个场景，提升多链可维护性与扩展性。

---

## ✅ 模块位置

packages/config/chains.ts

---

## ✅ 核心结构定义

```ts
interface ChainConfig {
  id: number
  name: string
  nativeCurrency: string
  rpcUrls: string[]
  blockExplorers: {
    name: string
    url: string
  }
  contracts: {
    heng: Address
  }
}
```

## ✅ 提供的工具函数

```ts
getChainById(chainId: number): ChainConfig | undefined
getExplorerUrl(chainId: number, txOrAddress: string): string
getHengAddress(chainId: number): Address
```
