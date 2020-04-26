var api = require("../../utils/api.js");
var util = require("../../utils/util.js");
var interval = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    start_time: {
      type: Number,
      value: 0
    },
    end_time:{
      type: Number,
      value: 0
    },
    timeTrue: {
      type: Boolean,
      value: true
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      clearInterval(interval);
    },
  },
  observers:{ 
    'start_time'(start_time) { 
      if(start_time > 0 && this.data.timeTrue){
        var that = this
        console.log('倒计时')
        util.getDifValue(this.data.end_time,this.data.start_time).then(
          res =>{
            clearInterval(interval);
            var ss = res.second;             
            var mm = res.min;
            var hh = res.hour;
            // var mm = 0
            // var ss = 5
            // var hh = 0
            interval = setInterval(function () {
              that.setData({
                timeTrue: false
              })
              if (ss < 1) {
                console.log("秒",ss)
                if(mm < 1){
                  ss = 0;
                } else {
                  ss = 60
                }
                if (mm < 1) {
                  if(hh < 1){
                    mm = 0
                  } else {
                    mm = 60
                  }
                  if (hh < 1 && mm < 1 && ss < 1) {
                    clearInterval(interval);
                    that.setData({
                      timeTrue: false
                    })
                    hh = 0;
                    ss = 0;
                    mm = 0;
                  } else{ 
                    hh--
                  }
                }
                mm--
              }
              ss--;
              console.log('777',hh,mm,ss)
              that.setData({
                hh: hh, 
                mm: mm, 
                ss: ss
              })
            }, 1000)
          }
        )
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    hh:0,
    ss:0,
    mm:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
  }
})