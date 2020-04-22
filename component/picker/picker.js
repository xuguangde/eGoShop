Page({
  data: {
    region: ['广东省', '深圳市', '龙华区'],
    customItem: ''
  },
  province: function (e) {
    console.log('选择地区', e.detail)
    this.setData({
      region: e.detail.value
    })
  }
})