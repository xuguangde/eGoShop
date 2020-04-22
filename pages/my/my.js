// pages/my/my.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:''
  },
  navto(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  wdmoney: function (e) {
    wx.navigateTo({
      url: '../mymoney/mymoney',
    })
  },

  wdsoucang: function (e) {
    wx.navigateTo({
      url: '/pages/mycollectshop/mycollectshop',
    })
  },


  dizhi: function (e) {
    wx.navigateTo({
      url: '../deliveryaddress/deliveryaddress',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserinfo()  //获取个人信息
  },
  getUserinfo(){
    var that = this
    util.request(api.getUserinfo,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            data: res.data.data
          })
        }
      }
    )
  },
  getUserinfo(){
    var that = this
    util.request(api.getUserinfo,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            data: res.data.data
          })
        }
      }
    )
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
    this.getUserinfo()  //获取个人信息
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