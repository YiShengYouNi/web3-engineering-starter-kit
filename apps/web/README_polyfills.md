# 🧱 Web3 Polyfill 配置说明

在 Web3 前端项目中（如使用 wagmi、viem、ethers.js 等库），经常会遇到如下运行时错误：

- `Buffer is not defined`
- `process is not defined`
- `crypto not found`
- `stream not available in browser`

这是因为部分 Web3 库依赖 Node.js 核心模块，而浏览器环境不具备这些模块。

为了解决这些问题，本项目采用统一的 polyfill 配置方案：

---

## ✅ 1. 全局 Polyfill 文件

文件路径：apps/web/lib/polyfills.ts

内容如下：

```ts
// Buffer polyfill
import { Buffer } from 'buffer'
if (typeof window !== 'undefined' && !window.Buffer) {
  window.Buffer = Buffer
}

// process polyfill
import process from 'process'
if (typeof window !== 'undefined' && !window.process) {
  window.process = process
}

// 更多 polyfill 可按需引入，如 crypto、stream 等

```

## ✅ 2. 全局引入方式

在 app/layout.tsx 中顶部引入 polyfill：

```ts

import '@/lib/polyfills'
```

## ✅ 3. 安装依赖

确保安装以下包：

```sh
npm install buffer process

# 如需支持更多 polyfill（如 crypto）可安装：

npm install crypto-browserify stream-browserify
```

## ✅ 4. Webpack 配置（ESM 模式）

在 apps/web/next.config.mjs 中添加：

```js
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

const nextConfig = {
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: false,
      crypto: false,
      stream: false,
      // 添加更多polyfill
    }

    config.plugins.push(
      new NodePolyfillPlugin({
        excludeAliases: ['console']
      })
    )

    return config
  },
}

export default nextConfig
```

## 📌 注意事项

- 所有 polyfill 必须在客户端环境中运行（需判断 typeof window !== 'undefined'）。

- 推荐统一封装 polyfills.ts 文件，避免在多个组件重复导入。

- node-polyfill-webpack-plugin 仅做构建层 fallback，运行时仍需注入全局对象。
