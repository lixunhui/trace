// 引入配置文件config
const util = require("../../utils/util.js");
const { $Toast } = require('../../dist/base/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: util.host + '/meet/list',
      method: 'GET',
      data: {
        openId: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success: function (res) {
        that.setData({
          item: res.data
        })
      }
    })
  },

  formapply: function (e) {
    // 这里在报错  https://blog.csdn.net/LuuvyJune/article/details/88170874

    var index = e.currentTarget.dataset.id;
    if (this.data.item[index].state == false) {
      this.data.item[index].state = true
    }
    var that = this;
    this.setData({
      item: that.data.item
    })
    //这里获取表单的formId，方便后续发送模板消息
    let flowId = e.detail.value.itemId;
    let formId = e.detail.formId;
    console.log("点击订阅" + flowId);
    let openId = wx.getStorageSync('openid');
    wx.request({
      url: util.host + '/meet/subscibe',
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      data: {
        flowId: flowId,
        formId: formId,
        openId: openId
      },
      success: function (res) {
        if (res.data.code == 200) {
          $Toast({
            content: '订阅成功',
            type: 'success'
          });

        }
      }
    })
  }
})