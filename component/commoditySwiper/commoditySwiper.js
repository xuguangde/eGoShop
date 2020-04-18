Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperImgUrls:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperCurrent: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange(e){
      const that = this;
      that.setData({
        swiperCurrent: e.detail.current
      })
    }
  }
})