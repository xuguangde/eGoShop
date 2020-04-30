// pages/classift/classift.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    towList:[],
    list:[],
    threeList:[],
    indexTwo: 99
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTwoCategoryList(options.id)
    this.whole()
  },
  search(e){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 跳转商品
  goods(e){
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + e.currentTarget.dataset.id,
    })
  },
  getTwoCategoryList(id){
    var that = this
    util.request(api.getTwoCategoryList,{cate_id:id}).then(
      res => {
        if(res.data.retcode == 1){
          that.setData({
            towList:res.data.data
          })
        }
      }
    )
  },
  towClick(e){
    var that = this
    this.setData({
      indexTwo: e.currentTarget.dataset.index
    })
    util.request(api.getThreeCategoryList,{cate_id:e.currentTarget.dataset.id}).then(
      res => {
        if(res.data.retcode == 1){
          that.setData({
            threeList:res.data.data
          })
        } else{
          util.msg(res.data.msg)
          that.setData({
            threeList:[]
          })
        }
      }
    )
  },
  threeClick(e){
    var that = this
    util.request(api.getCategroyGoodsLsit,{cate_id_3:e.currentTarget.dataset.id,uid: wx.getStorageSync('user').id}).then(
      res => {
        if(res.data.retcode == 1){
          that.setData({
            list:res.data.data,
            threeList:[]
          })
        } else{
          util.msg(res.data.msg)
          that.setData({
            threeList:[]
          })
        }
      }
    )
  },
  whole(){
    var that = this
    util.request(api.getCategroyGoodsLsit,{cate_id_3:'',uid: wx.getStorageSync('user').id}).then(
      res => {
        if(res.data.retcode == 1){
          that.setData({
            list:res.data.data,
            indexTwo: 99
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