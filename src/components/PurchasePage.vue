<template>
<!-- 结账页面 -->
    <div class="purchase-page">
        <div>
            <div class="purchase-page_head">
                <!--  -->
                <div>
                    <!-- <img class="boku-logo_img" src="../assets/images/logo.jpg"> -->
                    <span>结算页</span>
                </div>
            </div>
            <router-view v-if="!bbb"></router-view>
            <!-- 上面有个logo的页面头部 -->
            <p>填写并核对相应的订单信息</p>
            <div class="purchase-page_content" v-if="bbb">
                
                <!-- 收货人信息 -->
                <div class="purchase-consignee">
                    <div class="consignee-per">
                        <span>收货人信息</span>
                        <span @click="addAddress">新增收获地址</span>
                    </div>
                    <div class="consignee-content">
                        <div>
                            <!-- 放用户名和手机号 -->
                            <div>
                                <span class="buy-name">王涵</span>
                                <span>15511351896</span>
                            </div>
                            <!-- 放具体的地址 -->
                            <div class="juti-address">
                                <span>河北省唐山市路北区四十八号小区</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 支付方式 -->
                <div class="purchase-payment">
                    <p class="">
                        支付方式
                    </p>
                    <div>
                        <el-button>微信支付</el-button>
                    <el-button>支付宝支付</el-button>
                    </div>
                </div>
                <!-- 这里放送货清单 -->
                <div class="consignment-inventory">
                    <div class="consignment-inventory_head">
                        <div>送货清单</div>
                        <div>价格说明</div>
                        <div>返回购物车</div>
                    </div>
                    <div class="consignment-inventory_content">
                        <div >
                            <!-- 商家说明 -->
                            <p>商家：涵啊涵中日用品店</p>
                            <!-- 图片和相应的书的书名 -->
                            <div class="inventory_content">
                                <div class="inventory">
                                    <!-- 这个左边房图片 -->
                                    <div class="inventory-img">
                                        <img src="../assets/images/book1.png">
                                    </div>
                                    <!-- 这个右边放这个书的名称和作者 -->
                                    <div class="inventory-book">
                                        <span>这是一本书的书名</span>
                                        <span>这是作者</span>
                                    </div>
                                </div>
                                <!-- 下面这块放价格 -->
                                <div class="jiage">
                                    <span>￥200.00</span>
                                </div>
                                <!-- 放数量 -->
                                <!--  -->
                                <div class="shulaing">
                                    <span>x2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--  -->
                    <!-- 每个详情页是不是也得显示商家信息啊，对，还得显示商家信息，麻烦， -->
                </div>
                <!-- 结算按钮 -->
                <div class="purchase-confirm_btn">
                    <el-button @click="aaa">立即结算</el-button>
                </div>
                <!-- 收货人信息这块还有新增收获地址，新增收货地址这块咋处理呢，我也不知道 -->
                <!-- 下面的内容分为两个盒子，收货人信息，支付方式，支付成功跳转到支付成功页面，
                这里应该有个路由才好，如果不加路由的话，用v-if么，v-if也可以，接收一下返回值就可以了，收获地址这块，他新增了就跳到相应的新增那快去 -->
            </div>
        </div>
    </div>
</template>
<script>
// 引入百度地图
import request from '../api/api'
export default {
    data() {
        return {
            bbb:true
        }
    },
    created() {
        // this.bbb = true
        // this.getInfoList()
    },
    methods:{
        getInfoList() {
            request.getInfo().then(res =>{
                console.log('res',res)
            })
        },
        aaa() {
            console.log(222)
        },
        // 新增收获地址。跳转到收获地址页面
        addAddress() {
            // 跳转到收获地址页面
            this.bbb = false
            this.$router.push({
                name:"userAddress",
            })
            // 
        }
    }
    
}
</script>
<style scoped lang='scss'>
.purchase-page {
    width: 100%;
    height: 800px;
    .purchase-page_head {
        width: 100%;
        height: 100px;
        background-color: pink;
    }
    .purchase-page_content {
        // height: 800px;
        width: 800px;
        margin: 0 auto;
        border: 1px solid #f1f3f4;
        padding: 20px;
        // background-color: #ccc;
        .purchase-consignee {
            .consignee-per {
                padding: 0 20px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
            }
            .consignee-content {
                height: 80px;
                margin-top: 10px;
                // background-color: yellow;
                border-bottom: 1px solid green;
                .buy-name {
                    width: 100px;
                    display: inline-block;
                    border: 2px solid red;
                    height: 30px;
                    font-size: 16px;
                    text-align: center;
                    line-height: 30px;
                }
                .juti-address {
                    margin-top: 5px;
                }
            }
        }
        // 
        .purchase-payment {
            padding-bottom: 20px;
            border-bottom: 1px solid green;
            // height: 200px;
        }
        .purchase-payment p {
            font-weight: 700;
            
        }
        .purchase-confirm_btn {
            margin-top: 20px;
            
        }
        .consignment-inventory {
            border-bottom: 1px solid green;
            .consignment-inventory_head {
                display: flex;
                padding: 10px 0;
                border-bottom: 1px solid #ccc;
                justify-content: space-between;
            }
            .consignment-inventory_content {
                // background-color: pink;
                .inventory_content {
                    height: 200px;
                    display: flex;
                    justify-content: space-between;
                    .inventory {
                        display: flex;
                        .inventory-img {
                            width: 180px;
                            img {
                                width: 100%;
                            }
                        }
                        .inventory-book {
                            margin-left: 20px;
                            display: flex;
                            flex-direction: column;
                        }
                    }
                }
                .jiage {
                    color: red;
                    height: 100%;
                    line-height: 125px;
                }
                
            }
            .shulaing {
                height: 100%;
                line-height: 125px;
                    margin-right: 120px;
                    color: #ccc;
                }
        }
    }
}
</style>