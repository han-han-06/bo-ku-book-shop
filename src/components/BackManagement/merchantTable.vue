<!--
 * @Author: your name
 * @Date: 2020-06-03 11:37:05
 * @LastEditTime: 2020-06-03 21:24:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \beauty-makeup-mall-dev-50eb1e56e6d14ba124d148ea1e2a7d6963c7070a\src\components\BackManagement\merchantTable.vue
--> 
<template>
    <div>
        <!-- 商家管理页面 -->
        <el-table
            :data="tableData"
            border
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.4)"
            :show-overflow-tooltip='true'
            height="700px"
            style="width:800px">
            <el-table-column
                prop="adminName"
                label="商家名"
                width="180">
            </el-table-column>
            <el-table-column
                fixed
                prop="adminPhone"
                label="手机号"
                width="150">
            </el-table-column>
            <el-table-column
                prop="adminSex"
                label="性别"
                width="120">
            </el-table-column>
            <el-table-column
                prop="adminPassword"
                label="密码"
                width="120">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150"
                >
                <template slot-scope="scope">
                    <el-button @click="onDel(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
        <el-dialog
            title="提示"
            :visible.sync="deleteDialog"
            width="30%">
            <span>确定删除么</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureDelete" :loading='delLoading'>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import request from '../../api/api'
export default {
    data() {
        return {
            // 删除弹窗
            deleteDialog:false,
            row:{},
            pageInfo:{
                page:1,
                size:20
            },
            // 删除loading
            delLoading:false,
            tableData:[],
            loading:false,
            total:0
        }
    },
    created() {
        // 获取列表查询
        this.getList()
    },
    methods:{
        getList() {
            this.loading  =true
            let {page,size} = this.pageInfo
            request.getShangJia(page,size).then(res =>{
                this.tableData = res.adminVOS
                this.total= res.count
                setTimeout(()=>{
                    this.loading = false
                },300)
            })
        },
        // 点击删除按鈕
        onDel(row) {
            this.row = row
            // 打开弹窗
            this.deleteDialog = true
            // 
            // this.$emit('on-del',row)
        },
        // 确认删除
        sureDelete() {
            this.delLoading= true
            // let id 
            let {adminId} = this.row
            console.log('adminId',adminId)
            request.getDele(adminId).then(res =>{
                // console.log('res',res)
                this.delLoading= false
                this.deleteDialog = false
                this.getList()
            })
        },
        // 每页多少条
        handleSizeChange(val) {
            // console.log('每页多少条',val)，真的烦
            this.pageInfo.size = val
            // 刷新列表
            this.getList()
        },
        // 点击的是第几页
        handleCurrentChange(val) {
            // console.log('当前页',val)
            this.pageInfo.page = val
            // 刷新列表
            this.getList()
        },
        // GET 
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