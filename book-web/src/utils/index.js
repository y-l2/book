import { post,get,newPost,put,del,gets,postRequest } from './ajax'

// 线上环境地址
export const baseUrl = 'http://localhost:3017'

// 注册账号
export const register = data => post(`${baseUrl}/register`, data);

// 登录账号
export const login = data => post(`${baseUrl}/login`, data);


//产品分类列表
export const getCategoriesList = (data) => post(`${baseUrl}/categories`, data);

//添加分类
export const addCategory = (data) => post(`${baseUrl}/category/create`, data);

//编辑分类
export const editCategory = (data) => post(`${baseUrl}/category/edit`, data );

//删除分类
export const delectCategory = (data) => post(`${baseUrl}/category`, data)



//商品列表
export const getGoodsList = (data) => post(`${baseUrl}/goods/list`, data)

//商品详情
export const getGoodsdetail = (data) => post(`${baseUrl}/goods/detail`, data)

//添加商品
export const addGoods = (data) => post(`${baseUrl}/goods/create` , data)

//编辑商品
export const editGoods = (data) => post(`${baseUrl}/goods/edit`, data)

//删除商品
export const delectGoods = (data) => post(`${baseUrl}/goods/delete`, data)



//获取地址列表
export const getAddressList = (data) => post(`${baseUrl}/address`, data)

//添加地址
export const addAddress = (data) => post(`${baseUrl}/address/create` , data)

//编辑地址
export const editAddress = (data) => post(`${baseUrl}/address/edit`, data)

//删除地址
export const delectAddress = (data) => post(`${baseUrl}/address/delete`, data)



//获取商品详情
export const getGoodsDetail = (data) => post(`${baseUrl}/goods/` + data.id)


//获取订单列表
export const getOrderList = (data) => post(`${baseUrl}/orders` , data)

//创建订单
export const createOrder =  (data) => post(`${baseUrl}/order` , data)

//改变订单状态
export const orderStatus =  (data) => post(`${baseUrl}/order/status` , data)



