// pages/cashout/cashout.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:0,
    data:'',
    price: 0
  },
  navto(){
    wx.navigateTo({
      url: '/pages/setupbankcard/setupbankcard?data='+JSON.stringify(this.data.data),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      money: options.money
    })
  },
  text(e){
    var that = this;
    var value = e.detail.value
    this.setData({
      price: value
    })
  },
  tixian(){
    util.request(api.postApplycash,{
      uid: wx.getStorageSync('user').id,
      price: this.data.price,
      oname: this.data.data.oname,
      obank: this.data.data.obank,
      bnumber: this.data.data.bnumber
    }).then(
      res =>{
        util.msg(res.data.msg)
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/my/my',
          })
        }, 1500);
      }
    )
  },
  // 获取银行卡列表
  GetbankList(){
    var that = this
    util.request(api.GetbankList,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            data: res.data.data[0]
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
    this.GetbankList() // 获取银行卡列表
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