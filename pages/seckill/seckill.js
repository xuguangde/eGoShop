// pages/seckill/seckill.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[],
    index:'0',
    end_time:'',
    start_time:'',
    timestamp:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSeckillList()
  },
  onClick(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      index: e.currentTarget.dataset.id
    })
    this.getSeckillList()
  },
  getSeckillList(){
    var that = this
    util.request(api.getSeckillList,{type: Number(this.data.index) + 1,}).then(
      res => {
        if(res.data.retcode == 1) {
          var timestamp = Date.parse(new Date())/1000
          console.log('当前时间',timestamp)
          that.setData({
            data: res.data.data.lists,
            start_time: res.data.data.list.start_time,
            timestamp: Date.parse(new Date())/1000,
            end_time: res.data.data.list.end_time,
            type: that.data.index
          })
        } else {
          that.setData({
            data: res.data.data.lists
          })
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})