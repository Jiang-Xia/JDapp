import { sm2, sm4 } from 'sm-crypto'

// let keypair = sm2.generateKeyPairHex()
// const publicKey = keypair.publicKey // 公钥
// const privateKey = keypair.privateKey // 私钥
const front_pri = '3c993ccde0497a325859a4f3d16b2810b95ad68833225d5880d65ccd81c63e33'
const front_pub =
  '0400552967bcbcb7a57b4e36633217ad8591856c4e37b82c6cdf77178b00aecb8e9aa88f0755868c086a656a7e6e121354f8ca61247c1f44a116bafed4a25f831d'

const publicKey = front_pub // 公钥
const privateKey = front_pri // 私钥
const cipherMode = 1
console.log('公私钥====>', { publicKey, privateKey })
// sm2加密
export const sm2Encrypt = (data) => {
  if (data instanceof Object || data instanceof Array) {
    data = JSON.stringify(data)
  }
  // console.log('sm2Encrypt encryptData =====>',encryptData)
  let encryptData = sm2.doEncrypt(data, publicKey, cipherMode)
  return encryptData
}
// sm2解密
export const sm2Decrypt = (encryptData) => {
  // console.log('sm2Decrypt encryptData =====>',encryptData)
  let decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode)
  try {
    if (typeof decryptData === 'string') {
      decryptData = JSON.parse(decryptData)
    }
  } catch (error) {
    console.error(error)
  }
  // console.log('sm2Decrypt decryptData =====>',decryptData)
  return decryptData
}
// console.log('sm2Encrypt====>', sm2Encrypt('0123456789abcdeffedcba9876543210'))
// console.log('sm2Decrypt====>', sm2Decrypt(sm2Encrypt('0123456789abcdeffedcba9876543210')))

export const SM4KEY = '0123456789abcdeffedcba9876543210'
// sm4加密
export const sm4Encrypt = (data) => {
  if (data instanceof Object || data instanceof Array) {
    data = JSON.stringify(data)
  }
  let encryptData = sm4.encrypt(data, SM4KEY)
  return encryptData
}
// sm4解密
export const sm4Decrypt = (encryptData, key) => {
  const sm4Key = sm2Decrypt(key)
  // console.log('sm4Key =====>',sm4Key)
  let decryptData = sm4.decrypt(encryptData, sm4Key)
  if (typeof decryptData === 'string') {
    decryptData = JSON.parse(decryptData)
  }
  return decryptData
}
