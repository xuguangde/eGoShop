// pages/selectdeliveryaddress /selectdeliveryaddress .js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addcart:[],
    address:'',
    jifenType: 2,
    ycard:[],
    zong: 0,
    ycardId:'',
    ycardPrice: 0,
    jifen: 0,
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      id: options.id
    })
    // 获取默认地址
    util.request(api.getShipdef,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            address: res.data.data
          })
        } else{
          util.msg(res.data.msg)
        }
      }
    )
    util.request(api.cartdetial,{uid: wx.getStorageSync('user').id,id: options.id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            addcart: res.data.data.list,
            ycard: res.data.data.ycard,
            zong: res.data.data.zong,
            kejian: res.data.data.kejian,
            jifen: res.data.data.jifen
          })
        } else {
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 提交订单
  PayOrder(e){
    var that = this
    var jifen = ''
    if(that.data.jifenType == 1){
      jifen = that.data.jifen
    }
    util.request(api.PayOrder,{
      uid: wx.getStorageSync('user').id,
      cids: that.data.id,
      add_id: that.data.address.id,
      y_id: that.data.ycardId,
      integral: jifen,
    }).then(
      res =>{
        if(res.data.retcode){
          wx.redirectTo({
            url: '/pages/noreceivingaddress/noreceivingaddress?price=' + e.currentTarget.dataset.price,
          })
        } else {
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 选择优惠券
  youhui(){
    wx.navigateTo({
      url: '/pages/mycouponone/mycouponone?data=' + JSON.stringify(this.data.ycard),
    })
  },
  // 是否使用积分
  jifen(e){
    console.log(e.currentTarget.dataset.id)
    var zong = this.data.zong
    var kejian = this.data.kejian
    this.setData({
      jifenType: e.currentTarget.dataset.id
    })
    if(e.currentTarget.dataset.id == 1){
      this.setData({
        zong: zong - kejian
      })
    } else {
      this.setData({
        zong: zong + kejian
      })
    }
  },
  navto(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
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
    var zong = this.data.zong
    var ycardPrice = this.data.ycardPrice
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