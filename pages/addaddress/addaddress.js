// pages/addaddress/addaddress.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: '',
    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
    datadata:[],
    name:'',
    phone:'',
    address:'',
    addressText:'',
    type: 1,
    dataOne:'',
    yesAddress: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type == 1){
      var data = JSON.parse(options.data)
      console.log(data)
      this.data['dataOne'] = JSON.parse(options.data)
      this.setData({
        name: JSON.parse(options.data).name,
        phone: JSON.parse(options.data).mobile,
        addressText: data.province_name + data.city_name + data.area_name,
        address: data.address
      })
    }
    this.setData({
      type: options.type
    })
    this.Selarea()  // 获取全国的省市区
  },
  onClick(){
    if(this.data.type != 1){
      this.vueSaveUserShip()
    } else{
      this.editShip()
    }
  },
  // 编辑地址
  editShip(){
    var that = this
    var province = this.data['dataOne'].province
    var city = this.data['dataOne'].city
    var area = this.data['dataOne'].area
    if(this.data.yesAddress == 1){
      province = that.data.multiArray[0][that.data.multiIndex[0]].id
      city = that.data.multiArray[1][that.data.multiIndex[1]].id
      area = that.data.multiArray[2][that.data.multiIndex[2]].id
    }
    util.request(api.editShip,{
      name: that.data['name'],
      mobile: that.data['phone'],
      address: that.data['address'],
      province: province,
      city: city,
      area: area,
      uid: wx.getStorageSync('user').id,
      is_def: that.data['dataOne'].is_def,
      id: that.data['dataOne'].id
    }).then(
      res =>{
        if(res.data.retcode == 1){
          wx.navigateBack({
            delta: 1
          })
        }
      }
    )
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
    console.log('picker发送选择改变，携带值为', e)
    var that = this
    this.setData({
      multiIndex: e.detail.value,
      addressText: this.data.multiArray[0][e.detail.value[0]].name + that.data.multiArray[1][e.detail.value[1]].name + that.data.multiArray[2][e.detail.value[2]].name
    })
    this.data['yesAddress'] = 1
  },
  // 滚动时执行
  bindMultiPickerColumnChange: function (e) {
    var data = this.data.multiArray
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
  inputedit(e){
    var that = this;
    var value = e.detail.value
    var name = e.currentTarget.dataset.name
    that.data[name] = value
  },
  vueSaveUserShip(){
    var that = this
    var multiIndex = that.data.multiIndex
    console.log(that.data.multiArray[2].city)
    util.request(api.vueSaveUserShip,{
      name: that.data['name'],
      mobile: that.data['phone'],
      address: that.data['address'],
      province: that.data.multiArray[0][multiIndex[0]].id,
      city: that.data.multiArray[1][multiIndex[1]].id,
      area: that.data.multiArray[2][multiIndex[2]].id,
      uid: wx.getStorageSync('user').id
    }).then(
      res =>{
        util.msg(res.data.msg)
        if(res.data.retcode == 1){
          wx.redirectTo({
            url: '/pages/deliveryaddress/deliveryaddress',
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
  province: function (e) {
    console.log('选择地区', e.detail)
    this.setData({
      region: e.detail.value
    })
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