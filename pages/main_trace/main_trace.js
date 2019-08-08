// index/cart/cart.js
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true // 在组件定义时的选项中启用多slot支
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
   
  },
  lifetimes: {
    attached() {
      console.log(`调试:${this.is}被加载`)
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
    created(){
      console.log(`调试:${this.is}被创建`)

    }
  },

})
