//index.js
//获取应用实例
const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var bmap = require('../../libs/bmap-wx.min.js'); 
var wxMarkerData = []; 
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperImgUrls:[],
    contentList:[{name:'欢迎进入小程序'}],
    warehouse:[],
    swiperCurrent: 0,
    hotGoodsList:[],
    newGoodsList:[],
    redPack:[],
    flag: true,
    rgcData:{},
    district:'市区',
    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
    phone: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 点击轮播
  brnner(e){
    wx.navigateTo({
      url: '/pages/webview/webview?src=' + e.currentTarget.dataset.link,
    })
  },
  // 打电话
  phone(){
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  brnnerGoods(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + e.currentTarget.dataset.link,
    })
  },
  // 关闭红包窗口
  popup(){
    this.setData({
      flag: true,
    })
    wx.showTabBar({
      animation: true,
    })
  },
  // 跳转分类
  warehouse(e){
    wx.navigateTo({
      url: '/pages/classift/classift?id=' + e.detail,
    })
  },
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
  },
  giftPack(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/giftPack/giftPack?id=' + e.currentTarget.dataset.id,
    })
  },
  onLoad: function () {
    this.Selarea()  // 获取全国的省市区
    this.banner() // 轮播
    this.getNoticeList()  //公告
    this.getOneCategoryList()  //一级分类 仓库
    this.GetPopularityList()  //获取人气产品
    this.GetNewGoodsList()  //新品上市
    this.getFirstUserCouponList()  //弹窗优惠券
    this.about()  // 关于我们获取手机号
    var that = this; 
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({ 
        ak: 'Z4tAyfm8ftz1ZD8xRNB4oaTykb6rF65N' 
    });  
    var fail = function(data) { 
      console.log(data) 
    }; 
    var success = function(data) {
      console.log(data.originalData.result.addressComponent.district) 
      wx.setStorage({
        data: data.originalData.result.addressComponent.adcode,
        key: 'adcode',
      })
      that.setData({
        district: data.originalData.result.addressComponent.district
      })
      wx.setStorage({
        data: data.originalData.result.addressComponent.district,
        key: 'district',
      })
    } 
    // 发起regeocoding检索请求 
    BMap.regeocoding({ 
      fail: fail, 
      success: success,  
    });
  },
  about(){
    var that = this
    util.request(api.about,{}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            content: res.data.data.content,
            phone: res.data.data.phone
          })
          wx.setStorage({
            data: res.data.data.phone,
            key: 'phone',
          })
        } else{
          util.msg(res.data.msg)
        }
      }
    )
  },
  onShow(){
    if(wx.getStorageSync('user').id == undefined ||wx.getStorageSync('user').id == ''){
      util.request(api.isLogin,{}).then(
        res =>{
          if(res.data.data == 1){
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
        }
      )
      var user = {id:''}
      wx.setStorage({
        data: user,
        key: 'user',
      })
    }
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
      data: this.data.multiArray[2][e.detail.value[2]].name,
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
  // 跳转商品详情
  goodslist(e){
    wx.navigateTo({
      url: '/pages/commodity/commodity?id='+ e.detail,
    })
  },
  getFirstUserCouponList(){
    var that = this
    util.request(api.getFirstUserCouponList,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          wx.hideTabBar({
            animation: true,
          })
          that.setData({
            flag: false,
            redPack: res.data.data
          })
        } else{
          that.setData({
            flag: true
          })
        }
      }
    )
  },
  GetNewGoodsList(){
    var that = this
    util.request(api.GetNewGoodsList,{
      uid: wx.getStorageSync('user').id,
    }).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            newGoodsList: res.data.data
          })
        }
      }
    )
  },
  GetPopularityList(){
    var that = this
    util.request(api.GetPopularityList,{uid: wx.getStorageSync('user').id}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            hotGoodsList: res.data.data
          })
        }
      }
    )
  },
  getOneCategoryList(){
    var that = this
    util.request(api.getOneCategoryList,{}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            warehouse: res.data.data
          })
        }
      }
    )
  },
  getNoticeList(){
    var that = this
    util.request(api.getNoticeList,{}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            contentList: res.data.data
          })
        }
      }
    )
  },
  banner(){
    var that = this
    util.request(api.getScrollinggraph,{key:'home'}).then(
      res =>{
        if(res.data.retcode == 1){
          that.setData({
            swiperImgUrls: res.data.data
          })
        }
      }
    )
  },
  search(e){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  seckill(){
    wx.navigateTo({
      url: '/pages/seckill/seckill',
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
