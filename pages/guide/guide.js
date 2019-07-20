// pages/guide/guide.js  指引页面
// 引入配置文件config
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formapply:function(e){
    console.log("点击按钮，提交formid");
    let formId = e.detail.formId;
    let openId = wx.getStorageSync('openid');
    // 根据绑定的type判断跳转的地址
    let type=e.detail.target.dataset.guide;
    
    let url="";
    if(type == 1){
      // 会议议程
      url="../agenda/agenda"
    }else if(type == 2){
      //会议指引
      url="../remind/remind"
    }else if(type ==3){
      //会议服务
      url="../service/service"
    } else if (type == 4) {
      //会议服务
      url = "../live/live"
    } else if (type == 5) {
      //会议服务
      url = "../game/game"
    }else if(type == 6){
      url = "../set/set"
    }
    wx.request({
      url: util.host + '/wx/user/gatherformid',
      data: {
        formId: formId,
        openId: openId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success(res) {
        //调用成功，跳转会议日程安排页面
        wx.navigateTo({
          url: url,
        })
      }
    })
  }
  
})