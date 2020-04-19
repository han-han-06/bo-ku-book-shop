<template>
<!-- 首页 -->
    <div>
        <!-- 头部 -->
        <div class="head">
                    <BookHeader
                    @select-cate='selectCate'></BookHeader>
                </div>
        <div class="home-book">
        <el-container>
            <el-main>
                <!-- 轮播 -->
                <div class="lunbo">
                    <!-- <BookLunBo>轮播</BookLunBo> -->
                </div>
                <!-- 这个盒子是三个书的分类 -->
                <div v-if="hiddenFenLei">
                    <!-- 精选图书 -->
                    <div class="jingxuan">
                        <BookJingXuan
                        :arrList='arrList'
                        ></BookJingXuan>
                    </div>
                    <!-- 特价图书 -->
                    <div class="tejia">
                        <!-- <BookJingXuan
                        :arrList='arrList'
                        ></BookJingXuan> -->
                    </div>
                    <div class="tejia">
                        <!-- <BookJingXuan
                        :arrList='arrList'
                        ></BookJingXuan> -->
                    </div>
                </div>
                <!-- 选中某一个盒子的时候展示某一个分类 -->
                <div v-if="!hiddenFenLei">
                    <!-- 图片怎么显示呢，就多显示几排么 -->
                    <BookJingXuan
                    :arrList='arrList'
                    ></BookJingXuan>
                    <BookJingXuan
                    :arrList='arrList'
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
            arrList:[
                {title:1,id:1},
                {title:1,id:1},
                {title:1,id:1},
                {title:1,id:1},
                {title:1,id:1},
            ],
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
            userId:''
        }
    },
    created() {
        // 获取id
        this.userId = this.$store.dispatch.userId
        // 一开始初始化的时候我得获取到他们的分类
        this.hiddenFenLei = true
        // 我需要请求一下所有的数据么
        // 根据图书类别查询相应的图书
        this.getClassifyBooks()
        // 
    },
    methods:{
        getClassifyBooks() {
            // 图书类别
            // let category = 1
            let userId = this.userId
            // request.getDiffBook({userId}).then(res =>{
            //     console.log('图书信息',res)
            //     this.classifyBooks = res
            // })
        },
        // 选中某一分类的时候
        selectCate(value) {
            this.categoryId = value
            // 显示某一具体分类
            this.hiddenFenLei = false
            // 进行数据的请求
            request.getDiffBook(value).then(res =>{
                // 获取改分类下的图书
                this.categoryList = [...res]
            })
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
        /* height: 400px; */
        /* background: pink; */
    }
    .lunbo {
        margin-bottom: 20px;
    }
</style>
