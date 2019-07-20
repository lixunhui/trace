// 引入配置文件config
const util = require("../../utils/util.js");
const { $Toast } = require('../../dist/base/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    username:"",
    phone:"",
    company:""
  },


  usernameInput({ detail }){
    this.setData({
      username: detail.detail.value
    })
  },

  phoneInput({ detail }){
    this.setData({
      phone: detail.detail.value
    })
  },
  companyInput({ detail }){
    this.setData({
      company: detail.detail.value
    })
  },

  /**
   * 用户点击会议签到，提交表单
   */
  formapply:function(e){
    console.log("这里执行了表单formapply");

    var that = this;
    var username = that.data.username;
    var phone = that.data.phone;
    var company = that.data.company;
    var openid = wx.getStorageSync('openid');
    var unionid = wx.getStorageSync('unionid');

    console.log('form发生了submit事件，携带数据为', that.data.username, that.data.phone, that.data.company, openid,unionid);

    // 这里进行表单验证
    if (username === '') {
      $Toast({
        content: '请输入参会人姓名',
        icon:'emoji',
        duration: 1
      });
      return false;
    }else if (phone === '') {
      $Toast({
        content: '请输入参会人电话',
        icon: 'emoji',
        duration: 1
      });
      return false;
    }else if (!(/^1[34578]\d{9}$/.test(phone))) {
        $Toast({
          content: '手机号码填写错误',
          icon: 'emoji',
          duration: 1
        });
      return false;
    }else if (company === '') {
      $Toast({
        content: '请输入参会企业',
        icon: 'emoji',
        duration: 1
      });
      return false;
    };  

    //这里获取表单的formId，方便后续发送模板消息
    let formId=e.detail.formId;
    wx.setStorageSync('fId', formId);

    var userinfo = app.globalData.userInfo;
    console.log(userinfo);

    // 请求后台数据，上传报名签到信息
    wx.request({
      url: util.host + '/wx/user/sign',
      data: {
        username: that.data.username,
        phone: that.data.phone,
        company: that.data.company,
        openid: openid,
        unionid: unionid,
        nikename: userinfo.nickName,
        avatar: userinfo.avatarUrl,
        formId: formId,
        appid:util.appid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success(res) {
        console.log(res.data);
        //判断是否签到成功，成功则跳转
        if (res.data.code == 200) {
            wx.setStorageSync('username', that.data.username),
            wx.setStorageSync('phone', that.data.phone),
            wx.setStorageSync('company', that.data.company),
            wx.setStorageSync('avatar', userinfo.avatarUrl),
            wx.setStorageSync('sign', '1'),
            wx.reLaunch({
              url: '../meegtinginfo/info',
            })
        }

      }
    })
  }
})