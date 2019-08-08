// pages/main/main.js
const util = require("../../utils/util.js");
const app = getApp();
Page({
  data: {
    titleBarOptions: {
      title: 'options设置的标题',
      center: false,
      icon: 'icon-back'
    },
    tabBarOptions: {
      active: 0,
      normalClass: 'text-gray',//正常状态样式
      activeClass: 'text-green bg-blue',//激活后样式
      list: [
        {
          icon: 'icon-home',
          page: 'home',
          text: '首页'
        }, {
          icon: 'icon-similar',
          page: 'cart',
          text: '追溯批次'
        },
        {
          icon: 'icon-add',
          page: 'home',
          text: '发布',
          action: true,
          actionClass: 'bg-green'
        },
        {
          icon: 'icon-upstage',
          page: 'like',
          text: '品牌表现'
        },
        {
          icon: 'icon-people',
          page: 'user',
          text: '我的'
        },
      ],

    }
  },
  onLoad: function () {
  }
})
