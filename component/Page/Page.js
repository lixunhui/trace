// component/Tabbar/Tabbar.js
const BaseComponent = require("../BaseComponent.js")
const PageContorl = require("../PageControl.js")
console.log(`调试:打印`, BaseComponent)
Component({
  // 引入拓展
  behaviors: [BaseComponent, PageContorl],
  options: {
    addGlobalClass: true,
    multipleSlots: true // 在组件定义时的选项中启用多slot支
  },
  created() {
    // console.log(`调试:组件创建成功`, this)
  
    // this.setData({
    //   activePage: this.properties.tabBarOptions.list[this.properties.tabBarOptions.active]
    // })
  },


  /**
   * 组件的属性列表
   */
  properties: {
    customTitleBar:{
      type:Boolean,
      value:false,
    },
    customTabbar:{
      type:Boolean,
      value:false
    },
    titleBarOptions:Object,
    tabBarOptions:{
      type:Object,
      observer(newValue,b){
        // console.log(`调试:observer触发`, newValue,b)
        this.setData({
          activePage: newValue.list[newValue.active]['page']
        })
      }
    }

  },


  /**
   * 组件的初始数据
   */
  data: {
    activePage:'',
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabChange(e,o){
      const context = e.detail
      this.setData({
        activePage:context.page,
       'titleBarOptions.title':context.text
      })
      // console.log(`调试:设置完后的 titleBarOptions.title`, this.properties.titleBarOptions.title)
      // console.log(`调试:组件事件`, context)
    },
     handleContentTap(res){
      // console.log(`调试:页面上的所有点击`, res)
    },
    goto(page,data){
      // console.log(`调试:事件触发测试`, res)
      this.setData({
        activePage:page
      })
    }
  },
 
  /**节点关联 */
  relations: {
    PageContorl: {
      type: 'descendant', // 关联的目标节点应为子孙节点
      target: PageContorl,
      linked: function (target) {
        console.info('Page已关联到 ' + target.is)
      }
    }
  }
})
