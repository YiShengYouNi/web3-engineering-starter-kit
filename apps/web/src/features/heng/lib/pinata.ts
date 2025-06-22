import axios from 'axios'

const API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || ''
const SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_API_SECRET || ''

export async function uploadToPinata(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
    maxBodyLength: Infinity,
    headers: {
      'Content-Type': 'multipart/form-data',
      pinata_api_key: API_KEY,
      pinata_secret_api_key: SECRET_KEY,
    },
  })

  const cid = res.data.IpfsHash
  return `https://ipfs.io/ipfs/${cid}`
}
