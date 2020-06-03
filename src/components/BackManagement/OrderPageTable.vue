<template>
<!-- 后台表格 -->
    <div class="manage-table">
        <!--表格怎么设计呢，我也不知道，表格需要进行增删改查，添加图书，添加图书类别，都添加啥类别  -->
        <el-table
            :data="tableData"
            border
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.4)"
            :show-overflow-tooltip='true'
            height="700px"
            style="width: 100%">
            <el-table-column
                prop="orderNumber"
                label="订单号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="orderTime"
                label="下单时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="customName"
                label="收货人姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="customPhone"
                label="收货人手机号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="收货人地址"
                width="200">
            </el-table-column>
            <el-table-column
                prop="bookName"
                label="商品名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="orderTotalPrice"
                label="商品价格"
                width="150">
            </el-table-column>
            <el-table-column
                prop="bookCount"
                label="购买数量"
                width="150">
            </el-table-column>
            <el-table-column
                prop="state"
                label="发货状态"
                width="150">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100"
                >
                <!--发货-->
                <template slot-scope="scope">
                    <!-- <el-button>{{scope.$index}}</el-button> -->
                    <!-- {{tableData[scope.$index].orderState}} -->
                    <el-button :disabled="tableData[scope.$index].orderStates" round @click="onDeliver(scope.row)" type="primary" size="small">发货</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props:{
        // 表格数据
        tableData:{
            type:Array,
            default:() => []
        },
        // 表格loading
        loading:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        // 點擊修改按鈕
        onDeliver(row) {
            console.log('row',row)
            this.$emit('on-deliver',row)
        },
    }
}
</script>
<style scoped lang='scss'>
.manage-table {
    width: 1200px;
    height: 700px;
    margin: 0 auto;
}
</style>