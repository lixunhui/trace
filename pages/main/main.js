// pages/main/main.js
const util = require("../../utils/util.js");
const app = getApp();
const { $Toast } = require('../../dist/base/index');
let col1H=0;
let col2H=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: '',
    disabled: false,
    current: 'homepage',
    homepage: true,
    group: false,
    remind:false,
    mine:false,
    /**图片直播 */
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    page:1,
    images: [],
    col1: [],
    col2: [],
    previewImages:[]
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
    }),
    /**图片直播 */
  wx.getSystemInfo({
        success: (res) => {
          let ww = res.windowWidth;
          let wh = res.windowHeight;
          let imgWidth = ww * 0.48;
          let scrollH = wh;

          this.setData({
            scrollH: scrollH,
            imgWidth: imgWidth
          });
          //加载首组图片
          this.loadImages();
        }
      })
  },


  /**
   * 图片直播
   */
  onImageLoad:function(e){
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale =imgWidth/oImgW;  
    let imgHeight = oImgH * scale;      //自适应高度
    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }
    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;
    let previewImages = this.data.previewImages;

    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
      previewImages.push(imageObj.url);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
      previewImages.push(imageObj.url);
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }
    this.setData(data);
  },
  
  loadImages: function () {
    var that = this;
    console.log("加载图片");
    //这里异步获取
    wx.request({
      url: util.host + '/meet/live',
      data:{
        page: that.data.page,
        limit: 15
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success:function(res){
        if(res.data.code == "3"){
          let imgs = res.data.data;
          let baseId = "img-" + (+new Date());
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].id = baseId + "-" + i;
          }
          that.setData({
            loadingCount: imgs.length,
            images: imgs,
            page: that.data.page+1
          });
        }
      }
    })
  },

/**
 * 图片预览
 */
  previewImage:function(e){
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.previewImages // 需要预览的图片http链接列表  
    })
  },

  /**
   * 菜单
   */
  handleChange({ detail }) {
    console.log("跳转的页面为："+detail.key);
    var current_page = detail.key;
    this.setData({  
      current: detail.key
    });
    if (current_page == 'homepage') {
      this.setData({
        homepage: true,
        group: false,
        remind: false,
        mine: false
      }),
      wx.setNavigationBarTitle({
        title: '会议议程'
      })
    } else if (current_page == 'group') {
      this.setData({
        homepage: false,
        group: true,
        remind: false,
        mine: false
      }),
      wx.setNavigationBarTitle({
        title: '照片直播'
      })
    } else if (current_page == 'remind') {
      this.setData({
        homepage: false,
        group: false,
        remind: true,
        mine: false
      }),
      wx.setNavigationBarTitle({
        title: '会场指引'
      })
    } else if (current_page == 'mine') {
      this.setData({
        homepage: false,
        group: false,
        remind: false,
        mine: true
      }),
      wx.setNavigationBarTitle({
        title: '会务服务'
      })
    }
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
  },

  /**
   * 拨打电话
   */
  callPhone:function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})