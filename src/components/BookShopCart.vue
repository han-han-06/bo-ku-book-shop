<template>
    <div class="shopping-cart">
        <!-- 购物车页面,分为头部，下面做成卡片的形式 -->
        <div class="cart-header">
            <!-- 头部 -->
            <div class="registered-head">
                <div class="registered-heade_content">
                    <div class="heade_content">
                        <div class="boku-logo">
                        <img class="boku-logo_img" src="../assets/images/logo.jpg">
                    </div>
                    <div class="boku-zhuce">欢迎登录</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 这里放每个购物车的内容 -->
        <div class="cart-content">
            <!-- 全选，商品 -->
            <div class="cart-content_head">
                <el-checkbox v-model="checkAll" class="check-all">全选</el-checkbox>
                <span style="margin-right:20px">商品</span>
                <span style="margin-left:445px">单价</span>
                <span style="margin-left:130px">数量</span>
                <span style="margin-left:245px">小计</span>
            </div>
            <!-- 内容 -->
            <div class="cart-content_center">
                <div class="cart-all_list">
                    <div v-for="(item,index) in carInfo" :key="index" class="cart_list">
                    <!-- 选中 -->
                    <div class="car-check">
                        <el-checkbox v-model="checkOne"></el-checkbox>
                    </div>
                    <!-- 图片和信息 -->
                    <div class="car-img_info">
                        <div class="car-img">
                            <img src="../assets/images/order.jpg">
                        </div>
                        <div class="img-info_car">
                            这个是图片信息这个烦得很放到很干是是图片信息这个是图片简介
                        </div>
                    </div>
                    <!-- 单价 -->
                    <div style="margin-left:114px">
                        <span>￥ 352.55</span>
                    </div>
                    <!-- 数量 -->
                    <div class="car_num" style="margin-left:114px" >
                        <!-- ++ -->
                        <span class="el-icon-circle-plus-outline" @click="purchaseQuantity++"></span>
                        <!-- 购买数量 -->
                        <span class="num-inp">{{purchaseQuantity}}</span>
                        <!-- 减减 -->
                        <span class="el-icon-remove-outline" @click="subNum"></span>
                    </div>
                    <div style="margin-left:171px">
                        ￥ 655.55
                    </div>
                </div>
                </div>
                <!-- 这是分页 -->
                <div class="cart-foot">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageInfo.page"
                            :page-sizes="[20, 30, 40, 50]"
                            :page-size="pageInfo.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                        </el-pagination>
                </div>
            </div>
            <!-- 全选按钮，选中结算那块 -->
            <div class="cart-content_foot">
                <!-- <div> -->
                    <!-- <el-checkbox v-model="checkAll">全选</el-checkbox> -->
                <!-- </div> -->
                <div style="">
                    共选择 <span style="color:red">{{selectedNum}}</span> 件商品
                </div>
                <div  style="margin-right:0;display:flex">
                    <div style="margin-right:20px">总价 ￥<span style="color:red"> {{totalPrice}} </span></div>
                    <div @click='onSettlement'  class="jiesuan-btn" >
                        <span>去结算</span>
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
            pageInfo:{
                page:1,size:20
            },
            total:200,
            // 是否全选
            checkAll:false,
            carInfo:[1,2,3,4,5,6],
            // 选中某一个
            checkOne:false,
            // 购物车数量
            purchaseQuantity:0,
            // 一共选中了几件商品
            selectedNum:1,
            // 总价
            totalPrice:1
        }
    },
    methods:{
         // 每页多少条
        handleSizeChange(val) {
            // console.log('每页多少条',val)，真的烦
            this.pageInfo.size = val
        },
        // 点击的是第几页
        handleCurrentChange(val) {
            // console.log('当前页',val)
            this.pageInfo.page = val
        },
        // 减减
        subNum() {
            if(this.purchaseQuantity > 0) this.purchaseQuantity--
        },
        onSettlement() {
            // 把信息获取到，然后走接口去结账，跳转到结算页面
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
.shopping-cart {
    margin: 0 auto;
    padding: 20px 0;
    width: 1200px;
    .cart-header {
        height: 80px;
        // border: 1px solid pink;
        padding: 15px;
        box-sizing: border-box;
    }
    .cart-content {
        margin-top: 20px;
        // height: 800px;
        border: 1px solid gold;
        .cart-content_head {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            box-sizing: border-box;
            // border: 1px solid #ccc;
            .check-all {
                margin-right: 20px;
            }
        }
        // 购物车内容
        .cart-content_center {
            padding-left: 20px;
            box-sizing: border-box;
            // border: 1px solid chartreuse;
            .cart-all_list {
                height: 500px;
                // background-color: pink;
                overflow-y:auto;
            }
            .cart_list {
                display: flex;
                border: 1px solid #ccc;
                margin-top: 20px;
                padding: 20px 0;
                box-sizing: border-box;
                // height: 150px;
                .car-check {
                    margin-right: 45px;
                }
                .car-img_info {
                    display: flex;
                    .car-img {
                        width: 80px;
                        height: 80px;
                        // border:2px solid yellow;
                    }
                    .img-info_car {
                        width: 300px;
                        // height:150px;
                        // border: 1px solid #ccc;
                        box-sizing: border-box;
                    }
                    
                }
            }
            .car_num {
                // 输入框
                .num-inp {
                    border: 1px solid #ccc;
                    width: 50px;
                    display: inline-block;
                }
            }
        }
        .cart-content_foot {
            padding-left: 20px;
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            border: 1px solid #ccc;
            height: 60px;
            // padding: 10px 0;
            line-height: 60px;
        }
        .cart-foot {
            margin: 20px 0;
            text-align: right;
            padding-right: 20px;
            // float: right;
            // display: block;
            // right: 0;
            // background-color: pink;
        }
    }   
    .jiesuan-btn {
        height: 100%;
        width: 110px;
        line-height: 60px;
        text-align: center;
        background-color: red;
    }
}

</style>