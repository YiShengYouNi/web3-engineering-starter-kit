import { ethers } from 'hardhat'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  const logo = process.env.INIT_LOGO_URI
  if (!logo) throw new Error('请配置 NEW_LOGO_URI')

  const contract = await ethers.getContractAt('Heng', '0x98Af4488A1B9E9415c5Cf5512e6F9f49488E33fa')
  const tx = await contract.setLogoURI(logo)
  await tx.wait()

  console.log('✅ 链上 logo 更新成功:', logo)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
