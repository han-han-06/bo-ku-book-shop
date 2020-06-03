<!--
 * @Author: your name
 * @Date: 2020-06-02 19:24:47
 * @LastEditTime: 2020-06-02 20:01:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \beauty-makeup-mall-dev-50eb1e56e6d14ba124d148ea1e2a7d6963c7070a\src\components\BackManagement\search.vue
--> 
<template>
<!-- 后台搜索表单 -->
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="书名/作者">
            <el-input v-model="formInline.user" placeholder="请输入书名/作者"></el-input>
        </el-form-item>
        <el-form-item label="出版时间">
                <el-date-picker
                    v-model="formInline.time"
                    type="monthrange"
                    range-separator="至"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份">
                </el-date-picker>
        </el-form-item>
        <el-form-item label="价格区间">
            <el-select v-model="formInline.region" placeholder="活动区域">
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>