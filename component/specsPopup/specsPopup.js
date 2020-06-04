Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spec: {
      type: Array,
      value: []
    },
    img_id:{
      type: String,
      value: ''
    },
    number:{
      type: Number,
      value: 1
    },
    price:{
      type: String,
      value: '0'
    },
    stock:{
      type: String,
      value: '0'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  observers:{
    'spec'(spec){
      var that = this
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close (){
      this.triggerEvent('close')
    },
    spec(e){
      var that = this
      var index = e.currentTarget.dataset.index
      var indexOne = e.currentTarget.dataset.indexone
      var spec = this.data.spec
        for(var n = 0;n < spec[index].con.length;n++){
          if(n != indexOne){
            spec[index].con[n].type = false
          } else{
            spec[index].con[n].type = true
          }
          if( n + 1 == spec[index].con.length){
            that.setData({
              spec: spec
            })
          }
        }
      this.triggerEvent('onSpec',this.data.spec)
    },
    onClick(){
      var spec = this.data.spec
      spec.number = this.data.number
      this.triggerEvent('onClick',spec)
    },
    // 加
    onAdd(){
      var num = this.data.number
      num++
      this.setData({
        number: num
      })
    },
    reduce(){
      if(this.data.number > 1){
        var num = this.data.number
        num--
        this.setData({
          number: num
        })
      }
    }
  }
})