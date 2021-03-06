
var host = "https://symc.shengguweb.com";   //本地测试地址
var hostApi = "https://symc.shengguweb.com/index.php/index";  //本地测试地址
 
 module.exports = {
	host: host,
	login: hostApi + "/index/login",
  sendSms: hostApi + "/index/sendSms", //验证码
  getScrollinggraph: hostApi + "/index/getScrollinggraph", //首页轮播
  getNoticeList: hostApi + "/index/getNoticeList", //首页公告
  getOneCategoryList: hostApi + "/index/getOneCategoryList", //一级分类 仓库
  GetPopularityList: hostApi + "/index/GetPopularityList", //获取人气产品
  GetNewGoodsList: hostApi + "/index/GetNewGoodsList", //首页新品上市
  getStoreList: hostApi + "/store/getStoreList", //店铺list
  getStoreGoodsList: hostApi + "/store/getStoreGoodsList", //店铺list
  collectStore: hostApi + "/user/collectStore", //店铺收藏/取消收藏
  GetSetmealList: hostApi + "/index/GetSetmealList", //获取套餐礼包
  getFirstUserCouponList: hostApi + "/user/getFirstUserCouponList", //首页弹窗优惠券
  GetCouponList: hostApi + "/index/GetCouponList", //优惠券商品
  getSeckillList: hostApi + "/index/getSeckillList", // 秒杀产品
  aboutStore: hostApi + "/store/aboutStore", // 关于店铺
  getGoodsDetailInfo: hostApi + "/index/getGoodsDetailInfo", // 商品详情
  collectGoods: hostApi + "/user/collectGoods", // 收藏商品
  getTwoCategoryList: hostApi + "/index/getTwoCategoryList", // 二级分类
  getThreeCategoryList: hostApi + "/index/getThreeCategoryList", // 三级分类
  getCategroyGoodsLsit: hostApi + "/index/getCategroyGoodsLsit", // 根据分类ID获取商品列表
  getUserinfo: hostApi + "/user/getUserinfo", // 获取个人信息
  addCart: hostApi + "/cart/addCart", // 添加购购物车
  getCartList: hostApi + "/cart/getCartList", // 获取购物车
  collectGoodsList: hostApi + "/user/collectGoodsList", // 收藏商品列表
  collectStoreList: hostApi + "/user/collectStoreList", // 收藏店铺列表
  getUserCommission: hostApi + "/user/getUserCommission", // 收支明细详情
  getUserIntegral: hostApi + "/user/getUserIntegral",   //积分明细
  modifyCart: hostApi + "/cart/modifyCart",   //修改购物车
  getUserCouponList: hostApi + "/user/getUserCouponList",   //我的优惠券
  Applicationshop: hostApi + "/index/Applicationshop",   //商家入驻提交申请
  vueSaveUserShip: hostApi + "/user/vueSaveUserShip",   //添加收货地址
  Selarea: hostApi + "/user/Selarea",   // 获取省市区
  getUserShip: hostApi + "/user/getUserShip",   // 获取省市区
  removeShip: hostApi + "/user/removeShip",   // 删除地址
  editShip: hostApi + "/user/editShip",   // 编辑收货地址
  newupload: hostApi + "/index/newupload",   // 图片上传
  updShip: hostApi + "/user/updShip",   // 修改默认地址
  cartdetial: hostApi + "/cart/cartdetial",   // 购物车详情
  getShipdef: hostApi + "/user/getShipdef",   // 获取用户默认收货地址
  chkcartnum: hostApi + "/cart/chkcartnum",   // 获取购物车数量
  getOrderList: hostApi + "/order/getOrderList",   // 获取订单列表
  PayOrder: hostApi + "/order/PayOrder",   // 生成支付订单
  about: hostApi + "/index/about",   // 关于我们
  getOrderdetail: hostApi + "/order/getOrderdetail",   // 订单详情
  addBank: hostApi + "/index/addBank",   // 添加银行卡
  editBank: hostApi + "/index/editBank",   // 编辑银行卡
  GetbankList: hostApi + "/index/GetbankList",   // 银行卡列表
  postApplycash: hostApi + "/user/postApplycash",   // 申请提现
  jifen: hostApi + "/index/jifen",   // 积分说明
  delOrder: hostApi + "/order/delOrder",   // 积分说明
  Selspec: hostApi + "/index/Selspec",   // 根据规格查询商品库存价格
  yongjin: hostApi + "/index/yongjin",   // 佣金说明
  SelGoods: hostApi + "/index/SelGoods",   // 佣金说明
  orderService: hostApi + "/order/orderService",   // 申请售后
  getService: hostApi + "/order/getService",   // 获取退款原因
  removeService: hostApi + "/order/removeService",   // 取消售后
  chkyaoqing: hostApi + "/index/chkyaoqing",   // 是否隐藏邀请码
  store_erweima: hostApi + "/store/store_erweima",   // 店铺生成二维码
  isLogin: hostApi + "/index/isLogin",   // 是否强制登录
  teamuser: hostApi + "/user/teamuser",   // 是否强制登录
 }