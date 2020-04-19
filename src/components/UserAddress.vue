<template>
<!-- 管理收获地址页面 -->
    <div class="user-address" >
        <!-- 收货地址头部，新增收获地址 -->
        <div>
            <div class="address-head">
                <span>收货地址</span>
                <div @click="addAddress" class="add-address">
                    新增收货地址
                </div>
            </div>
            
        </div>
        <!--收货地址内容  -->
        <div class="address-content" v-if="!isAddress">
            <div v-for="(item,index) in addressList" :key="index" class="address">
                <div class="address-user">
                    <span>王涵</span>
                    <span>15511351896</span>
                </div >
                <div class='address-ss'>
                    这是他的地址，这是他的地址
                </div>
                
            </div>
        </div>
        <div class="back-Purchase" style="text-align:right;margin-right:20px;color:red" @click="backPurchase">
            <span>返回结算</span>
        </div>
    </div>
</template>
<script>
import request from '../api/api'
export default {
    data() {
        return {
            // 收获地址
            addressList:[1,2,3],
            // 收货地址是否显示
            isAddress:false,
        }
    },
    created() {
        this.isAddress = false
        // 获取收获地址
        this.getAddressInfo()
    },
    methods:{
        getAddressInfo() {
            // 获取相应的用户id
            let userId = this.$store.state.userId
            userId = 'u103'
            request.getAddressId(userId).then(res =>{
                console.log('res',res)
            })
        },
        addAddress() {
            console.log(2222)
            // 显示新增表单
            this.isAddress = true
            this.$router.push(
                {
                    name:'addAddress'
                }
            )
            // setTimeout(()=>{
            //     this.isAddress = false
            // },300)
        },
        sureAdd() {
            // 确定新增，确定的时候调取接口，然后刷新下面的数字
        },
        backPurchase() {
            // console.log(11111)
            this.$router.push(
                {name:'purchaseInfo'}
            )
        }
    }
}
</script>
<style scoped lang='scss'>
.user-address {
    width: 600px;
    margin: 0 auto;
    margin-top: 150px;
    .address-head {
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: 10px;
        .add-address {
            // color: #3883ff;
            color:red;
            font-weight: 700;
            font-size: 14px
        }
        .add-address:hover {
            cursor: pointer;
        }
    }
    .address-content {
            .address {
                box-sizing: border-box ;
                padding: 10px 20px;
                height: 80px;
                background-color: #fff;
                // border: 1px solid #ccc;
                margin-bottom: 10px;
                .address-user {
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 5px;
                    // border-bottom: 1px solid #ccc;
                }
            }
        }
        .back-Purchase {
            cursor: pointer;
            font-size: 14px;
        }
}
</style>