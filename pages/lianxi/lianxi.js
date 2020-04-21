// pages/lianxi/lianxi.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    url: "/img/xzb44.png",
    iShow: true
  },

  open: function (res) {

    console.log(res);

    let url

    if (res.currentTarget.dataset.msg == "/img/xzc44.png") {

      url = "/img/xzc44.png"

    } else {

      url = "/img/xzc44.png"
    }

    this.setData({

      url: url

    })

  }
})
  