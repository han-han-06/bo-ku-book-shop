<template>
<!-- 每本图书详情页 -->
    <div class="book-info">
        <!-- 上部分，放书的东西 -->
        <div class="book-info—top">
            <!-- 每本书的图片左边 -->
            <div class="info—top_left">
                <div class="info-img">
                    这里放图片
                    <!-- <el-button @click="aaa"></el-button> -->
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <!-- <img :src="bookInfo.src"> -->
                </div>
            </div>
            <!-- 每本书的右边，分为三部分，简介，（价格，作者，），（加入购物车） -->
            <div class="info—top_right">
                <div class="book-introduction">
                    <h5 class="book-introduction_title">这是这的题目</h5>
                    <!-- 这里应该做一个展开更多的功能，这样才好店 -->
                    <h6 class="book-introduction_con">这里放化妆产品的使用方法</h6>
                </div>
                <div class="bool-price">
                    <!-- 价格 -->
                    <span>当前价格：29元</span>
                </div>
                <div class="shop-car">
                    <!-- 购物车 -->
                    <div class="add-num">
                        <!-- ++ -->
                        <span class="el-icon-circle-plus-outline" @click="purchaseQuantity++"></span>
                        <!-- 购买数量 -->
                        <span class="num-inp">{{purchaseQuantity}}</span>
                        <!-- 减减 -->
                        <span class="el-icon-remove-outline" @click="subNum"></span>
                    </div>
                    <!-- 购买数量{{purchaseQuantity}} -->
                    <div class="add-btn">
                        <el-button @click="addCart">加入购物车</el-button>
                        <el-button @click="immediateBuy">立即购买</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!-- 中间每本书的图片，详情啥的 -->
        <div class="book-info—middle">
            这里就是放一堆图片啥的,代表详情

        </div>
        <!--下部分，评论区，放各种言论，只是展示的作用，没有别的作用  -->
        <!-- 评论应该分为头部，内容和分页 -->
        <div class="book-info_comments">
            <!-- 分为全部，好评，差评，都可以点击的那种，还有晒图么，到时候商量一下去 -->
            <div class="comments-head">
                <div>全部（2222）</div>
                <!--  -->
                <div class="pinglun">好评（222）</div>
                <div>差评（555）</div>
            </div>
            <div class="comments-content">
                <div v-for="(item,index) in commentsList" :key="index" class="comments-info">
                    <div class="block">
                    <el-rate
                        v-model="value2"
                        :colors="colors">
                    </el-rate>
                    </div>
                    <div>
                        这是评论这是评论这是评论这是评论这是评论这是评论
                    </div>
                    <div>
                        这是日期
                    </div>
                </div>
            </div>
            <div class="comments-foot">
                <!-- 分页 -->
                <!-- 哈哈哈 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.page"
                    :page-sizes="[20, 30, 40, 50]"
                    :page-size="pageInfo.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalComment">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 每本书的详情
            bookInfo:{
                src: require('../assets/images/book1.png'),
                title:'图书详情',
                id:6,
            },
            // 加购的数量
            purchaseQuantity:0,
            // 评论总数
            totalComment:2000,
            pageInfo:{
                page:1,
                size:20
            },
            commentsList:[1,2,3,4,5,6,7,8],
            // 这里绑定的值跟随星走，
            value2: null,
            // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
            colors: ['#99A9BF', '#F7BA2A', '#FF9900']  
        }
    },
    methods:{
        // 加入购物车
        addCart() {
            // 这里应该先校验一下(比如是否登录啥的，然后再加入购物车。如果没登录，应该弹出登录/注册的页面)
            // 
        },
        // 立即购买
        immediateBuy() {
            // 先校验。没问题这里需要跳转到订单那里么
        },
        // 减数量
        subNum() {
            if(this.purchaseQuantity > 0) this.purchaseQuantity--
        },
        // 每页多少条
        handleSizeChange(val) {
            console.log('每页多少条',val)
            this.pageInfo.size = val
        },
        // 点击的是第几页
        handleCurrentChange(val) {
            console.log('当前页',val)
            this.pageInfo.page = val
        },
        aaa() {

        }
    }
}
</script>
<style scoped lang='scss'>
* {
    margin: 0;
    padding: 0;
}
.book-info {
    width: 1200px;
    margin: auto;
    height: 1200px;
    border: 1px solid #ccc;
    .book-info—top {
        display: flex;
        background-color: #fff;
        .info-img {
            // background-color: pink;
            border: 1px solid pink;
            height: 350px;
            width: 350px;
        }
        .info—top_right {
            display: flex;
            flex-direction: column;
            .book-introduction {
                border: 1px solid gold;
                .book-introduction_title {
                    margin: 0 5px;
                }
                .book-introduction_con {
                    margin: 10px 5px;
                }
            }
            .bool-price {
                width: 100%;
                height: 100px;
                border: 1px solid greenyellow;
            }
            .shop-car {
                border: 1px solid steelblue;
                .add-num {
                    .el-icon-circle-plus-outline {
                        // font-size: 16px;
                        padding: 0 5px;
                    }
                    .el-icon-circle-plus-outline:hover {
                        cursor: pointer;
                    }
                    .el-icon-remove-outline {
                        padding: 0 5px;
                    }
                    .el-icon-remove-outline:hover {
                        cursor: pointer;
                    }
                    .num-inp {
                        display: inline-block;
                        width: 70px;
                        height: 25px;
                        border: 1px solid #ccc;
                        box-sizing: border-box;
                        border-radius: 3px;
                        padding-left: 5px;
                        // 位置的明天总
                    }
                }
            }
        }
    }
    .book-info—middle {
        margin-top: 20px;
        border: 1px solid aquamarine;
        height: 200px;
    }
    .book-info_comments {
        margin-top: 20px;
        width: 100%;
        border: 1px solid wheat;
        .comments-head {
            display: flex;
            padding-left: 20px;
            .pinglun {
                margin: 0 20px;
            }
        }
        .comments-content {
            .comments-info {
                height: 200px;
                border-bottom: 1px solid #ccc;
            }
        };
    }
    
}
</style>