<template>
<div>
    <div class="cart-header">
            <!-- 头部 -->
            <div class="registered-head">
                <div class="registered-heade_content">
                    <div class="heade_content">
                        <div class="boku-logo">
                        <img class="boku-logo_img" src="../assets/images/logo.jpg">
                    </div>
                    <!-- <div class="boku-zhuce">欢迎光临</div> -->
                    </div>
                    <div @click="backHome" class="back-top">首页</div>
                </div>
            </div>
        </div>
    <!-- 每本图书详情页 -->
    <div class="book-info">
        <!-- 上部分，放书的东西 -->
        <div class="book-info—top">
            <!-- 每本书的图片左边 -->
            <div class="info—top_left">
                <div class="big-img" v-if="flag">
                    <!-- 应该给个宽和高，要不他动不了 -->
                    <pic-zoom :url="bookInfo.mainPic.pictureUrl" :scale="2"></pic-zoom>
                </div>
            </div>
            <!-- 每本书的右边，分为三部分，简介，（价格，作者，），（加入购物车） -->
            <div class="info—top_right">
                <div class="book-introduction">
                    <!-- 这是这的题目 -->
                    <h5 class="book-introduction_title">{{bookInfo.bookName}}</h5>
                    <!-- 这里放化妆产品的使用方法 -->
                    <h6 class="book-introduction_con">
                        <!-- 作者 -->
                        <span style="color:#005aa0">{{bookInfo.bookAuthor}}</span> 
                        <!-- 出版社 -->
                        <span style="color:#666">{{bookInfo.bookPublish}}</span>
                        <!-- 出版时间 -->
                        <span style="color:#666">{{bookInfo.bookPublishTime}}</span>
                    </h6>
                    <!-- 图书内容  -->
                    <div class="neir" style="color:#999">
                        {{bookInfo.bookDetail}}
                    </div>
                </div>
                <div class="bool-price">
                    <!-- 价格 -->
                    <div>
                        当前价格：<span style="color:red">￥ {{bookInfo.bookNewPrice}}</span> 元
                    </div>
                    当前库存数量<span style="color:red"> {{bookInfo.stockCount}}</span> 本
                </div>
                <div class="shop-car">
                    <!-- 购物车 -->
                    <div class="add-num">
                        <!-- ++ -->
                        <span class="el-icon-circle-plus-outline" @click="purchaseQuantity++"></span>
                        <!-- 购买数量 -->
                        <span class="num-inp">{{purchaseQuantity}}</span>
                        <!-- 减减 -->
                        <span class="el-icon-remove-outline" @click="subNum"></span>
                    </div>
                    <!-- 购买数量{{purchaseQuantity}} -->
                    <div class="add-btn">
                        <div @click="addCart" class="join-car">加入购物车</div>
                        <div @click="immediateBuy" class="immedia-buy">立即购买</div>
                    </div>
                </div>
                <!--  -->
            </div>
        </div>
        <!-- 中间每本书的图片，详情啥的 -->
        <div class="book-info—middle">
            <!-- 产品特色 -->
            <span style="">
                <img src="../assets/images/tese.png">
                <img class='hengxian' src="../assets/images/line.jpg">
            </span>
            <!-- 图片详情 -->
            <span style="margin-left:20px">
                <span>{{bookInfo.bookDetail}}</span>
                <!-- <img src="../assets/images/detail.jpg"> -->
            </span>
        </div>
        <!--下部分，评论区，放各种言论，只是展示的作用，没有别的作用  -->
        <!--  -->
        <!-- 评论应该分为头部，内容和分页 -->
        <div class="book-info_comments">
            <!-- 分为全部，好评，差评，都可以点击的那种，还有晒图么，到时候商量一下去 -->
            <div class="comments-head">
                <span>商品评价</span>
                <!-- <div>全部（2222）</div> -->
                <!-- <div class="pinglun">好评（222）</div>
                <div>差评（555）</div> -->
            </div>
            <div class="comments-content">
                <div v-for="(item,index) in commentsList" :key="index" class="comments-info">
                    <div class="block">
                    <el-rate
                        v-model="item.commentStar"
                        disabled
                        :colors="colors">
                    </el-rate>
                    <!-- 这是日期 -->
                    <div class="comment-riqi">
                        <span>{{item.commentTime}}</span>
                    </div>
                     <div class="comment-pro">
                         <span>评论人</span>
                        <span>{{item.commentPerson}}</span>
                    </div>
                    </div>
                    <div>
                        {{item.commentContent}}
                    </div>
                    <!-- 这是日期 -->
                </div>
            </div>
            <div class="comments-foot">
                <!-- 分页 -->
                <!-- 哈哈哈 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.page"
                    :page-sizes="[20, 30, 40, 50]"
                    :page-size="pageInfo.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalComment">
                </el-pagination>
            </div>
        </div>
    </div>
    <!-- -->
    <BookStoreFooter></BookStoreFooter>
</div>
</template>
<script>
import request from '../api/api'
import PicZoom from 'vue-piczoom'
export default {
    data() {
        return {
            // 每本书的详情
            bookInfo:{},
            // 加购的数量
            purchaseQuantity:0,
            // 评论总数
            totalComment:2000,
            pageInfo:{
                page:1,
                size:20
            },
            commentsList:[],
            // 这里绑定的值跟随星走，
            value2: null,
            // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            // 图书id
            id:"",
            // 避免一开始获取的时候渲染不到
            flag:false
            // 商品图片
            // shopPic:[]
        }
    },
    watch:{
        value2:function(value) {
            console.log('value',value)
        }
    },
    created() {
        // 获取图书id
        this.id = sessionStorage.getItem("bookId")
        let userId = sessionStorage.getItem("userId")
        console.log('id',this.id)
        console.log('userId',userId)
        // 获取图书详情
        this.getBook(this.id)
        // 根据id查询单条数据
        // this.commentsList.map(el =>{
        //     // 
        //     el.starLevel = 1
        // })
        // 获取评论
        this.getComments()
    },
    // 引入放大镜
    components: {
        PicZoom
    },
    methods:{
        // 获取评论
        getComments() {
            let bookId = this.id
            let {page,size} = this.pageInfo
            // 获取图书评论
            request.viewComments(page,size,bookId).then(res =>{
                // 获取相应的评论，去掉那句话
                this.commentsList = res.commentVOS
                this.totalComment = res.count
                console.log('commentsList',this.commentsList)
            })  
        },
        // 获取单条数据
        getBook() {
            request.getBookDetail(this.id).then(res =>{
                console.log('res图书详情',res)
                let arr = []
                res.bookPictures.some(el =>{
                    if(el.mainPic) {
                        arr =  el
                    }
                })
                res.mainPic = arr
                console.log('arr',arr)
                this.flag = true
                this.bookInfo = res
                console.log('bookInfo',this.bookInfo)
            })
        },
        // 加入购物车
        addCart() {
            // count数
            let bookCount = this.purchaseQuantity
            if(!bookCount) {
                this.$commonUtils.setMessage('warning','请选择加购数量')
                return
            }
            let userId = sessionStorage.getItem("userId")
            // console.log('userId',userId)
            // 这里应该先校验一下(比如是否登录啥的，然后再加入购物车。如果没登录，应该弹出登录/注册的页面)
            if(userId) {
                // 获取用户id
                let customId = sessionStorage.getItem("userId")
                // 获取图书id
                let bookId = this.id
                let data = {bookCount,customId,bookId}
                request.addShopCar(data).then(res =>{
                    console.log('加购成功')
                    this.$commonUtils.setMessage('success','加入成功')
                })
            }else {
                this.$commonUtils.setMessage('warning','请先登录')
            }
        },
        // 立即购买
        immediateBuy() {
            console.log('bookInfo',this.bookInfo)
            let bookId = this.bookInfo.bookId
            let count = this.purchaseQuantity
            let userId = sessionStorage.getItem("userId")
            let data = {bookId,count,userId}
            console.log('data',data)
            if(!userId) {
                this.$commonUtils.setMessage('warning','请先登录')
            }else if(!count) {
                this.$commonUtils.setMessage('warning','请选择购买数量')
            }else {
                request.outrightPurchase(data).then(res =>{
                    console.log(2222,res)
                    let address = res.address
                    let arr = [res]
                    arr = JSON.stringify(arr)
                    sessionStorage.setItem("payInfo", arr);
                    sessionStorage.setItem("address", JSON.stringify(address));
                    // console.log('res结账',arr)
                    // 先校验。没问题这里需要跳转到订单那里么
                    this.$router.push(
                        {name:'purchaseInfo'}
                    )
            })
            }
            
            
        },
        // 减数量
        subNum() {
            if(this.purchaseQuantity > 0) this.purchaseQuantity--
        },
        // 每页多少条
        handleSizeChange(val) {
            console.log('每页多少条',val)
            this.pageInfo.size = val
        },
        // 点击的是第几页
        handleCurrentChange(val) {
            console.log('当前页',val)
            this.pageInfo.page = val
        },
        backHome () {
            this.$router.push(
                {
                    name:"bookStoreHome"
                }
            )
        } 
    }
}
</script>
<style scoped lang='scss'>
* {
    margin: 0;
    padding: 0;
}

.registered-head {
    height: 120px;
    width: 100%;
    position: fixed;
    background-color: #fff;
    z-index: 6;
    left: 0;
    top: 0;
    box-shadow:0px 5px 10px 0px #e5e7eb;
    display: flex;
    justify-content: space-between;
    // 
    .registered-heade_content {
        height: 100%;
        width: 1200px;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        .heade_content {
            display: flex;
            .boku-logo { 
            margin-right: 20px;
            height: 100%;
            font: 20px Arial,Verdana;
            color: #EB4C44;
            line-height: 150px;
            .boku-logo_img {
                margin-top: 43px;
            }
        } 
        .boku-zhuce {
            font: 20px Arial,Verdana;
            color: #666;
            margin-top: 70px;
        }
        }
    }
}
.back-top {
    line-height: 180px;
}
.back-top:hover {
    cursor: pointer;
    color: red;
}
.book-info {
    width: 1200px;
    margin: auto;
    // height: 1200px;
    margin-top: 200px;
    border: 1px solid #ccc;
    .book-info—top {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        .info-img {
            // background-color: pink;
            // border: 1px solid pink;
            height: 350px;
            width: 350px;
        }
        .info—top_right {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            // background-color: pink;
            .book-introduction {
                padding-top: 10px;
                width: 100%;
                // border: 1px solid gold;
                .book-introduction_title {
                    margin: 0 5px;
                    color: #666;
                    font-weight: 700;
                }
                .neir {
                    padding: 0 10px 10px 10px;
                }
                .book-introduction_con {
                    margin: 10px 5px;
                }
            }
            .bool-price {
                width: 100%;
                padding: 20px 0;
                padding-left: 15px;
                box-sizing: border-box;
                border: 1px solid #ccc;
            }
            .shop-car {
                // border: 1px solid steelblue;
                .add-num {
                    padding-left: 15px;
                    padding-top: 10px;
                    .el-icon-circle-plus-outline {
                        // font-size: 16px;
                        padding: 0 5px;
                    }
                    .el-icon-circle-plus-outline:hover {
                        cursor: pointer;
                    }
                    .el-icon-remove-outline {
                        padding: 0 5px;
                    }
                    .el-icon-remove-outline:hover {
                        cursor: pointer;
                    }
                    .num-inp {
                        display: inline-block;
                        width: 70px;
                        height: 25px;
                        border: 1px solid #ccc;
                        box-sizing: border-box;
                        border-radius: 3px;
                        padding-left: 5px;
                    }
                }
                .add-btn {
                    margin-top: 20px;
                    margin-bottom: 20px;
                    display: flex;
                    padding-left: 15px;
                    // 加入购物车
                    .join-car {
                        width: 90px;
                        font-size: 15px;
                        text-align: center;
                        height: 20px;
                        padding: 5px 0;
                        border: 1px solid #ccc;
                        margin-right: 10px;
                        // 
                    }
                    .join-car:hover {
                        cursor: pointer;
                    }
                    .immedia-buy:hover {
                        cursor: pointer;
                    }
                    // 立即购买按钮
                    .immedia-buy {
                        width: 70px;
                        text-align: center;
                        height: 20px;
                        font-size: 14px;
                        color: #fff;
                        padding: 5px 0;
                        border-radius: 3px;
                        background-color: red;
                        border: 1px solid #ccc;
                    }
                }
            }
        }
    }
    .book-info—middle {
        margin-top: 20px;
        // border: 1px solid aquamarine;
        display: flex;
        margin-left: 15px;
        flex-direction: column;
        .hengxian {
            margin-bottom: 2px;
            margin-left: -12px;
        }
        // height: 200px;
    }
    .book-info_comments {
        margin-top: 20px;
        width: 100%;
        // margin-left: 15px;
        // border: 1px solid wheat;
        .comments-head {
            display: flex;
            height: 60px;
            line-height: 60px;
            background-color: #fff;
            margin-left: 15px;
            margin-bottom: 20px;
            .pinglun {
                margin: 0 20px;
            }
        }
        .comments-content {
            padding-left: 15px;
            box-sizing: border-box;
            .block {
                display: flex;
                padding: 10px 0;
            }
            .comments-info {
                // height: 200px;
                padding: 5px 0 20px 5px;
                background-color: #fff;
                border-bottom: 1px solid #ccc;
                margin-bottom: 10px;
            }
            .comment-riqi {
                color: #cccccc;
                margin-left: 40px;
                margin-right: 50px;
            }
            .comment-pro {
                color: #cccccc;
                // margin-left: 40px;
                // margin-right: 10px;
            }
        };
    }
    .comments-foot {
        padding: 20px 0;
        text-align: right;
    }
    .big-img  {
        height: 300px;
        width: 300px;
        border: 1px solid #ccc;
    }
}
</style>