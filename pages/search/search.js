// pages/search/search.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords:'',
    goodsList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 切换销量
  statusBar(e){
    var that = this
    console.log(e.detail)
    if(e.detail == 1){
      that.setData({
        sales: 1,
        top: '',
      })
    } else if(e.detail == 2){
      that.setData({
        sales: '',
        top: 1,
      })
    } else{
      that.setData({
        sales: '',
        top: '',
      })
    }
    // 点击搜索
    this.onClick()
  },
  // 搜索关键字
  search(e){
    this.data.keywords = e.detail
  },
  // 点击搜索
  onClick(){
    var that = this
    if(this.data.keywords != ''){
      util.request(api.SelGoods,{
        uid: wx.getStorageSync('user').id,
        keywords: that.data.keywords,
        sales: that.data.sales,
        top: that.data.top,
      }).then(
        res =>{
          if(res.data.retcode == 1) {
            that.setData({
              goodsList: res.data.data
            })
          } else{
            util.msg(res.data.msg)
          }
        }
      )
    } else{
      util.msg('请输入商品名称')
    }
    
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