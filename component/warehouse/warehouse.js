Component({
  /**
   * 组件的属性列表
   */
  properties: {
    warehouse:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: { },
  attached(){
  },
  observers:{
  },
  /**
   * 组件的方法列表
   */
  methods: {
    warehouse(e){
      this.triggerEvent('warehouse',e.currentTarget.dataset.id)
    }
  }
})