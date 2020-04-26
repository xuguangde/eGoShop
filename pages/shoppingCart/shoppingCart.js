// pages/shoppingCart/shoppingCart.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var app = getApp().globalData;
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    type: false,
    totalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 购物车列表
  getCartList(){
    var that = this;
    util.request(api.getCartList,{
      uid: wx.getStorageSync('user').id,
      page:page,
      limit: app.limit
    }).then(
      res =>{
        if(res.data.retcode == 1){
          var cartList = []
          cartList = res.data.data
          for(var i = 0;i<cartList.length;i++){
            cartList[i].type = false
            for(var n = 0;n<cartList[i].list.length;n++){
              cartList[i].list[n].type = false
            }
          }
          that.setData({
            cartList: that.data.cartList.concat(cartList)
          })
          console.log(that.data.cartList)
        } else {
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 修改购物车
  modifyCart(cid,num){
    util.request(api.modifyCart,{cid: cid,goods_num: num}).then(
      res =>{
        if(res.data.retcode == 1){


        } else {
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 购物车减少
  reduce(e){
    var cid = e.currentTarget.dataset.id
    var cartList = this.data.cartList
    if(cartList[e.currentTarget.dataset.index].list[e.currentTarget.dataset.indexone].goods_num > 1){
      cartList[e.currentTarget.dataset.index].list[e.currentTarget.dataset.indexone].goods_num--
    }
    this.setData({
      cartList: cartList
    })
    this.modifyCart(cid,cartList[e.currentTarget.dataset.index].list[e.currentTarget.dataset.indexone].goods_num)
  },
  // 加入购物车
  goodsAdd(e){
    var cid = e.currentTarget.dataset.id
    var cartList = this.data.cartList
    cartList[e.currentTarget.dataset.index].list[e.currentTarget.dataset.indexone].goods_num ++
    this.setData({
      cartList: cartList
    })
    this.modifyCart(cid,cartList[e.currentTarget.dataset.index].list[e.currentTarget.dataset.indexone].goods_num)
  },
  // 店铺全选
  shopAll(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var cartList = that.data.cartList
    cartList[index].type = !cartList[index].type
    if(cartList[index].type){
      for(var i = 0;i<cartList[index].list.length;i++){
        cartList[index].list[i].type = true
      }
    } else{
      for(var i = 0;i<cartList[index].list.length;i++){
        cartList[index].list[i].type = !cartList[index].list[i].type
      }
    }
    this.setData({
      cartList: cartList
    })
    this.totalPrice()
  },
  // 选择结算商品
  goodsAll(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var indexOne = e.currentTarget.dataset.indexone
    var cartList = that.data.cartList
    console.log(indexOne)
    // cartList[index].type = !cartList[index].type
    cartList[index].list[indexOne].type = !cartList[index].list[indexOne].type
    // for(var i = 0;i<cartList[index].list.length;i++){
    //   cartList[index].list[i].type = !cartList[index].list[i].type
    // }
    this.setData({
      cartList: cartList
    })
    this.totalPrice()
  },
  // 全选
  all(){
    var that = this
    var type = this.data.type
    var cartList = that.data.cartList
    that.setData({
      type: !that.data.type
    })
    if(type){
      for(var i = 0;i<cartList.length;i++){
        cartList[i].type = false
        // console.log(cartList[i])
        for(var n = 0;n < cartList[i].list.length;n++){
          // console.log(cartList[i].list[n].type)
          cartList[i].list[n].type = false
        }
      }
    } else{
      for(var i = 0;i<cartList.length;i++){
        cartList[i].type = true
        for(var n = 0;n<cartList[i].list.length;n++){
          console.log("你好你好",cartList[i].list[n].type)
          cartList[i].list[n].type = true
        }
      }
    }
    that.setData({
      cartList: cartList
    })
    this.totalPrice()
  },
  // 价格计算
  totalPrice(){
    var that = this
    var cartList = that.data.cartList
    var price = 0
    for(var i = 0;i<cartList.length;i++){
      for(var n = 0;n < cartList[i].list.length;n++){
        if(cartList[i].list[n].type){
          price += Number(cartList[i].list[n].goods_price*cartList[i].list[n].goods_num)
        }
      }
    }
    that.setData({
      totalPrice: price
    })
  },
  // 删除购物车
  deleteCart(e){
    var that = this
    var cartList = this.data.cartList
    var index = e.currentTarget.dataset.index
    var cid = e.currentTarget.dataset.id
    var indexOne = e.currentTarget.dataset.indexone
    util.request(api.modifyCart,{cid: cid,goods_num: 0}).then(
      res =>{
        if(res.data.retcode == 1){
          if(cartList[index].list.length <= 1) {
            cartList.splice(index,1)
          } else{
            cartList[index].list.splice(indexOne,1)
          }
          that.setData({
            cartList: cartList
          })
        } else {
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 去结算
  settle(){
    var that = this
    var cartList = that.data.cartList
    var id = ''
    for(var i = 0;i<cartList.length;i++){
      for(var n = 0;n < cartList[i].list.length;n++){
        if(cartList[i].list[n].type){
          id = id.concat(cartList[i].list[n].id+',')
        }
      }
    }
    console.log(id.substr(0, id.length - 1))
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    page = 1
    this.setData({
      cartList:[]
    })
    this.getCartList()
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
    page++
    this.getCartList()
  },
})