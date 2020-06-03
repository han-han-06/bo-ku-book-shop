<template>
<!-- 首页 -->
    <div>
        <!-- 头部 -->
        <div class="head">
                    <BookHeader
                    :customerName='customerName'
                    :handleSelect='handleSelect'
                    @select-cate='selectCate'></BookHeader>
        </div>
        <!-- 搜索框,是不是模糊搜索 -->
        <div>
        </div>
        <div class="home-book">
        <el-container>
            <el-main>
                <!-- 轮播 -->
                <div class="lunbo" v-if='!flag'>
                    <BookLunBo
                    :carouselData='carouselData'>轮播</BookLunBo> 
                </div>
                <div class="man-header">
                    <!-- 查询 -->
                    <div class="man-header_search">
                        <el-form :inline="true" :model="formInline" class="demo-form-inline">
                            <el-form-item label="书名/作者">
                                <el-input v-model="formInline.keyWord" placeholder="请输入书名" clearable></el-input>
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
                                <el-select v-model="formInline.prices" placeholder="价格区间" clearable @clear='clear'>
                                <el-option v-for="(item,index) in priceArr" :key="index" :label="item.label" :value='item.value'></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="medium"  @click="onSearch">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <!-- 这个盒子是三个书的分类 -->
                <div v-if="hiddenFenLei" class="fenlei">
                    <!-- 文学图书 -->
                    <div class="">
                            <div class="jingxuan">
                                <BookJingXuan
                                :title="'文学图书'"
                                :arrList='selectedBooks'
                                ></BookJingXuan>
                            </div>
                            <!-- 科普图书 -->
                        <div class="remai">
                            <BookJingXuan
                            :title="'科普图书'"
                            :arrList='hotsellBooks'
                            ></BookJingXuan>
                        </div>
                        <!-- 儿童图书 -->
                        <div class="tejia">
                            <BookJingXuan
                            :title="'儿童图书'"
                            :arrList='recommendedBooks'
                            ></BookJingXuan>
                        </div>
                    </div>
                    <div class="xiaoliang">
                        <!-- 销量 -->
                        <BookXiaoLiang
                        :bookArr='bookArr'></BookXiaoLiang>
                    </div>
                </div>
                
                <!-- 选中某一个盒子的时候展示某一个分类 -->
                <div v-if="!hiddenFenLei" class="select-class">
                    <!-- 吧这个排版改一下 -->
                    <!-- 图片怎么显示呢，就多显示几排么 -->
                    <SearchJingXuan
                    :title="titleList"
                    :arrList='categoryList'
                    ></SearchJingXuan>
                </div>
            </el-main>
        </el-container>
    </div>
    <div class="">
            <!-- 底部   -->
            <BookStoreFooter></BookStoreFooter>
    </div>
    </div>
</template>
<script>
import request from '../api/api'
export default {
    // name: 'bookStoreHome',
    data () {
        return {
            // 轮播的图片
            // 精选
            selectedBooks:[],
            // 特价
            hotsellBooks:[],
            // 推荐
            recommendedBooks :[],
            // 用户名
            userName:'',
            // 图书类别查询相应的图书
            classifyBooks:[],
            // 是否显示分类盒子
            hiddenFenLei:true,
            // 分类id
            categoryId:'',
            categoryList:[],
            pageInfo:{
                page:1,
                size:20
            },
            userId:'',
            customerName:'',
            flag:0,
            pageInfo:{
                page:1,
                size:20
            },
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
                    value:['300'],
                }
                
            ],
            carouselData:[],
            titleList:'',
            bookClassify:[
                    {
                        label: "文学图书",
                        value: 1
                    },
                    {
                        label: "科普图书",
                        value: 2
                    },
                    {
                        label: "儿童图书",
                        value: 3
                    }
            ],
            // 图书销量排行
            bookArr:[],
            // 查询表单
            formInline:{
                keyWord:'',
                publisTimes:[],
                prices:[]
            }
        }
    },
    created() {
        
        // 一开始初始化的时候我得获取到他们的分类
        this.hiddenFenLei = true
        // 获取首页信息
        this.getHome()
        // 我需要请求一下所有的数据么
        // 根据图书类别查询相应的图书
        let localId = sessionStorage.getItem("userId")
        let localName = sessionStorage.getItem("userName");
        this.customerName = localName ? localName : ''
        if(!this.$store.state.userId) {
            this.$store.state.userId = localId;
        }
        // 获取id
        this.userId =  sessionStorage.getItem("userId")
        // 获取图书前十
        this.getTopBook()
    },
    methods:{
        getHome() {
            let {page,size} = this.pageInfo
            request.getHomeInfo(page,size).then(res =>{
                // console.log('res',res)
                this.selectedBooks  = res.selectedBooks.bookVOList
                this.recommendedBooks  = res.recommendedBooks.bookVOList 
                this.hotsellBooks  = res.hotsellBooks.bookVOList 
                this.carouselData = res.rotationPictureList
            })
        },
        // 选中某一分类的时候
        selectCate(value) {
            if(value ==='0') {
                this.hiddenFenLei = true
            }else {
                if(value ==1) {
                    this.titleList = "文学图书"
                }else if(value ==2) {
                    this.titleList = '科普图书'
                }else {
                    this.titleList = "儿童图书"
                }
                this.categoryId = value
                // 显示某一具体分类
                this.hiddenFenLei = false
                let {page,size} = this.pageInfo
                // 进行数据的请求
                request.getDiffBook(page,size,value).then(res =>{
                    // 获取改分类下的图书
                    this.categoryList = res.bookVOList
                    // this.categoryList
                })
            }
        },
        // 输入框搜索选中值,选中的时候，走相应选中列表的接口，获取关于他的相关数据，这样就可以了吧
        handleSelect(item) {
            let {page,size} = this.pageInfo
            // console.log('item',item)
            let value = {item}
            // 进行数据的请求
            request.getDiffBook(page,size,value).then(res =>{
                // 修改标题
                this.titleList = item.title
                // 获取该查询条件下的图书
                this.categoryList = res.bookVOList
                // this.categoryList
            })
        },
        // huoq
        getTopBook() {
            request.getTopTenBooks().then(res =>{
                console.log('res',res)
                this.bookArr = res
            })
        },
        onSearch() {
            this.titleList = "搜索图书"
            // 显示某一具体分类
            this.hiddenFenLei = false
            let {page,size} = this.pageInfo
            if(this.formInline.prices==='') {
                this.formInline.prices = []
            }
            // 进行数据的请求
            request.getHomeBook(page,size,{...this.formInline}).then(res =>{
                console.log('res',res)
                // 获取改分类下的图书
                this.categoryList = res
                // this.categoryList
            })
        },
        clear() {
            this.prices = []
        }
    }
}
</script>   

<style scoped lang='scss'>
    .home-book {
        height: 100%;
        width: 1200px;
        margin: 0 auto;
    }
    .jingxuan {
        background-color: #fff;
        margin-bottom: 20px;
        /* height: 400px; */
        /* background: pink; */
    }
    .remai,.tejia,.select-class {
        margin-top: 20px;
        background-color: #fff;
        
    }
    .lunbo {
        padding: 15px;
        margin-bottom: 20px;
        background-color: #fff;
    }
    .fenlei {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        z-index: 4
    }
    .xiaoliang {
        margin-top: 8px;
    }
    .man-header {
        background-color: #fff;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        // width: 1200px;
        margin: auto;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
        padding:10px 20px;
        box-sizing: border-box;
        // line-height: 81px;
        // height: 80px;
        // background-color: #fff;
        .man-header_search {
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
</style>
