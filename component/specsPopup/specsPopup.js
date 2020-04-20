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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    number:1,
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
            console.log(spec[index].con[n].type)
          }
          if( n + 1 == spec[index].con.length){
            that.setData({
              spec: spec
            })
          }
        }
    },
    onClick(){
      console.log('这行了嘛')
      var spec = this.data.spec
      spec.number = this.data.number
      this.triggerEvent('onClick',spec)
    },
    onAdd(){
      console.log(this.data.number++)
      this.setData({
        number: this.data.number++
      })
    },
    reduce(){
      if(this.data.number > 1){
        this.setData({
          number: this.data.number--
        })
      }
    }
  }
})