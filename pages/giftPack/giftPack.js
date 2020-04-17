// pages/giftPack/giftPack.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    if(options.id == 1) {
      this.GetSetmealList()
      wx.setNavigationBarTitle({
        title: '套餐礼包',
      })
    } else{
      this.GetCouponList()
      wx.setNavigationBarTitle({
        title: '优惠券专区',
      })
    }
    this.banner(options.id)
  },
  banner(id){
    var that = this
    var key = ''
    if(id == 1) {
      key = 'setmeal'
    } else{
      key = 'coupon'
    }
    util.request(api.getScrollinggraph,{key: key}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            swiperImgUrls: res.data.data
          })
        }
      }
    )
  },
  GetCouponList(){
    var that = this
    util.request(api.GetCouponList,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            shopGoodsList: res.data.data
          })
        }
      }
    )
  },
  GetSetmealList(){
    var that = this
    util.request(api.GetSetmealList,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            shopGoodsList: res.data.data
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