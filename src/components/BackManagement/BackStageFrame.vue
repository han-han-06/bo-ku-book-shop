<!--
 * @Author: your name
 * @Date: 2020-04-11 18:44:50
 * @LastEditTime: 2020-06-02 21:44:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \beauty-makeup-mall-dev-50eb1e56e6d14ba124d148ea1e2a7d6963c7070a\src\components\BackManagement\BackStageFrame.vue
--> 
<template>
    <!-- 这是后台框 -->
    <div class="stage-frame">
        <div class="aaa">
            <div class="stage-head">
        <!-- 分为左右两个盒子。左边的放图片，右边的放个人登录信息， -->
            <div class="stage-head_info">
                <img class="boku-logo_img" src="../../assets/images/logo.jpg">
                <span>后台管理</span>
            </div>
            <div class="stage-head_merchant">
                <span>欢迎登录</span>
                <span style="color:red">{{adminName}}</span>
                <span style="color:#409eff">|</span>
                <span @click="goCenter">个人中心</span>
                <span @click="onExit" class="exit">退出</span>
                <div>
            </div>
            </div>
            
        </div>
        </div>
        <div class="stage-content">
            <!-- 放表格 -->
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 商家用户名
            adminName:''
        }
    },
    created() {
        this.adminName = sessionStorage.getItem("adminName");
    },
    methods:{
        // 退出，跳到登录页面
        onExit() {
            this.$router.push({
                name:'tableloginIn'
            })
        },
        // 跳转到个人中心那块
        goCenter() {
            this.$router.push(
                {
                    name:'buyerCenter'
                }
            )
        }
    }
}
</script>
<style lang="scss" scoped>
.stage-frame {
    height: 100%;
    .aaa {
        width: 100%;
        background-color: #fff;
        box-shadow: 0px 2px 10px rgba(153, 153, 153, 0.349019607843137);
    }
    .stage-head {
        height: 60px;
        width: 1200px;
        background-color: #fff;
        // padding: 0 350px;
        
        box-sizing: border-box;
        display: flex;
        margin: auto;
        box-sizing: border-box;
        justify-content: space-between;
        .stage-head_info {
            height: 100%;
            line-height: 60px;
            .boku-logo_img {
                height: 80%;
                margin-top: 5px;
            }
        }
        .stage-head_merchant {
            line-height: 60px;
        }
    }
    // 首页
    .stage-content {
        background-color: #f7f7f7;
        height: 800px;
        margin-top: 5px;
    }
    .exit {
        padding-left: 10px;
        padding-right: 10px;
    }
    .exit:hover {
        cursor: pointer;
    }
}
</style>