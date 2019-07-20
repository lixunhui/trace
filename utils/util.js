const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 自定义域名
 const host = 'https://wechat.eggworld.cn';

// const host = 'http://127.0.0.1';
const appid ='wxdc9c6541158adc89';
const meeting_name='第四届中国安全蛋品产业生态大会';
const meeting_time='2019-05-04 ~ 2019-05-05';
const meeting_location ='北京·黄河京都会议中心';

module.exports = {
  formatTime: formatTime,
  host:host,
  appid:appid,
  meeting_name: meeting_name,
  meeting_time: meeting_time,
  meeting_location: meeting_location
}
