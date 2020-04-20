// pages/shop/shop.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchText:[{text:'全部店铺',id:'0'},{text:'附近的店',id:'1'},{text:'人气排名',id:'2'}],
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.shopList()  //店铺列表
  },
  shopList(id){
    var that = this
    var is_near = ''
    var is_gas = ''
    if(id == 1){
      is_near = 1
      is_gas = ''
    } else if(id == 2){
      is_near = ''
      is_gas = 1
    } else{
      is_near = ''
      is_gas = ''
    }
    util.request(api.getStoreList,{
      lng: wx.getStorageSync('location').longitude,
      lat: wx.getStorageSync('location').latitude,
      keywords:'',
      is_near: is_near,
      is_gas: is_gas
    }).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            list: res.data.data
          })
        }
      }
    )
  },
  // 接收组件参数
  switch(e){
    console.log(e.detail)
    this.shopList(e.detail)
  },
  // 跳转店铺
  onClick(e) {
    wx.navigateTo({
      url: '/pages/shopDetails/shopDetails?id=' + e.detail,
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