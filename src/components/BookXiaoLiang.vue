<!--
 * @Author: your name
 * @Date: 2020-05-30 09:06:02
 * @LastEditTime: 2020-06-03 09:28:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \beauty-makeup-mall-dev-50eb1e56e6d14ba124d148ea1e2a7d6963c7070a\src\components\BookXiaoLiang.vue
--> 
<template>
    <div class="xiao_lia">
        <!--  -->
        <!-- <div   > -->
            <div class="title-pai">
                <span class="xiaohua">
                    <!-- 图片-小花，嘿嘿 -->
                    <!-- <img src="../assets/images/hua.png"> -->
                </span>
                <span class="top-title">图书销量榜</span>
            </div>
            <div v-for="(item,index) in bookArr" :key='index' class="liang" >
            <!-- 左边的名词 -->
            <!-- 循环给颜色，这可咋给，我也不知道啊 -->
                <div class="book-na" :class="(index===9?'book-bor':'')||(index<3?'xiao-top':'')">
                   <!-- <div> -->
                        <div :class="bookClass[index]" class="book-num">{{index+1}}</div>
                        <!-- 右边的书名 -->
                        <div class="book-ming">{{item.bookName}}-{{item.bookAuthor}}</div>
                   <!-- </div> -->
                </div>
            </div>
        <!-- </div> -->
        
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 排名的颜色
            colors:[
                'red','#1177bb','#cbcb41','#8dc149','#1e1e1e',
                '#ee9523','#1177bb','#cbcb41','#8dc149','#1e1e1e'
            ],
            numm:'22',
            bookClass:['class-1','class-2','class-3','class-4','class-5',
                'class-6','class-7','class-8','class-9','class-10']
        }
    },
    props:{
        bookArr:{
            type:Array,
            default:() =>{
                return []
            } 
        }, 
    }
    
}
</script>
<style scoped lang='scss'>
.xiao_lia {
    // 
    margin-top: 20px;
    margin-left: 20px;
    border: 1px solid #ccc;
    width: 330px;
    padding: 10px;
    box-sizing: border-box;
    
    .liang {
        display: flex
    }
    // 
    .book-num {
        margin-right: 10px;
        // width: 35px;
        // height: 35px;
        
    }
    .class-1 {
        color: red;
    }
    .class-2 {
        color: #ee9523;
    }
    .class-3 {
        color: #1177bb;
    }
    .class-4 {
        color: #8dc149;
    }
    .class-5 {
        color: #1e1e1e;
    }
    .class-6 {
        color: #ee9523;
    }
    .class-7 {
        color: #1177bb;
    }
    .class-8 {
        color: #8dc149;
    }
    .class-9 {
        color: #ed03d3;
    }
    .class-10 {
        color: #007acc;
    }
    .book-na {
        // border-style:none none none  dashed;
        // padding: 10px 0;
        width: 100%;
        height: 45px;
        display: flex;
        align-items: center;
        border-bottom: 1px dashed #ccc ;
    }
    .book-bor {
        border: none;
    }
    .title-pai {
        display: flex;
        height: 40px;
        line-height: 40px;
        .xiaohua {
            height: 100%;
            width: 35px;
            // 标题小花的图片,你说你有点难追，想染
            background:url('../assets/images/hua.png') 5px 4px no-repeat;
            img {
                width: 100%;
                height: 100%;
            }
        }
        // 标题
        .top-title {
            color: brown;
        }
        // 何曾改变，
    }
    .xiao-top {
        color: #ef001a;
    }
}
</style>