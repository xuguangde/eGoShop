Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsList:{
      type: Array,
      value: []
    },
    cart:{
      type: String,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: { },
  attached(){
  },
  observers:{
    'goodsList':function(){
      console.log(this.data.goodsList)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})