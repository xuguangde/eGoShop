// pages/commodity/commodity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls:[
      {pic:'https://symc.shengguweb.com/uploads/images/20200415/061c1665945294f2db86536d2600aff8.png'},
      {pic:'https://symc.shengguweb.com/uploads/images/20200415/061c1665945294f2db86536d2600aff8.png'},
      {pic:'https://symc.shengguweb.com/uploads/images/20200415/061c1665945294f2db86536d2600aff8.png'},
      {pic:'https://symc.shengguweb.com/uploads/images/20200415/061c1665945294f2db86536d2600aff8.png'},
    ],
    flag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  specs(){
    this.setData({
      flag: false
    })
  },
  close(){
    this.setData({
      flag: true
    })
  },
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
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