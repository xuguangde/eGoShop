Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img: {
      type: String,
      value: ''
    },
    text: {
      type: String,
      value:''
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    switchIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switch(e){
      this.setData({
        switchIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('switch',e.currentTarget.dataset.id)
    }
  }
})