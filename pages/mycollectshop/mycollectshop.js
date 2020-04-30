// pages/mycollectshop/mycollectshop.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchText:[{text:'店铺',id:'0'},{text:'商品',id:'1'}],
    collectGoodsList:[],
    collectStoreList:[],
    type: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.collectGoodsList()  //收藏商品
    this.collectStoreList()  //收藏店铺
  },
  switch(e){
    console.log(e.detail)
    this.setData({
      type: e.detail
    })
  },
  navto(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  collectGoodsList(){
    var that = this
    util.request(api.collectGoodsList,{uid: wx.getStorageSync('user').id}).then(
      res => {
        if(res.data.retcode == 1) {
          that.setData({
            collectGoodsList: res.data.data
          })
          console.log("7777",that.data.collectGoodsList)
        }
      }
    )
  },
  collectStoreList(){
    var that = this
    util.request(api.collectStoreList,{uid: wx.getStorageSync('user').id}).then(
      res => {
        if(res.data.retcode == 1) {
          that.setData({
            collectStoreList: res.data.data
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