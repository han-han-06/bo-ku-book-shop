<template>
    <div>
        <div class="order-center ">
        <!-- 头部 -->
        <div class="registered-head">
            <div class="registered-heade_content">
                <div class="heade_content">
                    <div class="boku-logo">
                    <img class="boku-logo_img" src="../assets/images/logo.jpg">
                </div>
                <!-- <div class="boku-zhuce">欢迎登录</div> -->
                </div>
                <div @click="backHome" class="back-top">首页</div>
            </div>
        </div>
        <!-- 订单中心哦 -->
        <div class="my-order">我的订单</div>
        <!--下面是订单，每个订单分为头部和内容，内容还   得反图片  -->
        <div class="order-hea">
            <span>订单详情</span>
            <span style="margin-left:53px">数量</span>
            <span>金额</span>
            <span>地址</span>
            <span>订单状态</span>
            <!-- <span style="margin-right:53px">状态</span> -->
            <!-- 操作变成已完成的那种就好 -->
            <span style="margin-right:40px">操作</span>
        </div>
        <div v-if="arr.length">
            <div v-for="(item,index) in arr" :key="index" class="order-book_content">
                <!-- 头部 -->
                <div class="order-head">
                    <!-- 日期 -->
                    <span>日期：{{item.orderTime}}</span>
                    <span style="margin-left:20px">订单号：{{item.orderNumber}} </span>
                </div>
                <!-- 下面的内容 -->
                <div class="order-con">
                    <!-- 书的图片和内容 -->
                    <div class="shu-cont">
                        <div class="shu-cont_img">
                            <img :src="item.bookPicture">
                        </div>
                        <div class="shu-cont_info">
                            {{item.bookName}}
                        </div>
                    </div>
                    <!-- 图书数量 -->
                    <div style="margin-left:63px">
                        <span>{{item.bookCount}}</span>
                    </div>
                    <!-- 图书价格 -->
                    <div style="margin-left:155px;color:red;flex-shink:0">
                        <span>￥{{item.orderTotalPrice}}</span>
                    </div>
                    <!-- 地址 -->
                    <div style="margin-left:100px" class="dizhi">
                        <span>{{item.address}}</span>
                    </div>
                    <!-- 状态 -->
                    <div style="margin-left:100px;flex-warp:nowarp">
                        <span>{{item.orderStates}}</span>
                    </div>
                    
                    <div style="margin-left:180px;color:red">
                        <el-button type="text" :disabled="!(item.orderState==1)" @click="confirmReceipt(item)" style="color:red">去评价</el-button>
                        <!-- <el-button type="text">确认收货</el-button> -->
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="order-info">
            <span>暂无订单信息</span>
        </div>
        <div class="order-page">
                <!-- 分页 -->
                <!-- 哈哈哈 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.page"
                    :page-sizes="[20, 30, 40, 50]"
                    :page-size="pageInfo.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalOrder">
                </el-pagination>
            </div>
    </div>
    <div class="store-footer">
        <BookStoreFooter></BookStoreFooter>
    </div>
    </div>
</template>
<script>
import request from '../api/api'
export default {
    data() {
        return {
            arr:[1,2,3,4,5],
            pageInfo:{
                page:1,
                size:20
            },
            totalOrder:0
        }
    },
    created() {
        // 获取评论信息
        this.getComm()
    },
    // 
    methods:{
        getComm() {
            let {page,size} = this.pageInfo
            let userId = sessionStorage.getItem("userId")
            request.getOrderUser(page,size,userId).then(res =>{
                // console.log('res',res)
                this.arr = res.orderVOList
                this.arr.map(el =>{
                    if(el.orderState==0) {
                        el.orderStates = '未发货'
                    }else if(el.orderState==1) {
                        el.orderStates = '已发货'
                    }
                })
                this.totalOrder = res.count
            })
        },
        // 去评论
        confirmReceipt(item) {
        
            // 确认收货后跳转到评论页面
            this.$router.push(
                {name:'bookComment',
                params:{
                        item:item
                    }}) 
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
        // 返回首页
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
.registered-head {
    height: 120px;
    width: 100%;
    position: fixed;
    background-color: #fff;
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
.order-info {
    width: 100%;
    padding: 20px;
    text-align: center;
}
.order-hea {
    margin-top: 20px;
    padding: 10px 0 10px 20px;
    border:1px solid #e5e5e5 ;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
}
.order-book_content {
    margin-top: 20px;
    border: 1px solid #e5e5e5;
    padding-left: 1px;
    box-sizing: border-box;
}
.order-center {
    width: 1200px;
    margin: auto;
    .my-order {
        margin-top: 140px;
        padding-left: 20px;
        box-sizing: border-box;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        font-size: 14px;
        font-weight: 700;
    }
    .order-head {
        padding: 10px 20px;
        height: 20px;
        background-color: #f5f5f5;
        border-radius: 3px;
    }
    .order-con {
        padding:10px 20px;
        display: flex;
        // height: 150px;
        background-color: #fff;
        .shu-cont {
            display: flex;
            .shu-cont_img {
                width: 80px;
                img {
                    width: 100%;
                }
            }
            .shu-cont_info {
                margin-left: 30px;
                width: 180px;
                font-size: 15px;
            }
        }
        
        
    }
    .dizhi{
        // color: aquamarine;
        width: 100px;
    }
}
.back-top {
    line-height: 180px;
}
.back-top:hover {
    cursor: pointer;
    color: red;
}
.order-page {
    margin-top: 20px;
    text-align: right;
}
.store-footer {
    margin-top: 20px;
}
</style>