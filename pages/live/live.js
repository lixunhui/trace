
const util = require("../../utils/util.js");
const app = getApp();
const { $Toast } = require('../../dist/base/index');
let col1H = 0;
let col2H = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**图片直播 */
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    page: 1,
    images: [],
    col1: [],
    col2: [],
    previewImages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;
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
      data: {
        page: that.data.page,
        limit: 15
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //默认值
      },
      success: function (res) {
        if (res.data.code == "3") {
          let imgs = res.data.data;
          let baseId = "img-" + (+new Date());
          for (let i = 0; i < imgs.length; i++) {
            imgs[i].id = baseId + "-" + i;
          }
          that.setData({
            loadingCount: imgs.length,
            images: imgs,
            page: that.data.page + 1
          });
        }
      }
    })
  },

  /**
   * 图片预览
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.previewImages // 需要预览的图片http链接列表  
    })
  }
})