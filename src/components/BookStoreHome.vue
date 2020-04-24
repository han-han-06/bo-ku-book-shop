<template>
<!-- 首页 -->
    <div>
        <!-- 头部 -->
        <div class="head">
                    <BookHeader
                    :customerName='customerName'
                    @select-cate='selectCate'></BookHeader>
                </div>
        <div class="home-book">
        <el-container>
            <el-main>
                <!-- 轮播 -->
                <div class="lunbo" v-if='!flag'>
                    <BookLunBo
                    :carouselData='carouselData'>轮播</BookLunBo>
                </div>
                <!-- 这个盒子是三个书的分类 -->
                <div v-if="hiddenFenLei">
                    <!-- 精选图书 -->
                    <div class="jingxuan">
                        <BookJingXuan
                        :title="'精选图书'"
                        :arrList='selectedBooks'
                        ></BookJingXuan>
                    </div>
                    <!-- 特价图书 -->
                    <div class="remai">
                        <BookJingXuan
                        :title="'热卖图书'"
                        :arrList='hotsellBooks'
                        ></BookJingXuan>
                    </div>
                    <div class="tejia">
                        <BookJingXuan
                        :title="'推荐图书'"
                        :arrList='recommendedBooks'
                        ></BookJingXuan>
                    </div>
                </div>
                <!-- 选中某一个盒子的时候展示某一个分类 -->
                <div v-if="!hiddenFenLei" class="select-class">
                    <!-- 图片怎么显示呢，就多显示几排么 -->
                    <BookJingXuan
                    :title="titleList"
                    :arrList='categoryList'
                    ></BookJingXuan>
                </div>
            </el-main>
        </el-container>
        
    </div>
    <div class="">
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
            carouselData:[],
            titleList:''
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
                    this.titleList = "精选图书"
                }else if(value ==2) {
                    this.titleList = '推荐图书'
                }else {
                    this.titleList = "热卖图书"
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
        }
    }
}
</script>   

<style scoped>
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
         background-color: #fff;
         margin-bottom: 20px;
    }
    .lunbo {
        padding: 15px;
        margin-bottom: 20px;
        background-color: #fff;
    }
</style>
