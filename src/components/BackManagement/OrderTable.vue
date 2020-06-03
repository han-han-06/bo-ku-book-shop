<template>
    <div>
        <!-- 订单管理y页面 -->
        <div class="man-header">
                    <!-- 查询 -->
                    <div class="man-header_search">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="书名/作者/订单号/收货人">
                                <el-input v-model="formInline.keyWord" clearable="" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="下单时间">
                                    <el-date-picker
                                        v-model="formInline.orderTimes"
                                        value-format="yyyy-MM-dd"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="medium"  @click="onSearch">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <!-- 订单查询列表 -->
        <OrderPageTable
        :loading='loading'
        :tableData='orderVOList'
        @on-deliver='onDeliver'></OrderPageTable>
        <div class="table-foot">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageInfo.page"
                            :page-sizes="[10, 20, 30, 40]"
                            :page-size="pageInfo.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
    </div>
</template>
<script>

import request from '../../api/api'
export default {
    data() {
        return {
            // 新增策劃
            addDrawer:false,
            // 修改策劃
            modifyDrawer:false,
            // 
            formInline:{
                keyWord:'',
                orderTimes:[],
            },
            // 分页
            pageInfo:{
                size:10,
                page:1,
            },
            total:0,
            // 修改表單
            modifyFrom:{},
            tableData:[],
            id:1,
            // 删除弹唱显隐
            deleteDialog:false,
            // 删除按钮loading
            delLoading:false,
            // 商家id
            adminId:'',
            // 获取每本书的bookId
            bookId:'',
            // 表格loading
            tableLoading:false,
            // 价格区间
            priceArr:[
                {
                    label:'1-50',
                    value:1,
                },
                {
                    label:'50-100',
                    value:2,
                },
                {
                    label:'100-200',
                    value:3,
                },
                {
                    label:'200-300',
                    value:4,
                },
                {
                    label:'大于300',
                    value:5,
                }
                
            ],
            orderVOList:[],
            // 表格loading
            loading:false
        }
    },
    created() {
        this.adminId = sessionStorage.getItem("adminId");
        this.getOrderList()
        // getOrder
    },
    methods:{
        // 获取订单列表
        getOrderList() {
            this.loading = true
            let {page,size} = this.pageInfo
            let {formInline,adminId} = this
            request.getOrder(page,size,{...formInline,adminId}).then(res =>{
                // console.log(res)
                this.total = res.count
                this.orderVOList = res.orderVOList
                // 1--已发货  0 --未发货
                this.orderVOList.map(el =>{
                    if(el.orderState==0) {
                        el.state = '未发货'
                        el.orderStates = false
                    }else if(el.orderState==1){
                        el.state = '已发货'
                        el.orderStates = true
                    }
                })
                setTimeout(() =>{
                    this.loading = false
                },300)
                // 
            })
        },
        onSearch() {
            this.getOrderList()
            console.log('22',this.formInline)
        },
        // 发货
        onDeliver(data) {
            console.log('data',data)
            let {orderNumber} = data
            request.getDeliver(orderNumber).then(res =>{
                console.log(res)
                this.$commonUtils.setMessage('success','发货成功')
                // 刷新页面
                this.getOrderList()
            })
        },
         // 每页多少条
        handleSizeChange(val) {
            // console.log('每页多少条',val)，真的烦
            this.pageInfo.size = val
            // 刷新列表
            this.getOrderList()
        },
        // 点击的是第几页
        handleCurrentChange(val) {
            // console.log('当前页',val)
            this.pageInfo.page = val
            // 刷新列表
            this.getOrderList()
        },
    }
}
</script>