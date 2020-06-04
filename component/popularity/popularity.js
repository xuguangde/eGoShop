Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hotGoodsList:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id: 0,
    idid: 1
  },
  attached(){
    
  },
  observers: {
    'hotGoodsList'(){
      var that = this
      if(this.data.hotGoodsList != ''){
        setInterval(() => {
          if(that.data.idid < that.data.hotGoodsList.length){
            that.setData({
              id:  that.data.id + 234,
              idid: that.data.idid + 1
            })
          } else {
            that.setData({
              id:  0,
              idid: 1
            })
          }
        }, 2000);
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goodslist(e){
      this.triggerEvent('goodslist',e.currentTarget.dataset.id)
    }
  }
})