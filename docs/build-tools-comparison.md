# 🔧 构建工具选型对比：Next.js vs Vite

---

## 1. 背景与目标

在构建现代 Web3 前端工程时，主流工具链选择通常聚焦于：

- **Next.js**（基于 React、支持 SSR/SSG、全栈渲染）
- **Vite** + **Vitest** + **Rollup**（极致构建速度、细粒度控制、适合组件库）

本项目定位为**多链 DApp 前端门户**，核心关注点在于：

- 钱包连接、链切换、合约交互等复杂交互逻辑
- SSR 支持与 SEO 优化
- UI 组件组织与模块架构
- 工程规范与团队协作基础

---

## 2. Next.js 架构优势分析

| 能力维度          | 描述 |
|-------------------|------|
| ✅ App Router      | 基于文件系统的渐进式架构，支持 layout、loading、error 等局部化处理 |
| ✅ SSR / SSG / ISR | 支持服务端渲染、静态生成、增量更新，适合 SEO 和链上数据同步 |
| ✅ Image / Font 优化 | 内置处理静态资源，便于团队快速构建 |
| ✅ Route Segment Cache | 新版 Next.js 15 支持局部页面缓存，优化区块链动态页加载 |
| ✅ 多环境支持       | 与 Vercel 紧密集成，便于 staging/production 自动部署 |
| ✅ React 官方主导   | 与 React 新特性同步快，适配 `use`、`useTransition` 等 App Router 特性 |

---

## 3. Vite 架构优势分析

| 能力维度         | 描述 |
|------------------|------|
| ⚡ 启动快         | 使用原生 ESModule 与开发服务器，冷启动极快（毫秒级） |
| 🔍 构建可控       | 可自定义插件系统、Rollup 输出、打包细节 |
| 💡 更适合组件库   | 如构建 `packages/ui` 等设计系统子包，开发体验极佳 |
| 🧪 集成 Vitest    | 自带测试支持，适合做单元测试、hooks 测试等 |
| 📦 工具链轻量     | 没有复杂约定，更贴合前端架构设计自由度 |

---

## 4. 适用场景对比分析

| 使用场景         | 推荐工具    | 说明 |
|------------------|-------------|------|
| DApp 前端门户    | ✅ Next.js   | 页面路由管理、SEO 支持、API 路由内置 |
| UI 组件库        | ✅ Vite      | 快速热更新、Rollup 构建、Tree-shaking 优化 |
| 全栈渲染与部署   | ✅ Next.js   | 支持 SSR + API，部署至 Vercel |
| 多包工程管理      | 🚫 均非强项  | 推荐搭配 Turborepo 等构建器 |
| 本地测试 / 快速开发 | ✅ Vite      | 更轻量更灵活，适合开发阶段使用 |

---

## 5. 本项目选型理由：Next.js

本项目选择 **Next.js（App Router 模式）** 作为主工程框架，原因如下：

- ✅ Web3 前端门户类型应用，需支持动态地址/合约展示、钱包连接状态、SEO 与路由管理
- ✅ 使用 React 19，兼容新语法（如 `use`）与 Suspense，天然适配 Next.js App Router
- ✅ 页面级模块解耦清晰，适合构建链上信息的多页面结构
- ✅ 配合 `wagmi`、`viem` 使用时，SSR 可避免 hydration 报错与初始 client-side 不一致
- ✅ 未来可无缝接入 Server Actions、Edge Functions，适合构建链上+链下融合型全栈 DApp

---

## 6. 未来扩展建议

- 可将 UI 组件抽离为独立包 `packages/ui`，使用 Vite 构建并发布 npm / 本地模块
- 使用 Turborepo 管理多包依赖，提升构建缓存、并行执行能力
- 若合约调用逻辑分散，可建立 `packages/contract-sdk` 并配合 Vite 单元测试进行集成验证
- 若未来集成 Edge 计算 / IPFS 内容渲染，可探索 Next.js 的 `middleware.ts` 与 `on-demand ISR`

---

🧩 本对比文档服务于前端架构师 / Web3 工程负责人决策，也适合作为开源仓库的 `docs/build-tools-comparison.md` 说明文档。
