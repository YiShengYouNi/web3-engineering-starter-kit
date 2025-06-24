// server/auth-server.ts
// 本地模拟后端，进行签名验证和 token 生成
// 注意：实际应用中请使用真实的后端服务和安全的 token 生成
import express from 'express'
import cors from 'cors'
import { ethers } from 'ethers'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 4000

app.post('/api/login', async (req, res) => {
  const { address, message, signature } = req.body

  if (!address || !message || !signature) {
    return res.status(400).json({ error: '缺少参数' })
  }

  try {
    const recovered = ethers.verifyMessage(message, signature)
    const match = recovered.toLowerCase() === address.toLowerCase()

    if (!match) {
      return res.status(401).json({ error: '签名无效' })
    }

    // 模拟生成 token
    const token = `mock-token-for-${address.slice(0, 6)}...`
    return res.json({ token })
  } catch (e) {
    return res.status(500).json({ error: '服务器内部错误', details: e })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Mock Auth Server 运行中：http://localhost:${PORT}`)
})