//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: '第4届蛋品大会',
    userInfo: {},
    hasUserInfo: false,
    sign: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../login/login'
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log("生命周期函数--监听页面加载");
   if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
 * 生命周期函数--监听页面初次渲染完成
 */
  onReady: function () {
    console.log("index.js生命周期函数--监听页面初次渲染完成");
    const sign = wx.getStorageSync("sign");
    console.log("index.js 系统初始化，判断是否签到", sign);
    if ("1" == sign) {
      wx.reLaunch({
        url: '../meegtinginfo/info'
      })
    }
  },
  getUserInfo: function(e) {
    console.log("index.js 点击会议报到，登陆获取用户信息"),
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }),
    console.log("index.js 获取用户信息成功，跳转登陆页面"),
    wx.navigateTo({
        url: '../login/login'
      })
  }
})
