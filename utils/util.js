//公共js，主要做表单验证，以及基本方法封装
const utils = {
	isNullOrEmpty: function(value) {
		//是否为空
		return (value === null || value === '' || value === undefined) ? true : false;
	},
	trim: function(value) {
		//去空格
		return value.replace(/(^\s*)|(\s*$)/g, "");
	},
	isMobile: function(value) {
		//是否为手机号
		return /^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/.test(value);
	},
	isFloat: function(value) {
		//金额，只允许保留两位小数
		return /^([0-9]*[.]?[0-9])[0-9]{0,1}$/.test(value);
	},
	isNum: function(value) {
		//是否全为数字
		return /^[0-9]+$/.test(value);
	},
	checkPwd: function(value) {
		//密码为8~20位数字和字母组合
		return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value);
	},
	formatNum: function(num) {
		//格式化手机号码
		if (utils.isMobile(num)) {
			num = num.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
		}
		return num;
	},
	rmoney: function(money) {
		//金额格式化
		return parseFloat(money).toFixed(2).toString().split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(
			/\,$/, '').split('').reverse().join('');
  },
	formatDate: function(formatStr, fdate) {
		//日期格式化
		if (fdate) {
			if (~fdate.indexOf('.')) {
				fdate = fdate.substring(0, fdate.indexOf('.'));
			}
			fdate = fdate.toString().replace('T', ' ').replace(/\-/g, '/');
			var fTime, fStr = 'ymdhis';
			if (!formatStr)
				formatStr = "y-m-d h:i:s";
			if (fdate)
				fTime = new Date(fdate);
			else
				fTime = new Date();
			var month = fTime.getMonth() + 1;
			var day = fTime.getDate();
			var hours = fTime.getHours();
			var minu = fTime.getMinutes();
			var second = fTime.getSeconds();
			month = month < 10 ? '0' + month : month;
			day = day < 10 ? '0' + day : day;
			hours = hours < 10 ? ('0' + hours) : hours;
			minu = minu < 10 ? '0' + minu : minu;
			second = second < 10 ? '0' + second : second;
			var formatArr = [
				fTime.getFullYear().toString(),
				month.toString(),
				day.toString(),
				hours.toString(),
				minu.toString(),
				second.toString()
			]
			for (var i = 0; i < formatArr.length; i++) {
				formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
			}
			return formatStr;
		} else {
			return "";
		}
  },
  msg: function(title, duration=1500, mask=false, icon='none') {
    //统一提示方便全局修改
    if(Boolean(title) === false){
      return; 
    }
    wx.showToast({
      title,
      duration,
      mask,
      icon
    });
  }
}
/*
  封装的request
*/
// import api from '../utils/api.js'
// var token = wx.getStorageSync('token');
// var userId = wx.getStorageSync('userId');

function request(url, data = {}, method = "GET") {
	wx.showLoading({
		title: '请稍候...'
	})
	// console.log(data)
	// var set = JSON.stringify(data)
	// if (set.indexOf('user_id') != -1) {
	// 	url = url + '?token=' + wx.getStorageSync('token')
	// }
	return new Promise(function(resolve, reject) {
		wx.request({
			url: url,
			data: data,
			method: method,
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: res => {
				wx.hideLoading()
				resolve(res);
			},
			fail: error => {
				wx.hideLoading()
				reject(error);
			}
		})
	});
}
//时间戳转换
function conversiontime(timestamp) {
	var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = date.getDate() + ' ';
	var h = date.getHours() + ':';
	var m = date.getMinutes() + ':';
	var s = date.getSeconds();
	return Y + M + D + h + m + s;
}

// 时间戳差
function getDifValue(nowtimestamp, beforetimestamp) {
	return new Promise(function(resolve) {
		var difValue = (nowtimestamp*1000) - (beforetimestamp*1000);
		console.log('时间差',difValue)
		var day = Math.floor(difValue / 1000 / 60 / 60 / 24);//天
		difValue = difValue % (1000 * 60 * 60 * 24);
		var hour = Math.floor(difValue / 1000 / 60 / 60);//小时
		difValue = difValue % (1000 * 60 * 60);
		var min = Math.floor(difValue / 1000 / 60);//分钟
		difValue = difValue % (1000 * 60);
		var second = Math.floor(difValue / 1000);
		var data = {
			'day': day,
			'hour': hour,
			'min': min,
			'second': second
		}
		resolve(data)
	})
}
// 数组去重
function uniq(array){
    var temp = []; //一个新的临时数组
    for(var i = 0; i < array.length; i++){
        if(JSON.stringify(temp).indexOf(array[i].name) == -1){
            temp.push(array[i]);
        }
    }
    return temp;
}
//图片上传
function chooseImage(num){
	return new Promise(function(resolve, reject) {
		wx.chooseImage({
			count: num, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (resOne) {
				wx.uploadFile({  
					url: api.Uploads,  
					filePath: resOne.tempFilePaths[0],
					name:"images",
					formData: {},  
					success: (res) => {
						var data = res
						data.dataOne = resOne.tempFilePaths[0]
						resolve(res)
					},  
					fail: (err) => {  
						reject(err)  
					},  
				});  
			}
		});
	});
}

function requestPost(url, data = {}, method = "POST") {
	return new Promise(function(resolve, reject) {
		wx.request({
			url: url,
			data: data,
			method: method,
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: res => {
				resolve(res);
			},
			fail: error => {
				reject(error);
			}
		})
	});
}

function inage(data) {
	return encodeURIComponent(data)
}

// const fsm = wx.getFileSystemManager();
const FILE_BASE_NAME = 'tmp_base64src'; //自定义文件名

function base64src(base64data, cb) {
	const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64data) || [];
	if (!format) {
		return (new Error('ERROR_BASE64SRC_PARSE'));
	}
	const filePath = `${wx.env.USER_DATA_PATH}/${FILE_BASE_NAME}.${format}`;
	const buffer = wx.base64ToArrayBuffer(bodyData);
	fsm.writeFile({
		filePath,
		data: buffer,
		encoding: 'binary',
		success() {
			cb(filePath);
		},
		fail() {
			return (new Error('ERROR_BASE64SRC_WRITE'));
		},
	});
};
module.exports = {
	isNullOrEmpty: utils.isNullOrEmpty,
	trim: utils.trim,
	isMobile: utils.isMobile,
	isFloat: utils.isFloat,
	isNum: utils.isNum,
	checkPwd: utils.checkPwd,
	formatNum: utils.formatNum,
	rmoney: utils.rmoney,
  formatDate: utils.formatDate,
  msg: utils.msg,
	request: request,
	requestPost: requestPost,
	conversiontime: conversiontime,
	getDifValue: getDifValue,
	chooseImage: chooseImage,
	base64src: base64src,
	inage: inage,
	uniq: uniq,
}
