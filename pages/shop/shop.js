// pages/shop/shop.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var area = wx.getStorageSync('adcode');
var district = wx.getStorageSync('district');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchText:[{text:'全部店铺',id:'0'},{text:'附近的店',id:'1'},{text:'人气排名',id:'2'}],
    list:[],
    district:'铁西区',
    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.shopList()  //店铺列表
    this.Selarea() // 获取城市列表
  },
  shopList(id){
    var that = this
    var is_near = ''
    var is_gas = ''
    if(id == 1){
      is_near = 1
      is_gas = ''
    } else if(id == 2){
      is_near = ''
      is_gas = 1
    } else{
      is_near = ''
      is_gas = ''
    }
    util.request(api.getStoreList,{
      lng: wx.getStorageSync('location').longitude,
      lat: wx.getStorageSync('location').latitude,
      keywords:'',
      is_near: is_near,
      is_gas: is_gas,
      area:area
    }).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            list: res.data.data
          })
        }
      }
    )
  },
  // 接收组件参数
  switch(e){
    console.log(e.detail)
    this.shopList(e.detail)
  },
  // 跳转店铺
  onClick(e) {
    wx.navigateTo({
      url: '/pages/shopDetails/shopDetails?id=' + e.detail,
    })
  },
  Selarea(){
    var that = this
    util.request(api.Selarea,{}).then(
      res =>{
        var data = that.data.multiArray
        data[0] = res.data.data
        data[1] = res.data.data[0].city
        data[2] = res.data.data[0].city[0].area
        that.setData({
          multiArray: data,
          datadata: res.data.data
        })
      }
    )
  },
   // 确定后执行
   bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', this.data.multiArray[2][e.detail.value[2]])
    wx.setStorage({
      data: this.data.multiArray[2][e.detail.value[2]].id,
      key: 'adcode',
    })
    wx.setStorage({
      data: that.data.multiArray[2][e.detail.value[2]].name,
      key: 'district',
    })
    var that = this
    this.setData({
      multiIndex: e.detail.value,
      district: that.data.multiArray[2][e.detail.value[2]].name,
      addressText: this.data.multiArray[0][e.detail.value[0]].name + that.data.multiArray[1][e.detail.value[1]].name + that.data.multiArray[2][e.detail.value[2]].name
    })
    this.data['yesAddress'] = 1
  },
  // 滚动时执行
  bindMultiPickerColumnChange: function (e) {
    var data = this.data.multiArray
    console.log(e.detail)
    if(e.detail.column == 0){
      data[1] = this.data.datadata[e.detail.value].city
      data[2] = this.data.datadata[e.detail.value].city[0].area
    }
    if(e.detail.column == 1){
      data[2] = data[1][e.detail.value].area
    }
    this.setData({
      multiArray: data
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    district = wx.getStorageSync('district');
    console.log(wx.getStorageSync('district'))
    this.setData({
      district:wx.getStorageSync('district')
    })
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