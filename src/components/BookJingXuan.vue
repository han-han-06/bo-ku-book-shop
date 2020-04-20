<template>
<!-- 每一栏图书，精选图书，特价图书 -->
    <div class="lanmu">
        <p class="jingxuan">{{title}}</p>
        <div class="lanmu-pic">
            
                <div v-for='(item,index) in arrList' :key='index' class="pic-info">
                    <div class="pic-aaa" @click="goDetail(item)">
                        <!-- 图片{{index}} -->
                        <span class="bok-pic">                               
                            <!-- 160*160 -->
                            <img :src="item.bookPicture">
                        </span>
                        <div class='price' style="font-size:14px;color:#6f6f6f">计算机科学与技术</div>
                        <span class='price'>￥22.22</span>
                    </div>
                    <!--  -->
                    
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
            this.$store.state.bookId = bookId
            
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
.lanmu {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .jingxuan {
        margin-left: 20px;
        font-size: 16px;
        font-weight: 700;
        color: #666;
    }
    // 
}
.lanmu-pic {
    padding: 0 20px;
    // background-color: #ccc;
    display: flex;
    
    .pic-aaa {
        // width: 160px;
        background-color: #f8f8f8;
        border: 1px solid #ccc;
        text-align: center;
        .price {
            color: #EB4C44;
            
        }
        .bok-pic {
            
            height: 205px;
            // width: 160px;
            display: inline-block;
            img {
                height:100%;
            }
        }
    }
    .pic-aaa:hover {
        cursor: pointer;
    }
}
.pic-info {
    height: 100%;
    width: 250px;
    background-color: greenyellow;
    margin-right: 20px;
}
</style>