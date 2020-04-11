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
    </div>
</template>
<script>

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
    },
    methods:{
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
        }
    }
}
</script>
<style scoped lang='scss'>
.user-address {
    width: 600px;
    margin: 0 auto;
    .address-head {
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        background-color: yellow;
        .add-address {
            color: #3883ff;
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
                background-color: skyblue;
                border: 1px solid #ccc;
                margin-bottom: 10px;
                .address-user {
                    display: flex;
                    justify-content: space-between;
                    padding-bottom: 5px;
                    // border-bottom: 1px solid #ccc;
                }
            }
        }
}
</style>