// pages/deliveryaddress/deliveryaddress.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[]
  },

  adddizhi: function (e) {
    wx.redirectTo({
      url: '../addaddress/addaddress',
    })
  },
  delete(index){
    var that = this
    var data = this.data.addressList
    data.splice(index,1)
    this.setData({
      addressList: this.data.addressList
    })
  },
  // 返回上一页
  fanhui(e){
    let pages = getCurrentPages();  //获取所有页面栈实例列表
    let nowPage = pages[ pages.length - 1];  //当前页页面实例
    let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
    prevPage.setData({
      address: e.currentTarget.dataset.data
    })
    wx.navigateBack({
      delta: 1
    });
  },
  // 设置默认地址
  updShip(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    var addressList = this.data.addressList
    var that = this
    util.request(api.updShip,{id:e.currentTarget.dataset.id,uid: wx.getStorageSync('user').id}).then(
      res =>{
        util.msg(res.data.msg)
        if(res.data.retcode == 1){
          console.log(addressList[index])
          if(addressList[index].is_def == 1){
            for(var i = 0;i<addressList.length;i++){
              addressList[i].is_def = 2
            }
          } else{
            for(var i = 0;i<addressList.length;i++){
              if(i != index){
                addressList[i].is_def = 2
              } else{
                addressList[index].is_def = 1
              }
            }
          }
          
          that.setData({
            addressList: addressList
          })
        }
      }
    )
  },
  del: function (e) {
    var index = e.currentTarget.dataset.index
    var that = this
    wx.showModal({
      title: '删除确认',
      content: '确认要删除该收件地址吗？',
      success (res) {
        if (res.confirm) {
          util.request(api.removeShip,{uid: wx.getStorageSync('user').id,id: e.currentTarget.dataset.id}).then(
            res =>{
              util.msg(res.data.msg)
              if(res.data.retcode == 1){
                that.delete(index)
              }
            }
          )
        } else if (res.cancel) {
        console.log('用户点击取消')
        }
        }
    })
  },

  navto(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/addaddress/addaddress?type=1'+'&data=' + JSON.stringify(e.currentTarget.dataset.data),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.getUserShip()  //获取收货地址
  },
  getUserShip(){
    var that = this
    util.request(api.getUserShip,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            addressList: res.data.data
          })
        } else{
          util.msg(res.data.msg)
        }
      }
    )
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