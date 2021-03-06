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
        // GET 
        return axios.post(`/bokustore/book/book1s/${page}/${size}/${adminId}`)
        // return axios.post(`/bokustore/book/searchBooks/${page}/${size}`,data)
    },
    // 获取修改信息
    getModify(bookId) {
        return axios.get(`/bokustore/book/singleDataBook/${bookId}`)
    },
    // 根据图书类别查询相应图书
    getDiffBook(page,size,category) {
        return axios.get(`/bokustore/book/books/${page}/${size}/${category}`)
    },
    // 商家登录
    adminLogin(data) {
        return axios.post('/loginRegist/admin/login',data)
    },
    // 商家注册
    adminRegister(data) {  
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
        return axios.get(`/bokustore/book/singleDataBook/${bookId}`)
    },
    // 获取图书评论
    getBookCom(bookId) {
        return axios.get(`bokustore/comment/comments/${bookId}`)
    },
    // 获取购物车信息
    getCarMess(page,size,customId) {
        return axios.get(`/bokustore/cart/allCart/${page}/${size}/${customId}`)
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
        return axios.post(`/bokustore/order/findBookToSettleAccountPage`,data)
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
        return axios.post(`/bokustore/comment/addComments`,data)
    },
    // 根据bookId查询评论信息
    viewComments(page,size,bookId) {
        return axios.get(`/bokustore/comment/comments/${page}/${size}/${bookId}`)
    },
    // 删除购物车中的商品 
    deleteCarInfo(customId,bookId,data) {
        return axios.post(`/bokustore/cart/deleteCartBook/${customId}/${bookId}`,data)
    },
    // 修改购物车中的商品
    modifyCarInfo(data) {
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
    // 模糊搜索书名
    searchBook(bookName) {
        return axios.get(`/bokustore/book/findBookByName/${bookName}`)
    },
    // 商品详情页面直接购买
    outrightPurchase(data) {
        return axios.post(`/bokustore/book/directBuyBook`,data)
    },
    // 销量图书排行前十
    getTopTenBooks() {
        return axios.get(`/bokustore/book/getTopTenBooks`) 
    },
    // 商家订单管理
    getOrder(page,size,data) {
        return axios.post(`/bokustore/order/searchBackOrderList/${page}/${size}`,data)
    },
    // 发货上架
    getDeliver(orderNumber) {
        return axios.get(`/bokustore/order/modifyOrderState/${orderNumber}`)
    },
    // 修改商家信息
    modifyBuyerInfo(data) {
        return axios.post(`/loginRegist/admin/saveAdminInfo`,data)
    },
    // 上架状态
    // GET 
    onPopstate(bookId,state) {
        // GET /bokustore/book/modifyGoodsState/{bookId}/{state
        return axios.get(`/bokustore/book/modifyGoodsState/${bookId}/${state}`)
    },
    // 修改用户信息并保存  POST /loginRegist/user/saveUserInfo
    onModifyCenter(data) {
        return axios.post(`/loginRegist/user/saveUserInfo`,data)
    },
    // 出版社字典表
    getPublisherInfo() {
        return axios.get(`/boku/dictionary/publisher`)
    },
    // 首页根据书名查询图书
    getHomeBook(page,size,data) {
        return axios.post(`/bokustore/book/searchBooks/${page}/${size}`,data)
    },
    // 商家后台根据书名或者作者搜索图书，还支持根据出版时间，价格区间搜索
    getHouTaiBook(page,size,adminId,data) {
        console.log('data',data)
        return axios.post(`/bokustore/book/backSearchBooks/${page}/${size}/${adminId}`,data)
    },
    // 查询商家信息
    getShangJia(page,size) {
        return axios.get(`/loginRegist/admin/findAdminList/${page}/${size}`)
    },
    // GET 
    getYongHu(page,size) {
        return axios.get(`/loginRegist/user/findUserList/${page}/${size}`)
    },
    // 删除商家
    getDele(adminId) {
        return axios.get(`/loginRegist/admin/deleteAdmin/${adminId}`)
    },
    // 删除用户信息
    getDeleteYong(userId) {
        return axios.get(`/loginRegist/user/deleteUser/${userId}`)
    }
}