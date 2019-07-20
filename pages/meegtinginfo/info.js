// 引入配置文件config
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    meeting_name:'',
    meeting_time:'',
    meeting_location:'',
    apply_user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      meeting_name: util.meeting_name,
      meeting_time: util.meeting_time,
      meeting_location: util.meeting_location,
      apply_user: wx.getStorageSync('username')
    })
  },
 
 /**
  * 用户点击查看会议议程，获取一个formId
  */
  formapply: function (e) {
    console.log("用户点击了查看会议议程，获取一个formId");
    //这里获取表单的formId，方便后续发送模板消息
    let formId = e.detail.formId;
    let openId = wx.getStorageSync('openid');

    wx.request({
      url: util.host +'/wx/user/gatherformid',
      data:{
        formId: formId,
        openId: openId
      },
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success(res) {
        //调用成功，跳转会议日程安排页面
        wx.navigateTo({
          // url: '../main/main',
          url: '../guide/guide',
        })
      }
    })
  }


})