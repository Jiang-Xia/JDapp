// 动态加载tabsIcon图片
export const getImageFile = (url) => {
  // console.log(new URL(`../assets/${url}`, import.meta.url))
  return new URL(`../assets/${url}`, import.meta.url).href
}
export const getFileUrl = (url) => {
  // console.log(url,`../assets/tabsIcon/${url}`)
  console.log(url, import.meta.url)
  return new URL(`../assets/${url}`, import.meta.url).href
}
