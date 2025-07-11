
# 30 道工程化面试题目

1.如何设计支持多链的DApp脚手架(技术选型+目录结构规范)?
2.对比 Webpack/Vite/Rollup，在Web3项目中的构建性能差异
3.为什么Web3项目需要单独配置~多polyfill? 列举必须的垫片模块
4.设计一个自动化生成合约类型的工程方案
5.如何实现环境变量区分测试网/主网配置(含私钥安全方案)?
6.如何实现前端与实体合约的单项项目管理?
7.设计一个合约变更自动触发前端ABI更新的工作流
8.如何在CI中验证前端调用合约的兼容性?
9.前端如何自动化测试与模拟合约交互(如硬帽+以太网)?
10.解释”类型链"工具链在工程化中的作用
11.如何通过摇晃树优化`web3.js`的打包体积?
12.设计DLL预编译方案加速Web3依赖库的构建
13.为什么推荐使用ES模块(Modules)格式发布Web3组件库?
14.优化SVG钱包图标集的打包策略(雪碧图/动态导入)
15.如何用代码分割实现多链SDK的按需加载?
16.Web3项目的ESLint特殊配置规则(如检测`window.ethereum'安全调用)
17.如何用哈士奇(Husky)拦截包含私钥的误提交(预提交钩子规则)?
18.设计合约ABI的架构校验流程(如佐德校验)
19.前端如何集成滑动(Slither)静态分析结果到ci流程?
20.自动化检测RPC请求过载的监控方案
21.设计 IPFS 无损部署方案(内容哈希持久化)
22.如何实现DApp的零停机更新(版本化路由+缓存清除)?
23.自动化回滚方案:当合约升级导致前端不兼容时如何处理?
24.使用Docker(Docker)优化团队开发环境一致性(含硬帽(Hardhat)节点配置)
25.设计多环境部署策略(测试网/主网/本地链)
26.实现SSR框架下钱包连接的水合(Hydration)安全方案
27.如何用涡轮优化大型网络的构建速度?
28.设计Web3组件库的沙箱预览环境(含链交互模拟)
29.自动化生成合约交互文档的工具链设计(TypeDoc+自定义插件)
30.实现DApp的渐进式Web3化(传统前端逐步迁移方案)

## 工程实践

根据上面的题目，设计一个完整的Web3项目工程化方案，分为多个阶段，每个阶段包含具体的实现要点和对应的题目。

### 📦 阶段一：项目初始化与工程架构设计

> 重点：技术选型、目录结构、工程规范打底

- 技术选型（题目1, 2, 3, 10）：

  - Next.js + Wagmi + Viem + Tailwind + Ethers.js v6
  - 使用 Vite 构建组件库，Next.js 做主工程
  - 支持多链配置（Ethereum + Optimism + Polygon）
  - 类型链工具链（TypeScript + ABI 类型生成）

- 实现要点：
  - 目录结构模块化（如 features/wallet、contracts/types、config/chains.ts）
  - Alias 与 polyfill 配置（题目3）
  - 构建工具比较报告（题目2）

### 🔗 阶段二：钱包交互与链上行为模块化

> 重点：类型生成、合约版本控制、与前端绑定

- 工具链搭建（题目4, 6, 7, 8, 18, 29）：
  - Hardhat 编译合约
  - typechain + custom plugin 自动生成合约调用类型
  - 合约 ABI 更新时自动触发前端 ABI 拉取（watch 合约编译输出）
  - 使用 Zod 校验 ABI schema（题目18）

- 集成 CI 校验：
  - 前端运行合约调用兼容性测试（题目8）
  - 生成合约交互文档（题目29）

| 模块           | 目标内容                                          |
| ------------ | --------------------------------------------- |
| 👜 钱包管理      | 状态管理、自动连接、连接器封装、UI 控制、事件监听                    |
| 🔐 登录机制      | 支持 EIP-191 / EIP-712 签名，统一签名登录流程              |
| 🧾 合约调用封装    | 读取/写入合约函数、自动传入 client、错误处理规范化                 |
| 🔄 链切换机制     | 监听网络变化、主动切换网络、未支持链处理方案                        |
| 📦 hooks 模块化 | 统一封装 `useAccountInfo`、`useIsContractWallet` 等 |
| 🧠 UX 交互反馈   | 使用 `sonner` 封装统一 toast，增强体验一致性                |

### 🌍 阶段三：多链支持与按需加载优化

> 重点：支持多链环境 + 按需引入 SDK + 构建性能优化

- 多链切换架构（题目1, 5, 15, 25）：

  - config/chains.ts + wagmiConfig 动态切换网络

  - 环境变量区分测试网与主网（题目5）

- 优化体积与构建速度（题目11, 12, 13, 14, 27）：

  - Web3.js Tree Shaking（题目11）

  - ESM 发布组件库（题目13）

  - 多链 SDK 代码分割（题目15）

  - 使用 TurboRepo / Turbopack 加速（题目27）

### 🧪 阶段四：测试与 CI/CD 自动化

> 重点：合约调用测试、预提交钩子、CI 集成

- 测试工具链（题目9, 16, 17, 19）：

  - Hardhat + viem/ethers.js 模拟合约交互

  - ESLint 安全规则（如 window.ethereum 检查）

  - Husky + lint-staged 防止私钥误提交

  - 集成 Slither 分析结果入 CI（题目19）

### 🚀 阶段五：部署上线与版本演进

> 重点：IPFS 部署、版本回滚、零停机方案

- 部署与版本控制（题目21, 22, 23, 24, 30）：
  - IPFS 内容哈希部署（题目21）
  - 使用 Cloudflare/IPFS 实现 PWA 缓存清除
  - 支持前端版本回滚（题目23）
  - Docker 化本地开发环境，统一 Hardhat 配置（题目24）
  - 渐进式 Web3 化结构示例（题目30）

### 产出物

- ✅ [x] 完整开源仓库：GitHub + GitHub Pages 演示

- 📖 系统文档：docs/ 内含工程化文档 + 工具链讲解

- 🎥 教学视频（可选）：配合每阶段录制讲解视频

- 🧪 单元测试 & CI 工作流完整覆盖
