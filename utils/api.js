
var host = "http://symc.shengguweb.com";   //本地测试地址
var hostApi = "http://symc.shengguweb.com/index.php/index";  //本地测试地址
 
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
  getUserinfo: hostApi + "/user/getUserinfo", // 根据分类ID获取商品列表
  addCart: hostApi + "/cart/addCart", // 根据分类ID获取商品列表
  getCartList: hostApi + "/cart/getCartList", // 根据分类ID获取商品列表
 }