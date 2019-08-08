// // 引入配置文件config
const util = require("./utils/util.js");

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(util)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("APP.js 登陆Code = " + res.code);
        //调用后台服务，实现登陆获取用户信息，服务器后台调用 code2Session，使用 code 换取 openid 和 session_key 等信息
        wx.request({
          url: util.host + '/wx/user/login',//后台服务URL
          data: {
            code: res.code,
            appid: util.appid
          },
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            wx.setStorageSync("openid", res.data.openid);
            wx.setStorageSync("unionid", res.data.unionid);
            wx.setStorageSync("sessionKey", res.data.sessionKey);
            console.log("登陆成功，获取用户信息", res.data.openid);
            //登陆成功，判断用户之前是否签到过
            const sign = wx.getStorageSync('sign');
            //先判断用户是否签到过，如果签到过直接跳转到成功页面，如果没签到过，跳转到登陆页面
            if (sign == '1') {
              console.log("用户已登录");
              wx.navigateTo({
                url: '../main/main',
              })
            }
            console.log("还没有登录，在这里点击登录吧");
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("页面刚加载的时候，获取用户信息code");
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})