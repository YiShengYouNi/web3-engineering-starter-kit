
import { ethers } from "hardhat"
import * as dotenv from "dotenv"
dotenv.config()

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying with account:", deployer.address)

  const logo = process.env.INIT_LOGO_URI || "https://ipfs.io/ipfs/<your_logo_hash>"

  const Token = await ethers.getContractFactory("Heng")
  const token = await Token.deploy(logo, deployer.address) // 👈 加入 owner 参数

  await token.waitForDeployment()

  console.log("Heng Token deployed to:", await token.getAddress())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
