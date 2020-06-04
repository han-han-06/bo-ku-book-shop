<template>
    <div>   
        <el-container>
            <el-header>
                <div class="man-headers">
                    <!-- 查询 -->
                    <div class="man-header_searchs">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="书名/作者">
                                <el-input v-model="formInline.keyWord" clearable placeholder="请输入书名"></el-input>
                            </el-form-item>
                            <el-form-item label="出版时间">
                                    <el-date-picker
                                        v-model="formInline.publisTimes"
                                        type="monthrange"
                                        value-format="yyyy-MM"
                                        range-separator="至"
                                        start-placeholder="开始月份"
                                        end-placeholder="结束月份">
                                    </el-date-picker>
                            </el-form-item>
                            <el-form-item label="价格区间">
                                <el-select v-model="formInline.prices" clearable @clear='clear' placeholder="价格区间">
                                <el-option v-for="(item,index) in priceArr" :key="index" :label="item.label" :value='item.value'></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="medium"  @click="onSearch">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <!-- 新增 -->
                    <div>
                        <el-button size="medium" @click="addBooks">新增图书</el-button>
                    </div>
                </div>
                <!--  -->
            </el-header>
            <el-main>
                <div>
                    <!-- 表格 -->
                    <TablePage
                    :loading='tableLoading'
                    :tableData='tableData'
                    @on-modify='onModify'
                    @on-state='onState'
                    @on-delete='onDelete'></TablePage>
                </div>
            </el-main>
            <el-footer>
                <!-- 这里放分页哦 -->
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
            </el-footer>
        </el-container>
        <!-- 新增侧滑 -->
        <el-drawer
            title="我是标题"
            :show-close='false'
            :with-header="false"
            size='800px'
            :visible.sync="addDrawer">
            <AddDrawer
            v-if='addDrawer'
            @close-drawer ='closeDrawer'
            @close-add='closeAdd'></AddDrawer>
        </el-drawer>
        <!-- 修改侧滑 -->
        <el-drawer
            title="我是标题"
            :show-close='false'
            :with-header="false"
            :visible.sync="modifyDrawer"
            size='800px'
            >
            <ModifyDrawer
            v-if='modifyDrawer'
            :ruleForm='modifyFrom'
            @close-draw='closeDraw'
            @close-modify='closeModify'></ModifyDrawer>
        </el-drawer>
        <!-- 删除弹窗 -->
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
        <!-- 上架下架弹窗 -->
        <el-dialog
            title="提示"
            :visible.sync="putawayDialog"
            width="30%">
            <span>确定此操作么</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="putawayDialog = false">取 消</el-button>
                <el-button type="primary" @click="surePutaway" :loading='putawayLoading'>确 定</el-button>
            </span>
        </el-dialog>
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
                publisTimes:[],
                prices:[]
            },
            // 
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
                    value:['1','50'],
                },
                {
                    label:'50-100',
                    value:['50','100'],
                },
                {
                    label:'100-200',
                    value:['100','200'],
                },
                {
                    label:'200-300',
                    value:['200','300'],
                },
                {
                    label:'大于300',
                    value:['300']
                }
                
            ],
            // 上架弹窗显隐
            putawayDialog:false,
            row:{},
            // 确认商家按钮loading
            putawayLoading:false
        }
    },
    created() {
        // this.adminId = this.$store.state.adminId
        this.adminId = sessionStorage.getItem("adminId");
        console.log('this.adminId',this.adminId)
        if(this.$store.state.adminId) {
            this.$store.state.adminId = sessionStorage.getItem("adminId");
        }
        // 获取到当前列表
        this.getList()
    },
    methods:{
        getList() {
            // 
            this.tableLoading = true
            let {page,size} = this.pageInfo
            let adminId = this.adminId
            // let data = {...this.pageInfo,adminId:this.adminId}
            // data里面还应该有人员id
            let data = {...this.formInline}
            if(data.prices=='') {
                console.log(2222)
                data.prices = []
            }
            request.getHouTaiBook(page,size,adminId,{...data,adminId:adminId}).then(res =>{
                this.tableData = res.bookVOList
                this.tableData.map(el =>{
                    if(el.putState) {
                        el.putStates = '已上架'
                    }else{
                        el.putStates = '已下架'
                    }
                    if(el.bookCategory=='1') {
                        el.bookCategorys = '文学图书'
                    }else if(el.bookCategory=='2') {
                        el.bookCategorys = '科普图书'
                    }else{
                        el.bookCategorys = '儿童图书'
                    }
                })
                this.total = res.count
                setTimeout(()=>{
                    this.tableLoading = false
                },300)
            })
        },
        addBooks() {
            // 打开新增侧滑
            this.addDrawer = true
        },
        // 点击修改
        onModify(row) {
            // console.log('row',row)
            // 获取id
            this.bookId = row.bookId
            // console.log(222)
            // 进行数据的请求
            request.getModify(this.bookId).then(res =>{
                this.modifyFrom = res
               // 打开修改侧滑
                this.modifyDrawer = true
            })
            
        },
        // 点击删除
        onDelete(row) {
            // console.log('row',row)
            // 获取id
            this.bookId = row.bookId
            // 打开删除弹窗
            this.deleteDialog = true
        },
        closeModify() {
            // 关闭修改侧滑
            this.modifyDrawer = false
        },
        closeAdd() {
            // 关闭新增侧滑
            this.addDrawer = false
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
        // 确认删除事件
        sureDelete() {
            this.delLoading = true
            // 调取接口
            request.deleteBook(this.bookId).then(res =>{
                // 关闭按钮loading
                this.delLoading = false
                // 关闭弹窗
                this.deleteDialog = false
                this.$commonUtils.setMessage('success','删除成功')
                // 刷新列表
                this.getList()
            }).catch(err => {
                this.delLoading = false
                // this.deleteDialog = false
            })
        },
        closeDrawer() {
            // 关闭新增侧滑。
            this.addDrawer = false
            
            // 刷新列表
            this.getList()
        },
        // 关闭修改侧滑
        closeDraw() {
            this.modifyDrawer = false
            this.$commonUtils.setMessage('success','修改成功')
            // 刷新列表
            this.getList()
        },
        // 模糊搜索书名
        onSearch() {
            this.pageInfo.page = 1
            this.getList()
        },
        // 更改上架状态按钮
        onState(row) {
            this.row = {...row}
            console.log('row',row)
            // 打开弹窗
            this.putawayDialog = true
        },
        // 确认上架
        surePutaway() {
            
            // 打开按钮loading
            this.putawayLoading = true
            let {bookId} = this.row
            let {putState} = this.row
            console.log('row',this.row)
            // true --上架  false 下架
            request.onPopstate(bookId,!putState).then(res =>{
                // 关闭按钮loading
                this.putawayLoading = false
                // 关闭弹窗
                this.putawayDialog = false
                this.$commonUtils.setMessage('success','操作成功')
                // 刷新列表
                this.getList()
            })
        },
        clear() {
            this.prices = []
        }
    }
}
</script>
<style  lang='scss'>
    .el-header {
        line-height: 60px;
    }
    .el-main {
        color: #333;
        text-align: center;
        margin: 0 auto;
        box-sizing: border-box;
    }
    // 表格底部的分页
    .el-footer {
        width: 1200px;
        margin: auto;
        text-align: right;
    }
    .man-headers {
        background-color: #fff;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        width: 1250px;
        margin: auto;
        margin-top: 10px;
        padding:0 20px;
        box-sizing: border-box;
        height: 100%;
        .man-header_searchs {
            height: 100%;
            
        }
        .demo-form-inline {
            height: 100%;
            .el-form-item__content {
                    // margin-top: 5px;
                    vertical-align:middle;
            }
        }
    }
    .table-foot  {
        // background-color: #;
        height: 100%;
        // position: fixed;
        // right: 0;
        // display: flex;
        // flex-direction: column;
        // align-items:center;
    }
    
</style>