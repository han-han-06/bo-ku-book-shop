<template>
<!-- 每一栏图书，精选图书，特价图书 -->
    <div class="lanmus">
        <div class="lanmu-hengs">
            <p class="jingxuans">{{title}}</p>
            <span class="hengxians"></span>
        </div>
        <div class="lanmu-pics">
            
                <div v-for='(item,index) in arrList' :key='index' class="pic-infos">
                    <div >
                        <div class="pic-aaas" @click="goDetail(item)">
                            <!-- 图片{{index}} -->
                            <span class="bok-pic">                               
                                <!-- 160*160 -->
                                <img :src="item.bookPicture">
                            </span>
                            <div class='price' style="font-size:14px;color:#6f6f6f">{{item.bookName}}</div>
                            <span class='price'>￥{{item.bookNewPrice}}</span>
                    </div>
                    </div>
                </div>
                
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    props:{
        // 获取图书详情，应该有图片，价格，作者就不用了，
        // 有标题，其他都可以没有，但是不能没有价格
    
        arrList:{
            type:Array,
            default:function() {
                return []
            }
        },
        title:{
            type:String,
            default:''
        }
    },
    methods:{
        goDetail(item) {
            let {bookId} = item
            console.log('bookId',bookId)
            this.$store.state.bookId = bookId
            sessionStorage.setItem("bookId", bookId);
            // 跳转到详情
            this.$router.push(
                {
                    name:'bookDetails'
                }
            )
        }
    }
}
</script>
<style scoped lang='scss'>
.lanmus {
    height: 900px;
    width: 1200px;
    box-sizing: border-box;
    overflow: hidden;
    // margin-bottom: 20px;
    .jingxuans {
        margin-left: 20px;
        font-size: 16px;
        font-weight: 700;
        color: red;
        flex-shrink: 0;
        margin-right: 20px;
    }
    .lanmu-hengs {
        width: 100%;
        display: flex;
        // margin-bottom: 20px;
        align-items: center;
    }
    .hengxians {
        width: 100%;
        display: inline-block;
        height: 1px;
        border-bottom: 1px solid #ccc;
    }
    //  
}
.lanmu-pics {
    // padding: 0 20px;
    // background-color: #ccc;
    display: flex;
    width: 1200px;
    flex-wrap: wrap;
    box-sizing: border-box;
    .pic-aaas {
        width: 132px;
        background-color: #f8f8f8;
        border: 1px solid #ccc;
        text-align: center;
        margin-bottom: 20px;
        .price {
            color: #EB4C44;
            
        }
        .bok-pic {
            height: 150px;
            // width: 150px;
            display: inline-block;
            img {
                height:100%;
                width: 100%;
            }
        }
    }
    .pic-aaas:hover {
        cursor: pointer;
    }
}
.pic-infos {
    height: 100%;
    width: 215px;
    // background-color: greenyellow;
    margin-right: 20px;
}
</style>