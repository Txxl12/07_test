//时间戳转时间
export const toData = (timestamp) => {
  if(!timestamp) {
    return
  }
  let date = new Date((Number(timestamp) + 8 * 3600)  * 1000); // 增加8小时
  return date.toJSON().substr(0, 19).replace('T', ' ')
}
