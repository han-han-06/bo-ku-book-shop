import axios from './js/request'
// import axios from 'axios'
export default {
    // 注册
    onRegister(data) {
        return axios.post('/loginRegist/user/regist', data)
    },
    // 获取信息
    getInfo() {
        return axios.get('/boku/dictionary/sex')
    },
    // 登录
    logIn(data) {
        return axios.post('/loginRegist/user/login',data)
    },
    // 修改的获取
    upload(data) {
        return axios.post('/bokustore/book/upload',data)
    },
    // 新增
    addBook(data) {
        return axios.post('/bokustore/book/addBook',data)
    },
    // 删除
    deleteBook(bookId) {
        return axios.post(`/bokustore/book/deleteBook/${bookId}`)
    },
    // 根据商家id查询图书信息 GET /bokustore/book/book1s/{adminId}
    getListInfo(page,size,adminId) {
        // let {adminId} = data
        return axios.get(`/bokustore/book/book1s/${page}/${size}/${adminId}`)
    },
    // 获取修改信息
    getModify(bookId) {
        return axios.get(`/bokustore/book/singleDataBook/${bookId}`)
    },
    // 根据图书类别查询相应图书
    getDiffBook(category) {
        return axios.get(`bokustore/book/books/${category}`)
    },
    // 商家登录
    adminLogin(data) {
        return axios.post('/loginRegist/admin/login',data)
    },
    // 商家注册
    adminRegister({commit},data) {  
        return axios.post('/loginRegist/admin/regist',data)
    },
    // 修改的保存
    saveModifyFrom(bookId,data) {
        return axios.post(`/bokustore/book/modifyBook/${bookId}`,data)
    },
    // 加入购物车
    addShopCar(data) {
        return axios.post('/bokustore/cart/addToCart',data)
    },
    // 获取图书详情
    getBookDetail(bookId) {
        return axios.get(`bokustore/book/singleDataBook/${bookId}`)
    },
    // 获取图书评论
    getBookCom(bookId) {
        return axios.get(`bokustore/comment/comments/${bookId}`)
    },
    // 获取购物车信息
    getCarMess(customId) {
        return axios.get(`/bokustore/cart/allCart/${customId}`)
    },
    // 获取首页信息
    getHomeInfo(page,size) {
        return axios.get(`/bokustore/book/firstPage/${page}/${size}`)
    },
    // 添加购物车
    addToCar(data) {
        return axios.post(`/bokustore/cart/addToCart`,data)
    },
    // 根据顾客id和图书id集合查出已选中商品的信息，并显示在结账页
    getOrderInfo(data) {
        return axios.get(`/bokustore/order/findBookToSettleAccountPage`,data)
    },
    // GET 根据订单号查询订单
    getOrder() {
        return axios.get(`/bokustore/order/queryOrderByOrderNum/${orderNumber}`)
    },
    // 根据用户id查询订单
    getOrderUser(page,size,userId) {
        return axios.get(`/bokustore/order/queryOrderByUserId/${page}/${size}/${userId}`)
    },
    // 保存订单
    savaOrder(data) {
        return axios.post(`/bokustore/order/saveBooksToOrder`,data)
    },
    // 添加评论
    addComments(data) {
        return axios.post(` /bokustore/comment/addComments`,data)
    },
    // 根据bookId查询评论信息
    viewComments(bookId) {
        return axios.get(`/bokustore/comment/comments/${bookId}`)
    },
    // 删除购物车中的商品 
    deleteCarInfo(customId,bookId,data) {
        return axios.post(`/bokustore/cart/deleteCartBook/${customId}/${bookId}`,data)
    },
    // 修改购物车中的商品
    modifyCarInfo() {
        return axios.post(`/bokustore/cart/modifyCartBook`,data)
    },
    // 根据用户id查询收获地址
    getAddressId(userId) {
        return axios.get(`/bokustore/address/findOrderListByUserId/${userId}`)
    },
    // 通过地址id查询收货地址
    getAddress(addressId) {
        return axios.get(`/bokustore/address/findByAddressId/${addressId}`)
    },
    // 删除收获地址
    delAddress(addressId) {
        return axios.post(`/bokustore/address/deleteAddress/${addressId}`)
    },
    // 添加收获地址
    addAddressHs(data) {
        return axios.post(`/bokustore/address/addAddress`,data)
    },
}