Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width:{
      type: String,
      value: ''
    },
    disabled:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: { },

  /**
   * 组件的方法列表
   */
  methods: {
    inputOn(e){
      this.triggerEvent('search',e.detail.value)
    },
    onClick(){
      this.triggerEvent('onClick')
    }
  }
})