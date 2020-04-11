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
    deleteBook(data) {
        return axios.post('/bokustore/book/deleteBook',data)
    },
    // 根据商家id查询图书信息 GET /bokustore/book/book1s/{adminId}
    getListInfo(data) {
        let {adminId} = data
        return axios.get(`/bokustore/book/book1s/${adminId}`)
    },
    // 获取修改信息
    getModify(bookId) {
        return axios.get(`/bokustore/book/singleDataBook/${bookId}`)
    },
    // 根据图书类别查询相应图书
    getDiffBook(category) {
        return axios.get(`bokustore/book/books/${category}`)
    } 
    
}