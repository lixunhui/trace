// pages/set/set.js
// 引入配置文件config
const util = require("../../utils/util.js");
const { $Toast } = require('../../dist/base/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userset:'',
    dinner:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const openId = wx.getStorageSync('openid');
    const userName = wx.getStorageSync('username');
    console.log("openId = "+openId);
    console.log("userName = " + userName);
    wx.request({
      url: util.host +'/admin/userset',
      data:{
        openId:openId,
        userName:userName
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success(res){
        console.log("查询座位信息成功");
        if (res.data.code == 200) {
          that.setData({
            userset: res.data.data.applyUserSeat,
            dinner: res.data.data.applyUserDinner
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})