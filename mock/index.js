// import * as crypto from '../src/utils/crypto'
const normal = [
  {
    title:'申报列表',
    url: '/mobile/apply/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
            id: '1', //主键id
            carNo: '112121', //车架号
            createTime: '2024-8-13', //申请时间
            name: '酱', //姓名
            idCardNo: '450703199903313333', //身份证号
            amount: '100000', //发票金额
            bankCardNo: '450703199903313333', //银行卡号
            bankNo: '9556', //行号
            bankName: '江夏银行', //行名
            status: '100' //当前状态
          },
          {
            id: '2', //主键id
            carNo: '112121', //车架号
            createTime: '2024-08-13', //申请时间
            name: '酱', //姓名
            idCardNo: '450703199903313333', //身份证号
            amount: '100000', //发票金额
            bankCardNo: '450703199903313333', //银行卡号
            bankNo: '9556', //行号
            bankName: '江夏银行', //行名
            status: '100' //当前状态
          }
        ]
      }
    }
  },
  {
    title:'申报文件列表',
    url: '/mobile/apply/file/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          {
              fileType: '101',
              fileAddr: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          },
          {
              fileType: '102',
              fileAddr: 'https://jiang-xia.top/x-api/blog-server/static/uploads/2022-08-10/2h8itotl2bcx6dkiausbas-pm2.png',
          },
          {
              fileType: '201',
              fileAddr: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          },
          {
              fileType: '202',
              fileAddr: 'https://jiang-xia.top/x-api/blog-server/static/uploads/2022-08-10/2h8itotl2bcx6dkiausbas-pm2.png',
          },
          {
              fileType: '301',
              fileAddr: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          },
          {
              fileType: '302',
              fileAddr: 'https://jiang-xia.top/x-api/blog-server/static/uploads/2022-08-10/2h8itotl2bcx6dkiausbas-pm2.png',
          },
          {
              fileType: '303',
              fileAddr: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          },
          {
            fileType: '401',
            fileAddr: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          },
          {
              fileType: '501',
              fileAddr: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          },
          {
              fileType: '502',
              fileAddr: 'https://jiang-xia.top/x-api/blog-server/static/uploads/2022-08-10/2h8itotl2bcx6dkiausbas-pm2.png',
          },
          {
              fileType: '601',
              fileAddr: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
          },
        ]
      }
    }
  },
  {
    title:'登录',
    url: '/mobile/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          accessToken:'11111111',
          refreshToken: '22222222'
        }
      }
      // return {
      //   key: crypto.sm2Encrypt(crypto.SM4KEY),
      //   content:crypto.sm4Encrypt({
      //     code: 200,
      //     message: 'success',
      //     data: {
      //       accessToken:'11111111',
      //       refreshToken: '22222222'
      //     }
      //   }),
      // }
    }
  },
  {
    title:'刷新token',
    url: '/mobile/refreshToken',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          accessToken:'33333333',
          refreshToken: '44444444'
        }
      }
    }
  },
  {
    title:'额度',
    url: '/mobile/schedule/query',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          totalAmount:'50000',
          alreadyAmount: '20000'
        }
      }
    }
  },
  {
    title:'上传图片',
    url: '/mobile/file/upload',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: 'https://jiang-xia.top/x-blog/api/v1/static/uploads/2023-12/ga0hqzh5lek2ntyxtzecjr-web.webp'
      }
    }
  },

  {
    title:'行名行号',
    url: '/mobile/getBankInfo',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          bankNo: '622404001112223339',
          bankName: '广州分行'
        }
      }
    }
  },
]

const uploadFile = [
  {
    title:'行驶证照',
    url: '/mobile/save/110',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: '111'
        }
      }
    }
  },
  {
    title:'身份证',
    url: '/mobile/save/120',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: '111'
        }
      }
    }
  },
  {
    title:'交款凭证',
    url: '/mobile/save/130',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: '111'
        }
      }
    }
  },
  {
    title:'上传发票',
    url: '/mobile/save/140',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: '111'
        }
      }
    }
  },
  {
    title:'汽车登记证书',
    url: '/mobile/save/150',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: '111'
        }
      }
    }
  },
  {
    title:'银行卡照',
    url: '/mobile/save/160',
    method: 'post',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: '111'
        }
      }
    }
  },
  
]

export default [
  ...normal,
  ...uploadFile
]
