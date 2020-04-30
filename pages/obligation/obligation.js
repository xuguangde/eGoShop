// pages/obligation/obligation.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    day: 0,
    hour: 0,
    min: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var timestamp = Date.parse(new Date())/1000
    util.request(api.getOrderdetail,{id: options.id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            data: res.data.data
          })
          util.getDifValue(res.data.data.service_info.endtime,timestamp).then(
            res =>{
              that.setData({
                day: res.day,
                hour: res.hour,
                min: res.min,
              })
            }
          )
        } else {
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 取消申请
  cancel(e) {
    util.request(api.removeService,{id: this.data.data.service_info.id}).then(
      res =>{
        util.msg(res.data.msg)
        if(res.data.retcode == 1){
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 1500);
        }
      }
    )
  },
  shouhou(){
    wx.navigateTo({
      url: '/pages/applyforsale/applyforsale?id='+ this.data.data.id,
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