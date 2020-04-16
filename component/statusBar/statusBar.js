Component({
  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    status(e){
      console.log("77777",e.currentTarget.dataset.index)
      this.setData({
        index: e.currentTarget.dataset.index
      })
    }
  }
})