import { defineStore } from 'pinia'
export const useWriteInfoStore = defineStore('writeInfo', {
  state: () => ({
    writeInfo: {
      carNo: '', //车架号
      createTime: '', //申请时间
      name: '', //姓名
      idCardNo: '', //身份证号
      amount: '', //发票金额
      bankCardNo: '', //银行卡号
      bankNo: '', //行号
      bankName: '', //行名
      bankWebsiteName: '', // 网点名称
      status: '', //当前状态
      fileList: [] // 文件列表
    }
  }),
  getters: {
    formatWriteInfo() {
      return this.writeInfo
    },
    // 获取对应文件
    getFileAddrByFileType: (state) => {
      return (fileType) =>
        state.writeInfo.fileList
          .filter((fileItem) => fileItem.fileType === fileType)
          .map((v) => ({ url: v.fileAddr }))
    }
  },
  actions: {
    setWriteInfo(data) {
      this.writeInfo = data
      // console.log('writeInfo======>!', this.writeInfo)
    }
  }
})
