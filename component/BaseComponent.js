module.exports = Behavior({
  options: {
    addGlobalClass: true,
  },
  definitionFilter(defFields, definitionFilterArr) {
    const SystemInfo = wx.getSystemInfoSync();
    const custom = wx.getMenuButtonBoundingClientRect();
    defFields.data.Custom = wx.getMenuButtonBoundingClientRect();
    defFields.data.StatusBar = SystemInfo.statusBarHeight
    defFields.data.CustomBar = custom.bottom + custom.top - SystemInfo.statusBarHeight
  },
  properties: {
    options: {
      type: Object,
      value: {},
      observer(newValue, e) {
        console.log(`调试:监听器`, newValue, e)
      },
    }
  },
  created() {
    const that = this
    const prop = this.properties
    // console.log(`调试:已设置的prop`, prop)

    // console.log(`[异步值打印]调试prop的值:[${Date.parse(new Date())}]`, prop, `\n\n\n options值[${Date.parse(new Date())}]:`,prop.options)
    /* 这里加延时是因为一个奇怪的bug  组件外部传入的props与内部接收的时间不同步*/
    setTimeout(() => {
      const options = prop.options
      if (prop.options) {
        for (let key in options) {
          if (prop[key]) { //这里想实现如果已经传入props则props优先级高于options 但是没有成功
            continue;
          } else {
            that.setData({
              ...options
            })
          }
        }
      }
    }, 10)
  },
  
})