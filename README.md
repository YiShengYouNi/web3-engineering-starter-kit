
# 🧱 Web3 Engineering Starter Kit

本项目是一个面向多链 DApp 的现代化 Web3 前端工程模板，采用 Next.js App Router + Wagmi v2 + Viem v2 + TailwindCSS 技术栈构建，支持钱包连接、网络切换、合约封装、组件模块化、工程规范等核心功能。项目采用 monorepo 架构，便于拆分 UI 组件库、配置模块、合约工具包，适合中大型 Web3 应用开发与团队协作。

> 项目采用 monorepo 架构，适用于构建链上钱包交互、Token 操作、模块化组件库等功能齐全的 Web3 前端工程。

---

## 🚀 技术栈（Tech Stack）

- **React 19 + Next.js 15** (App Router)
- **Wagmi v2 + Viem v2**（钱包与合约交互）
- **Ethers.js v6**（兼容工具）
- **Tailwind CSS + shadcn/ui**（UI 组件与样式系统）
- **TypeScript + tsconfig.paths**
- **Monorepo 架构**（apps + packages）
- **Turborepo（可选）** 支持跨包依赖与构建优化

---

## 📁 项目结构（Project Structure）

```bash
.
├── apps/
│   └── web/                # DApp 前端主应用（Next.js）
├── packages/
│   └── config/             # 链配置、合约 ABI、地址、封装工具
│       ├── abi/            # 合约 ABI 类型
│       ├── contracts/      # 合约实例封装
│       ├── chains.ts       # 多链配置与工具函数
├── docs/                   # 技术调研与选型文档
├── public/                 # 静态资源
├── .gitignore
├── package.json
└── tsconfig.json
```

### 📦 子模块说明（Packages）

#### packages/config

- 所有链信息、合约地址与 ABI 统一在此维护

- 每个合约模块单独封装，如 contracts/heng.ts

- 提供标准化的 getContract(...) 工具函数

- 地址信息来自 chains.ts，确保所有多链数据来源统一

## 📚 技术文档（Docs）

- 🔧 [构建工具对比：Next.js vs Vite](./docs/build-tools-comparison.md)

📌 智能合约模块封装规范

🔗 多链配置模块说明（如需）

## 🧪 本地开发运行

```bash
# 安装依赖
pnpm install

# 进入前端主应用
cd apps/web

# 启动开发服务
pnpm dev
```

## 🌐 未来计划（Roadmap）

- [x] 多链连接与网络切换

- [ ] 合约封装与自动类型推导

- [ ] 钱包登录签名流程（EIP-191 / EIP-712）

- [ ] 合约钱包支持（EIP-1271 校验）

- [ ] 支持 ENS 名称与头像解析

- [ ] SSR 环境下 wallet 状态持久化

- [ ] 单元测试与组件测试集成（Vitest）

## 🤝 贡献与协作（Contributing）

欢迎提出 PR / Issues，一起打造更具工程价值的 Web3 前端项目结构。

## 🪪 License

MIT License © 2025 YiShengYouNi
