// pages/commodity/commodity.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImgUrls:[],
    flag: true,
    spec:[],
    content:'',
    is_ji:'',
    goods_name:'',
    data:'',
    collect: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goodsDetails(options.id)
  },
  
  goodsDetails(id){
    var that = this
    util.request(api.getGoodsDetailInfo,{uid:wx.getStorageSync('user').id,goods_id:id}).then(
      res => {
        if(res.data.retcode == 1){
          var spec = res.data.data.spec
          for(var i = 0;i < spec.length;i++){
            for(var n = 0;n < spec[i].con.length;n++){
                spec[i].con[n].type = false
                if(i == (spec.length -1) && n==(spec[i].con.length-1)){
                  console.log('执行了吗')
                that.setData({
                  spec: spec
                })
              }
            }
          }
          that.setData({
            swiperImgUrls: res.data.data.info.img_ids,
            goods_name: res.data.data.info.goods_name,
            content: res.data.data.info.content,
            data: res.data.data.info,
            collect: res.data.data.info.collect,
            is_ji: res.data.data.info.is_ji,
            price: res.data.data.info.price
          })
        }
      }
    )
  },
  // 添加购物车
  onClick(e){
    console.log(e.detail)
    var that = this
    var spec = e.detail
    var specNum =['','','','','']
    for(var i = 0;i < spec.length;i++){
      for(var n = 0;n < spec[i].con.length;n++){
        if(spec[i].con[n]){
          specNum[i] = spec[i].con[n].id
        }
      }
    }
    util.request(api.addCart,{
      uid:wx.getStorageSync('user').id,
      goods_num: e.detail.number,
      spec1:specNum[0],
      spec2:specNum[1],
      spec3:specNum[2],
      spec4:specNum[3],
      spec5:specNum[4],
      goods_id: that.data.data.id
    }).then(
      res => {
        if(res.data.retcode == 1){
          that.setData({
            cartId: res.data.data,
            flag: true
          })
        }
        util.msg(res.data.msg)
      }
    )
  },
  // 店铺
  shop(){
    wx.navigateTo({
      url: '/pages/shopDetails/shopDetails?id=' + this.data.data.store_id,
    })
  },
  // 收藏商品
  collectGoods(){
    var that = this
    util.request(api.collectGoods,{uid:wx.getStorageSync('user').id,goods_id: that.data.data.id}).then(
      res => {
        util.msg(res.data.msg)
        that.setData({
          collect: res.data.retcode
        })
        console.log(that.data.collect)
      }
    )
  },
  specs(){
    this.setData({
      flag: false
    })
  },
  close(){
    this.setData({
      flag: true
    })
  },
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
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