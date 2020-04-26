// pages/setupbankcard/setupbankcard.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardName:'',
    cardnum:'',
    name:'',
    kid:'',
    data:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(JSON.parse(options.data) != ''){
      this.setData({
        cardnum: JSON.parse(options.data).bnumber,
        cardName: JSON.parse(options.data).obank,
        name: JSON.parse(options.data).oname,
        kid: JSON.parse(options.data).id
      })
    }
  },
  inputedit(e){
    var that = this;
    var value = e.detail.value
    var name = e.currentTarget.dataset.name
    that.data[name] = value
  },
  onClick(){
    var that = this
    if(this.data.kid !=''){
      var newapi = api.editBank
    } else{
      var newapi = api.addBank
    }
    util.request(newapi,{
      uid: wx.getStorageSync('user').id,
      obank:  that.data.cardName,
      oname: that.data.name,
      bnumber: that.data.cardnum,
      kid: that.data.kid
    }).then(
      res =>{
        if(res.data.retcode == 1){
          wx.navigateBack({
            delta: 1
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
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})