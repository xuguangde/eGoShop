// pages/settlein/settlein.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    name:''
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
    console.log(that.data[name])
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 提交
  submit(){
    var that = this
    util.request(api.Applicationshop,{
      idcard: that.data.cardid,
      license:'',
      id_img:'',
      name: that.data.name,
      store_name: that.data.shopname,
      store_goods: that.data.shop_goods,
      logo_img:'',
      phone: that.data.phone,
      uid: wx.getStorageSync('user').id
    }).then(
      res => {
        util.msg(res.data.msg)
      }
    )
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