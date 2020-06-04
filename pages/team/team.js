// pages/team/team.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchIndex: 1,
    list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.teamuser()
  },
  teamuser() {
    var that = this
    util.request(api.teamuser,{uid: wx.getStorageSync('user').id,type: this.data.switchIndex}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            list: res.data.data
          })
        } else{
          this.setData({
            list: res.data.data
          })
          util.msg(res.data.msg)
        }
      }
    )
  },
  switch(e){
    this.setData({
      switchIndex: e.currentTarget.dataset.index
    })
    this.teamuser()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})