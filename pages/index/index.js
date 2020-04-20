//index.js
//获取应用实例
const app = getApp()
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    swiperImgUrls:[],
    contentList:[{name:'欢迎进入小程序111'}],
    warehouse:[],
    swiperCurrent: 0,
    hotGoodsList:[],
    newGoodsList:[],
    redPack:[],
    flag: true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
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
    this.banner() // 轮播
    this.getNoticeList()  //公告
    this.getOneCategoryList()  //一级分类 仓库
    this.GetPopularityList()  //获取人气产品
    this.GetNewGoodsList()  //新品上市
    this.getFirstUserCouponList()  //弹窗优惠券
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
    util.request(api.GetNewGoodsList,{uid: wx.getStorageSync('user').id}).then(
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
