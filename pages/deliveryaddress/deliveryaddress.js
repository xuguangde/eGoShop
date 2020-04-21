// pages/deliveryaddress/deliveryaddress.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  },

  adddizhi: function (e) {
    wx.redirectTo({
      url: '../addaddress/addaddress',
    })
  },

  del: function (e) {
    wx.showModal({
      title: '删除确认',
      content: '确认要删除该收件地址吗？',
    })
  },

  navto(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/addaddress/addaddress?type=1'+'&data=' + JSON.stringify(e.currentTarget.dataset.data),
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
    this.getUserShip()  //获取收货地址
  },
  getUserShip(){
    var that = this
    util.request(api.getUserShip,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            addressList: res.data.data
          })
        } else{
          util.msg(res.data.msg)
        }
      }
    )
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