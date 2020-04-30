// 显示遮罩层
var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
Page({
  data: {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},
    type:'1',
    flag: true,
    getService:[],
    indexOne: 0,
    id:'',
    money: '',
    textarea:'',
    img:[],
    imgId:[],
    orderId:'',
    text:'请选择'
  },
  service(e){
    this.setData({
      indexOne: e.currentTarget.dataset.index,
      id: e.currentTarget.dataset.id,
      text: e.currentTarget.dataset.info
    })
  },
  textarea(e){
    this.setData({
      textarea: e.detail.value
    })
  },
  onLoad(options){
    var that = this
    this.setData({
      orderId: options.id
    })
    util.request(api.getService,{}).then(
      res =>{
        that.setData({
          getService: res.data.data
        })
      }
    )
  },
  // 上传凭证
  cardIdImg(e){
    var that = this
    var img = this.data.img
    var index = e.currentTarget.dataset.index
    var imgId = this.data.imgId
    util.chooseImage().then(
      res =>{
        if(index == 99){
          img.push(res.dataOne)
          imgId.push(JSON.parse(res.data).data)
          that.setData({
            img: img,
            imgId: imgId
          })
        } else{
          img[index] = res.dataOne
          imgId[index] = JSON.parse(res.data).data
          that.setData({
            img: img,
            imgId: imgId
          })
        }
      }
    )
  },
  // 提交
  submit(){
    var that = this
    util.request(api.orderService,{
      order_id: that.data.orderId,
      uid: wx.getStorageSync('user').id,
      type: that.data.type,
      money: that.data.money,
      tui_id: that.data.id,
      remark: that.data.textarea,
      tui_img: that.data.imgId.join(","),
    }).then(
      res =>{
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
  input(e){
    this.setData({
      money: e.detail.value
    })
  },
  onXza(e){
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },
  hideModal(){
    this.setData({
      flag: true
    })
    
  },
  showModal(){
    this.setData({
      flag: false
    })
  }
})
