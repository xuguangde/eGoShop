// pages/myorder/myorder.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var page = 1
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchText:[
      {text:'全部',id:'5'},
      {text:'待付款',id:'0'},
      {text:'待发货',id:'1'},
      {text:'待收货',id:'2'},
      {text:'已完成',id:'3'},
      {text:'售后',id:'4'},
    ],
    type:0,
    orderList:[],
    switchIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    page = 1
    this.setData({
      type: options.type
    })
    switch (Number(options.type)) {
      case 5:
        that.setData({
          switchIndex: 0
        })
        break;
      case 4:
        that.setData({
          switchIndex: 5
        })
        break;
      case 3:
        that.setData({
          switchIndex: 4
        })
        break;
      case 2:
        that.setData({
          switchIndex: 3
        })
        break;
      case 1:
        that.setData({
          switchIndex: 2
        })
        break;
      case 0:
        that.setData({
          switchIndex: 1
        })
        break;
      default:
        break;
    }
    this.getOrderList()
  },
  // 订单详情
  order(e){
    wx.navigateTo({
      url: '/pages/obligation/obligation?id=' + e.currentTarget.dataset.id,
    })
  },
  // 切换订单状态
  switch(e){
    this.setData({
      type: e.detail,
      orderList: []
    })
    page = 1
    this.getOrderList()
  },
  // 取消订单
  cancelOrder(e){
    var that = this
    wx.showModal({
      title: '取消确认',
      content: '确认要取消订单吗？',
      success (res) {
        if (res.confirm) {
          util.request(api.delOrder,{uid: wx.getStorageSync('user').id,id: e.currentTarget.dataset.id}).then(
            res =>{
              util.msg(res.data.msg)
              if(res.data.retcode == 1){
                console.log('这行了吗')
                that.setData({
                  orderList:[]
                })
                page = 1
                that.getOrderList()
              }
            }
          )
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
        }
    })
  },
  // 去付款
  payment(e){
    // wx.navigateTo({
    //   url: '/pages/selectdeliveryaddress/selectdeliveryaddress?id=' + e.currentTarget.dataset.id,
    // })
  },
  // 获取订单列表
  getOrderList(){
    var that = this
    util.request(api.getOrderList,{uid: wx.getStorageSync('user').id,status: that.data.type,page:page,limit: 30}).then(
      res => {
        if(res.data.retcode == 1){
          that.setData({
            orderList: that.data.orderList.concat(res.data.data)
          })
        } else{
          util.msg(res.data.msg)
        }
      }
    )
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
    page++
    this.getOrderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})