export const getAssetsFile = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

export const getBase64Image = (src) => {
  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', src, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status == 200) {
        let blob = this.response
        let oFileReader = new FileReader()
        oFileReader.onloadend = function (e) {
          const base64 = e.target.result
          resolve(base64)
        }
        oFileReader.readAsDataURL(blob)
      }
    }
    xhr.send()
  })
}
export const blobToArrayBuffer = (blob) => {
  const reader = new FileReader()
  reader.readAsArrayBuffer(blob)
  reader.onload = () => {
    return reader.result
  }
}
