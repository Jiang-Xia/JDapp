import dayjs from 'dayjs'
console.log(dayjs(new Date()).format('YYYYMMDD'))
console.log(dayjs(new Date()).format('HHmmss'))
// 20240228->2024-02-28
export const formactDate = (str) => {
  if (!str) return
  return dayjs(str).format('YYYY-MM-DD')
}
export const formactTime = (str) => {
  if (!str) return
  return dayjs(str).format('YYYY-MM-DD hh:mm:ss')
}
// 获取中文当前日期
export const formactZhDate = () => {
  //  const date = dayjs()
  //  return `${date.year()}年 ${date.month()}月 ${date.day()}日`
  return dayjs().format('YYYY-MM-DD')
}

export const formactDateReverse = (date) => {
  if (!date) return
  return dayjs(date).format('YYYYMMDD')
}
export const formactTimeReverse = (date) => {
  if (!date) return
  return dayjs(date).format('HHmmss')
}
