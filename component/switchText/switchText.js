Component({
  /**
   * 组件的属性列表
   */
  properties: {
    switchText: {
      type: Array,
      value: []
    },
    switchIndex:{
      type: Number,
      value: 0
    }
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
    switch(e){
      this.setData({
        switchIndex: e.currentTarget.dataset.index
      })
      this.triggerEvent('switch',e.currentTarget.dataset.id)
    }
  }
})