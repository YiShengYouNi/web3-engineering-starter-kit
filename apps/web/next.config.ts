import type { NextConfig } from "next";

import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'ipfs.io',
      'gateway.pinata.cloud',
      'nftstorage.link',
      'cloudflare-ipfs.com',
    ], // ✅ 加入你需要的 IPFS 网关
  },
  webpack: (config) => {
    // 添加 Node.js polyfills
    config.plugins.push(new NodePolyfillPlugin({
      excludeAliases: ['console']
    }));

    // 确保使用正确的 polyfill
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // 禁用 fs 模块 
      buffer: false,
      crypto: false,
      stream: false,
    }

    return config;
  }
};

export default nextConfig;
