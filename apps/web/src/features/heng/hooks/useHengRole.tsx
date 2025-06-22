import { useEffect, useState } from 'react'
import { useHengContract } from './useHengContract'


export function useHengRole(address?: `0x${string}`) {
  const { readContract } = useHengContract();

  const [isMinter, setIsMinter] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  // console.log('🚀 useHengRole:', 'address:', address, 'readContract: ', readContract)
  useEffect(() => {
    if (!address || !readContract) return

    const checkRoles = async () => {
      try {
        const isMinterResult = await readContract?.read.minters([address])
        const ownerAddress = await readContract.read.owner()
        // console.log('🚀 权限检查结果:', { isMinterResult, ownerAddress })
        setIsMinter(!!isMinterResult)
        setIsOwner(ownerAddress.toLowerCase() === address.toLowerCase())
      } catch (err) {
        console.warn('⚠️ 权限检查失败:', err)
      }
    }
    checkRoles()
  }, [address, readContract])

  // console.log('🚀 useHengRole:', { isMinter, isOwner })
  return { 
    isMinter, 
    isOwner,
   }
}
