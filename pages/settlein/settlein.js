// pages/settlein/settlein.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'',
    name:'',
    cardId: '',
    licenseId:'',
    logoId:'',
    img:{
      cardImg:'',
      licenseImg:'',
      logoImg:'',
    },
    multiArray:[],
    multiIndex:[],
    addressText:'',
    shop_goods:'',
    shopname:'',
    phone:'',
    cardidNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 组件地址列表
    this.Selarea()
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
      data[2] = this.data.datadata[e.detail.value].city[0].area
    }
    this.setData({
      multiArray: data
    })
  },
  // 上传身份证
  cardIdImg(e){
    var name = e.currentTarget.dataset.name
    var nameImg = e.currentTarget.dataset.nameimg
    console.log(e.currentTarget.dataset.nameimg)
    util.chooseImage().then(
      res =>{
        console.log(JSON.parse(res.data))
        console.log(res.dataOne)
        this.data[name] = JSON.parse(res.data).data
        this.data.img[nameImg] = res.dataOne
        this.setData({
          img: this.data.img
        })
        console.log(this.data.img.cardImg)
      }
    )
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
    if(this.data.addressText == ''){
      return util.msg('请完成全部填写')
    }
    var province = that.data.multiArray[0][that.data.multiIndex[0]].id
    var city = that.data.multiArray[1][that.data.multiIndex[1]].id
    var area = that.data.multiArray[2][that.data.multiIndex[2]].id
    util.request(api.Applicationshop,{
      idcard: that.data.cardidNum,
      license: that.data.licenseId,
      id_img: that.data.cardId,
      name: that.data.name,
      store_name: that.data.shopname,
      store_goods: that.data.shop_goods,
      logo_img: that.data.logoId,
      phone: that.data.phone,
      uid: wx.getStorageSync('user').id,
      province: province,
      city: city,
      area: area
    }).then(
      res => {
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