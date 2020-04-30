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
    type:'',
    num: 1,
    stock:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.goodsDetails(options.id)
  },
  // 商品详情
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
            price: res.data.data.info.price,
            stock: res.data.data.info.stock
          })
        }
      }
    )
  },
  // 获取购物车数量
  onSpec(e){
    var that = this
    var spec = e.detail
    var specNum =['','','','','']
    var num = 0
    for(var i = 0;i < spec.length;i++){
      for(var n = 0;n < spec[i].con.length;n++){
        if(spec[i].con[n].type){
          num++
          specNum[i] = spec[i].con[n].id
        }
      }
    }
    if(num != that.data.spec.length){
      return 
    }
    util.request(api.chkcartnum,{
      uid:wx.getStorageSync('user').id,
      spec1:specNum[0],
      spec2:specNum[1],
      spec3:specNum[2],
      spec4:specNum[3],
      spec5:specNum[4],
      goods_id: that.data.data.id
    }).then(
      res => {
        if(res.data.retcode == 1){
          if(res.data.data == 0){
            that.setData({
              num:1
            })
          }else{
            that.setData({
              num: res.data.data
            })
          }
        }
      }
    ),
    // 不同规格不同价格
    util.request(api.Selspec,{
      uid:wx.getStorageSync('user').id,
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
            stock: res.data.data[0].stock,
            price: res.data.data[0].price
          })
        }
      }
    )
  },
  // 添加购物车
  onClick(e){
    var that = this
    var type = this.data.type
    var spec = e.detail
    var specNum =['','','','','']
    var num = 0
    for(var i = 0;i < spec.length;i++){
      for(var n = 0;n < spec[i].con.length;n++){
        if(spec[i].con[n].type){
          num++
          specNum[i] = spec[i].con[n].id
        }
      }
    }
    if(num != that.data.spec.length){
      return util.msg('请选择规格')
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
          if(type == 1){
            wx.navigateTo({
              url: '/pages/selectdeliveryaddress/selectdeliveryaddress?id=' + res.data.data,
            })
          }
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
  index(){
    wx.switchTab({  
      url:'/pages/index/index'
    });  
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
  specs(e){
    this.setData({
      flag: false,
      type: e.currentTarget.dataset.type
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