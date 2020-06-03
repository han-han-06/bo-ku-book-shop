<template>
    <div class="home-tab" >
        <div v-if="!isSuperAdmin">
            <el-tabs type="border-card">
                <!-- 商品管理 -->
                <el-tab-pane label="商品管理"  >
                    <manage-home></manage-home>
                </el-tab-pane>
                <!-- 订单管理 -->
                <el-tab-pane label="订单管理" >
                    <OrderTable></OrderTable>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-else>
            <el-tabs type="border-card">
                <!-- 商品管理 -->
                <el-tab-pane label="用户管理" >
                    <UserTable></UserTable>
                </el-tab-pane>
                <!-- 订单管理 -->
                <el-tab-pane label="商家管理" >
                    <merchantTable></merchantTable>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            // 管理员身份
            flag:false,
            isSuperAdmin:false
        }
    },
    methods:{
    },
    created() {
        // 获取管理员身份
        let bool = sessionStorage.getItem("isSuperAdmin")
        if(bool==='true') {
            this.isSuperAdmin = true
        }else if(bool==='false') {
            this.isSuperAdmin = false
        }
    }
}
</script>
<style scoped lang='scss'>
.home-tab {
    margin: auto;
    // margin-top: 120px;
    width: 1300px;
}
</style>