// pages/my/my.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    content: '',
    phone: '',
    userId: ''
  },
  navto(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  onClick(){
    if(wx.getStorageSync('user').id == undefined){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else{
      wx.showModal({
        title: '取消确认',
        content: '确认要退出登录吗？',
        success (res) {
          if (res.confirm) {
            wx.clearStorage()
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
        }
      })
    }
  },
  wdmoney: function (e) {
    wx.navigateTo({
      url: '../mymoney/mymoney',
    })
  },
  order(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/myorder/myorder?type=' + e.currentTarget.dataset.type,
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
  setClipboardData(){
    wx.setClipboardData({
      data: this.data.data.action_code,
      success: function (res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.about() //关于我们
  },
  about(){
    var that = this
    util.request(api.about,{}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            content: res.data.data.content,
            phone: res.data.data.phone
          })
          wx.setStorage({
            data: res.data.data.phone,
            key: 'phone',
          })
        } else{
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 联系客服
  phone(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  // 关于我们
  guanyu(){
    wx.navigateTo({
      url: '/pages/rich/rich?content=' + encodeURIComponent(this.data.content),
    })
  },
  getUserinfo(){
    var that = this
    util.request(api.getUserinfo,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          wx.setStorage({
            data: res.data.data,
            key: 'user',
          })
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
    this.setData({
      userId: wx.getStorageSync('user').id
    })
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