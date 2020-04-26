// pages/integraldetails/integraldetails.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var app = getApp().globalData;
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    data:'',
    type: '',
    switchText:[{text:'收入记录',id:'1'},{text:'提现记录',id:'2'}],
    typeId:'1',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    console.log(options.type)
    if(options.type == 1){
      this.getUserIntegral()  //获取积分明细
    } else{
      this.getUserCommission()
    }
    this.getUserinfo()  //获取个人信息
    this.jifen()  // 积分说明
  },
  // 积分说明
  jifen(){
    util.request(api.jifen,{}).then(
      res =>{
        this.setData({
          content: res.data.data.content
        })
      }
    )
  },
  // 跳转积分明细
  navto(){
    wx.navigateTo({
      url: '/pages/rich/rich?content='+ encodeURIComponent(this.data.content),
    })
  },
  switch(e){
    console.log(e)
    this.data['typeId'] = e.detail
    this.setData({
      list: []
    })
    this.getUserCommission()
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
  // 收支明细
  getUserCommission(){
    var that = this
    console.log('777777')
    util.request(api.getUserCommission,{uid: wx.getStorageSync('user').id,page:page,limit:app.limit,type: this.data['typeId']}).then(
      res => {
        console.log('88888',res)
        if(res.data.retcode == 1){
          that.setData({
            list: res.data.data
          })
        } else {
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 积分明细
  getUserIntegral(){
    var that = this
    util.request(api.getUserIntegral,{uid: wx.getStorageSync('user').id,page:page,limit:app.limit}).then(
      res => {
        if(res.data.retcode == 1){
          that.setData({
            list: res.data.data
          })
        } else {
          util.msg(res.data.msg)
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onReachBottom(){
    page++
    this.getUserIntegral()
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