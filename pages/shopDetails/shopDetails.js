// pages/shopDetails/shopDetails.js
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:[
      {text:'店铺首页',img:'/img/sja56.png',imgOne:'/img/sjb56.png'},
      {text:'全部商品',img:'/img/qbspa56.png',imgOne:'/img/qbspb56.png'},
      {text:'新品上架',img:'/img/xpsja56.png',imgOne:'/img/xpsjb56.png'},
      {text:'店铺介绍',img:'/img/qyjja56.png',imgOne:'/img/qyjjb56.png'}
    ],
    status:'0',
    shopGoodsList:[],
    data:'',
    iconList:[
      {text:'',img:'/img/dpmc32.png',type: false},
      {text:'',img:'/img/lxdh32.png',type: true},
      {text:'',img:'/img/dz32.png',type: false}
    ],
    collect:'0',
    statusBar:'',
    date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.goodsList(options.id)  // 商品列表
    this.aboutStore(options.id) // 关于店铺
  },
  // 跳转商品
  goods(e){
    wx.navigateTo({
      url: '/pages/commodity/commodity?id='+ e.detail,
    })
  },
  aboutStore(id){
    util.request(api.aboutStore,{store_id: id,uid: wx.getStorageSync('user').id}).then(
      res => {
        this.data.iconList[0].text = res.data.data.store_name
        this.data.iconList[1].text = res.data.data.phone
        this.data.iconList[2].text = res.data.data.city_name + res.data.data.area_name + res.data.data.address
        this.setData({
          collect: res.data.data.collect,
          iconList: this.data.iconList,
          data: res.data.data
        })
      }
    )
  },
  // 下载到手机
  download(){
    util.request(api.store_erweima,{id: this.data.id}).then(
      res =>{
        if(res.data.retcode == 1){
          console.log(res)
          wx.downloadFile({
            url: api.host + res.data.data,
            success(res){
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
              })
            }
          })
        }
      }
    )
    
  },
  // 取消关注店铺
  collectStore(){
    util.request(api.collectStore,{store_id: this.data.data.id,uid: wx.getStorageSync('user').id}).then(
      res => {
        util.msg(res.data.msg)
        this.setData({
          collect: res.data.retcode
        })
      }
    ) 
  },
  goodsList(id){
    var that = this
    var is_t = ''
    var is_x = ''
    var sales = ''
    var top = ''
    if(that.data.status == 0){
      is_t = 1
      is_x = ''
      sales = ''
      top = ''
    } else if(that.data.status == 1){
      is_t = ''
      is_x = ''
      if(that.data.statusBar == 0){
        sales = ''
        top = ''
      } else if(that.data.statusBar == 1){
        sales = 1
        top = ''
      } else {
        sales = ''
        top = 1
      }
    } else if(that.data.status){
      is_t = ''
      sales = ''
      top = ''
      is_x = 1
    }
    util.request(api.getStoreGoodsList,{store_id:id,is_t:is_t,is_x:is_x,sales:sales,top:top}).then(
      res => {
        if(res.data.retcode == 1) {
          if(is_t != 1){
            that.setData({
              shopGoodsList: res.data.data[0].group,
              date: res.data.data[0].date
            })
          } else {
            console.log('这像女流氓',res.data.data)
            that.setData({
              shopGoodsList: res.data.data
            })
          }
        } else{
          util.msg(res.data.msg)
        }
      }
    )
  },
  // 切换选项
  onClick(e){
    this.setData({
      status: e.currentTarget.dataset.index
    })
    this.goodsList(this.data.data.id)
  },
  statusBar(e){
    this.setData({
      statusBar: e.detail
    })
    this.goodsList(this.data.data.id)
  },
  phoneCall(e){
    wx.makePhoneCall({
      phoneNumber: this.data.data.phone,
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