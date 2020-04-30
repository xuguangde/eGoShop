Component({
  /**
   * 组件的属性列表
   */
  properties: {
    contentList: {
      type: Array,
      value: []
    },
    text: {
      type: String,
      value: '注册/登录'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    listI: -1,
    content: '欢迎进入小程序'
  },
  attached: function () {
    setInterval(() => {
      this.update(this.getListInfo())
    }, 5000)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    update(content) {
      var that = this
      var animation = wx.createAnimation()
      // 旧消息向上平移
      animation.translateY(-30).step({
        duration: 1000,
        timingFunction: 'ease-in'
      })
      // 为了实现下一条新内容向上平移的效果，必须把内容很快平移到下方，并且不能被用户看见，这里其原理类似轮播图的思路。
      // 实现方法：动画时间设置为1ms，过渡效果设置为’动画第一帧就跳至结束状态直到结束‘
      animation.opacity(0).translateY(30).step({
        duration: 1,
        timingFunction: 'step-start'
      })
      // 新消息向上平移的同时恢复透明
      animation.opacity(1).translateY(0).step({
        duration: 1000,
        timingFunction: 'ease-out'
      })
      that.setData({
        animationData: animation.export()
      })
      // 更新内容的延时必须大于第一步动画时间
      setTimeout(() => {
        that.setData({
          content: content
        })
      }, 1000)
    },
    getListInfo() {
      if (this.data.listI >= this.data.contentList.length - 1) {
        this.data.listI = -1
        this.getListInfo()
      } else {
        this.data.listI++
      }
      return this.data.contentList[this.data.listI].name
    }
  }
})