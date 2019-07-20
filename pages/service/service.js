// pages/service/service.js 会务服务
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
 * 拨打电话
 */
  callPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  }
})