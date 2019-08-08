// 引入配置文件config
const util = require("../../utils/util.js");
const { $Toast } = require('../../dist/base/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    phone:"",
    code:"",
    send: true,
    alreadySend: false,
    second: 60,
    disabled: true,
    senddisable:true,
    buttonType: 'default',
    buttonclass:'disablebutton'
  },

  /**
   * 手机号码输入框，当输入长度大于11时，出现发送短信验证码的按钮
   */
  phoneInput({ detail }){
    let phone = detail.detail.value;
    if (phone.length === 11){
      console.log("手机号码："+phone);
      this.showSendMsg();
      this.activeButton();
      this.setData({
        phone:phone
      });
    }else{
      this.hideSendMsg()
    };
  },

/**
 * 短信验证码输入框
 */
  smsCodeInput({detail}){
    this.setData({
        code: detail.detail.value
      })
    this.activeButton();
  },

  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true,
        senddisable: false
      })
    }
  },

  hideSendMsg: function () {
    this.setData({
      send: true,
      disabled: true,
      senddisable:true
    })
  },


  // 按钮
  activeButton: function () {
    var that = this;
    var code = that.data.code;
    var phone = that.data.phone;
    if (phone && code) {
      if(code.length==6){
        this.setData({
          disabled: false,
          buttonType: 'primary',
          buttonclass: 'button'
        })
      }else{
        this.setData({
          disabled: true,
          buttonType: 'default',
          buttonclass: 'disablebutton'
        })
      }
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default',
        buttonclass: 'disablebutton'
      })
    }},


  // 发送短信验证码
  sendSMSCode:function(e){
    var that = this;
    var phone = that.data.phone;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      $Toast({
        content: '手机号码填写错误',
        icon: 'emoji',
        duration: 1
      });
      return false;
    }
    console.log("点击发送短信验证码按钮，调用后台接口，发送短信");
    wx.request({
      url: util.host+'/wx/login/sendSms',
      data:{
        phone: that.data.phone,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success:function(res){ 
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },


  /**
   * 用户点击会议签到，提交表单
   */
  formapply:function(e){
    console.log("这里执行了表单formapply");

    var that = this;
    var phone = that.data.phone;
    var code = that.data.code;
    var openid = wx.getStorageSync('openid');
    var unionid = wx.getStorageSync('unionid');

    console.log('form发生了submit事件，携带数据为', that.data.username, that.data.code, openid,unionid);

    //这里获取表单的formId，方便后续发送模板消息
    let formId=e.detail.formId;
    wx.setStorageSync('formId', formId);

    var userinfo = app.globalData.userInfo;
    console.log(userinfo);

    // 请求后台数据，上传报名签到信息
    wx.request({
      url: util.host + '/wx/login/verify',
      data: {
        phone: that.data.phone,
        code: that.data.code,
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
        console.log("请求返回结果："+res.data);
        //判断是否签到成功，成功则跳转
        if (res.data.code == 200) {
          wx.setStorageSync('username', res.data.data.userName),
            wx.setStorageSync('userId', res.data.data.userId),
          wx.setStorageSync('phone', that.data.phone),
          wx.setStorageSync('avatar', userinfo.avatarUrl),
          wx.setStorageSync('sign', '1'),
            //缓存用户信息，用户Type,用户ID
            wx.setStorageSync('userType', res.data.data.userType)
            wx.reLaunch({
              url: '../main/main',
            })
        }else if(res.data.code == 39){
          console.log("验证码错误，请重新获取");
          $Toast({
            content: '验证码错误，请重新获取',
            icon: 'emoji',
            duration: 1
          });

        }else if(res.data.code == 40){
          console.log("验证码已过期，请重新获取");
          $Toast({
            content: '验证码已过期，请重新获取',
            icon: 'emoji',
            duration: 1
          });
        }else if(res.data.code == 41){
          console.log("验证码已使用，请重新获取");
          $Toast({
            content: '验证码已使用，请重新获取',
            icon: 'emoji',
            duration: 1
          });
        }else if(res.data.code == 42){
          console.log("用户不存在，请检查登陆手机号码是否正确");
          $Toast({
            content: '用户不存在，请检查登陆手机号码是否正确',
            icon: 'emoji',
            duration: 1
          });
        }
      },
      error(res){
        console.log("请求失败，请稍后重试");
        $Toast({
          content: '网络连接失败，请稍后重试',
          icon: 'emoji',
          duration: 1
        });
      }
    })
  }
});