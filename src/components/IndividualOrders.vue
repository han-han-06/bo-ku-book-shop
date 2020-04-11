<template>
    <div class="order-center ">
        <!-- 头部 -->
        <div class="registered-head">
            <div class="registered-heade_content">
                <div class="heade_content">
                    <div class="boku-logo">
                    <!-- <img class="boku-logo_img" src="../assets/images/logo.jpg"> -->
                </div>
                <div class="boku-zhuce">欢迎登录</div>
                </div>
            </div>
        </div>
        <!-- 订单中心哦 -->
        <div class="my-order">我的订单</div>
        <!--下面是订单，每个订单分为头部和内容，内容还得反图片  -->
        <div class="order-hea">
            <span>订单详情</span>
            <span style="margin-left:53px">数量</span>
            <span>金额</span>
            <span>收货人</span>
            <span style="margin-right:53px">状态</span>
            <!-- 操作变成已完成的那种就好 -->
            <!-- <span>操作</!-->
        </div>
        <div>
            <div v-for="(item,index) in arr" :key="index" class="order-book_content">
                <!-- 头部 -->
                <div class="order-head">
                    <!-- 日期 -->
                    <span>2020-04-11 20:20</span>
                    <span style="margin-left:20px">订单号：162489499</span>
                </div>
                <!-- 下面的内容 -->
                <div class="order-con">
                    <!-- 书的图片和内容 -->
                    <div class="shu-cont">
                        <div class="shu-cont_img">
                            <img src="../assets/images/order.jpg">
                        </div>
                        <div class="shu-cont_info">
                            这个是书的内容,这个是书的内容呢
                        </div>
                    </div>
                    <!-- 图书数量 -->
                    <div style="margin-left:63px">
                        <span>x2</span>
                    </div>
                    <!-- 图书价格 -->
                    <div style="margin-left:195px;color:red">
                        <span>总额 ￥22.22</span>
                    </div>
                    <!-- 收货人 -->
                    <div style="margin-left:200px">
                        <span>王涵</span>
                    </div>
                    <!-- 状态 -->
                    <div style="margin-left:229px">
                        <span>已完成</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            arr:[1,2,3,4,5]
        }
    },
    // 
    methods:{
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
.order-hea {
    margin-top: 20px;
    padding: 10px 0 10px 20px;
    border:1px solid #e5e5e5 ;
    display: flex;
    justify-content: space-between;
    background-color: #f5f5f5;
}
.order-book_content {
    margin-top: 20px;
    border: 1px solid #e5e5e5;
}
.order-center {
    width: 1200px;
    margin: auto;
    .my-order {
        margin-top: 140px;
        padding-left: 20px;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        background-color: #f5f5f5;
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
        // background-color: skyblue;
        .shu-cont {
            display: flex;
            .shu-cont_img {
                width: 80px;
                img {
                    width: 100%;
                }
            }
            .shu-cont_info {
                margin-left: 10px;
                width: 180px;
                font-size: 15px;
            }
        }
        
        
    }
}
</style>