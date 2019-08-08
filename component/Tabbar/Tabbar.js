// component/Tabbar/Tabbar.js
const BaseComponent= require("../BaseComponent.js")
Component({
  // 引入拓展
  behaviors: [BaseComponent],
  options: {
    addGlobalClass: true,
  },
  created(){
    console.log(`调试:组件创建成功`, this.properties)
  },
  

  /**
   * 组件的属性列表
   */
  properties: {

  },
 

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabTap(e){
      const data = e.currentTarget.dataset
      const { index } = data
      const currentTab = this.data.list[index]
      
      // console.log(`调试:`, currentTab)
      if(!currentTab.action){
        this.setData({
          active: data.index
        })
        this.triggerEvent("change",{...currentTab, index},{
          
        })
      }else{

      }
    
    }    
  }
})
