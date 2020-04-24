<template>
    <div>
        <div class="block">
            <el-carousel height="475px">
                <el-carousel-item v-for="(item,index) in carouselData" :key="index">
                    <div class="lb-pic">
                        <!-- {{index}} -->
                        <img :src="item.picture">
                    </div>
                    <!-- <h3 class="small">{{ item }}</!--> -->
                </el-carousel-item>
                </el-carousel>
        </div>
    </div>
</template>
<script>
// import a from ''
export default {
    data() {
        return {
            // 轮播图片
            // carouselData:[]
        }
    },
    props:{
        carouselData:{
            type:Array,
            default:() =>{[]}
        }
    },
    methods:{
        
    }
}
</script>

<style>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .lb-pic img {
        width: 100%;
    }
</style>