// component/TitleBar/TitleBar.js
const BaseComponent = require("../BaseComponent.js")

Component({
  behaviors: [BaseComponent],
  options: {
    addGlobalClass: true,
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    center:Boolean,
    icon:{
      type:String,
      value:'icon-back'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  pageLifetimes:{
    show(e){
      // console.log(`调试:组件所在Page的生命周期`, e)
    }
  },
  created(){
   
    

  },
  /**
   * 组件的方法列表
   */
  methods: {

  },
  observers: {
      options:function(newOptions,b){
        // console.log(`调试:监听器aa`, newOptions,this)
        this.setData({
          ...newOptions
        })  
      }
  }
})
