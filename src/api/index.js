// 当前这个模块：所有的API接口进行统一管理

// 引入二次封装的axios
import requests from './request'
import mockRequests from './mokeAjax'
// 三级联动的接口
// /api/product/getBaseCategoryList     get     无参数 
   // 发请求：axios发请求，返回结果是Promise对象
export const reqCategoryList= () => requests({url:'/product/getBaseCategoryList',method:'get'})

// 获取banner(Home首页轮播图接口)
export const reqBannerList=()=>mockRequests.get('/banner')
// 获取floor数据,floor数据也是mock数据
export const reqFloorList=()=>mockRequests.get('/floor')
// 获取搜索模块数据，地址：/api/list   请求方式：POST 参数：
// 当前这个函数需要接受外部传递参数 params代表给服务器传递的参数

export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'post',data: params})
// export const reqGetSearchInfo=(params)=>mockRequests({url:'/searchList',method:'post',data: params})
// 获取产品详情信息的接口 URL:/api/item/{ skuId }  请求方式：get
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})
// 将产品添加到购物车中
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
// 获取购物车列表接口 /api/cart/cartList get
export const reqCartList= ()=>requests({url:'/cart/cartList',method:'get'});
// 删除购物车产品的接口 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 修改商品选中状态 /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedByid=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 用户注册 /api/user/passport/register
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'})
// 登录  /api/user/passport/login method:post   phone,password
export const reqUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'})
// 获取用户信息【需要带着用户的token向服务器要信息】 /api/user/passport/auth/getUserInfo
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
// 退出登录 /api/user/passport/logout get
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'}) 
// 获取用户地址信息  /api/user/passport/logout
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 获取商品清单   /api/order/auth/trade
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'get'})
// 提交订单     /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
// 获取支付信息   /api/payment/weixin/createNative/{orderId}
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 获取支付订单状态  /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
// 获取个人中心的数据   /api/order/auth/{page}/{limit}
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})
