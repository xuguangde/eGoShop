Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '注册/登录'
    },
    width:{
      type: String,
      value: '630rpx'
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
    onClick(){
      this.triggerEvent('onClick')
    }
  }
})