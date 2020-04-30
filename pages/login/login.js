// pages/logon/logon.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:'',
    action_code:'',
    safety: {
      time: 5,
      state: false,
      interval: ''
    },
    yaoqingtype: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  inputedit(e){
    var that = this;
    var value = e.detail.value
    var name = e.currentTarget.dataset.name
    that.data[name] = value
    if(that.data['phone'].length == 11){
      util.request(api.chkyaoqing,{phone: that.data['phone']}).then(
        res =>{
          if(res.data.retcode == 1){
            console.log(res)
            that.setData({
              yaoqingtype: res.data.data
            })
          } else {

          }
        }
      )
    }
  },
  sendSms(){
    var that = this;
    if(util.isMobile(this.data.phone)){
      util.request(api.sendSms,{phone:this.data.phone,type:'reg'}).then(
        res =>{
          if(res.data.retcode == 1){
              // 成功后显示倒计时60s后可在点击
              that.data.safety.state = true;
							// 倒计时
							that.data.safety.interval = setInterval(() => {
                that.setData({
                  safety: that.data.safety
                })
								if (that.data.safety.time-- <= 0) {
									that.data.safety.time = 60;
                  that.data.safety.state = false;
                  that.setData({
                    safety: that.data.safety
                  })
									clearInterval(that.data.safety.interval);
								}
							}, 1000);
          } else {
            util.msg(res.data.msg)
          }
        }
      )
    } else{
      util.msg('请正确输入手机号码')
    }
  },
  login(){
    util.request(api.login,{phone:this.data.phone,action_code:this.data.action_code,code:this.data.code}).then(
      res =>{
        util.msg(res.data.msg)
        if(res.data.retcode == 1){
          wx.setStorage({
            data: res.data.data,
            key: 'user',
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }, 1500);
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