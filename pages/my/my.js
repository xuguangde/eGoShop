// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  wdmoney: function (e) {
    wx.redirectTo({
      url: '../mymoney/mymoney',
    })

    // var ccc = e.currentTarget.dataset.id;//获取view中的药用currentTarget
    // console.log(ccc);
    // wx.navigateTo({
    //   url: '../../kantie/kantie?Id=' + ccc,
    // })
  },

  wdsoucang: function (e) {
    wx.redirectTo({
      url: '../mycollection/mycollection',
    })
  },


  dizhi: function (e) {
    wx.redirectTo({
      url: '../deliveryaddress/deliveryaddress',
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})