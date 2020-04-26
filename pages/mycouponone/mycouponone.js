// pages/mycouponone.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:[],
    type: 1,
    switchText:[{text:'未使用',id:'1'},{text:'已使用',id:'2'},{text:'已过期',id:'3'}],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.data != undefined){
      this.setData({
        couponList: JSON.parse(options.data),
        fanhuiType:1
      })
    } else {
      fanhuiType:2
      this.couponList() //优惠券列表
    }
  },
  navto(){
    wx.navigateTo({
      url: '/pages/giftPack/giftPack?id=1',
    })
  },
  switch(e){
    this.setData({
      type: e.detail,
      couponList: []
    })
    page = 1
    this.couponList()
  },
  onReachBottom(){
    console.log('77777')
    page++
    this.couponList()
  },
  // 返回上一页
  fanhui(e){
    let pages = getCurrentPages();  //获取所有页面栈实例列表
    let nowPage = pages[ pages.length - 1];  //当前页页面实例
    let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
    prevPage.setData({
      ycardId: e.currentTarget.dataset.id,
      ycardPrice: e.currentTarget.dataset.price,
    })
    wx.navigateBack({
      delta: 1
    });
  },
  couponList(){
    var that = this
    util.request(api.getUserCouponList,{
      uid: wx.getStorageSync('user').id,
      status: that.data.type,
      page: page,
      limit: 30
    }).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            couponList: that.data.couponList.concat(res.data.data)
          })
        } else{
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
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})