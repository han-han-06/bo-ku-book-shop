<template>
    <div>
        <!--新增地址的表单  -->
            <div class="add-address_from">
                <!-- 一个选择省区的。一个详细地址~~ -->
                <el-form :model="addressFrom" :rules="rules" ref="addressFrom" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="手机号" prop="phoneNum" >
                        <el-input v-model="addressFrom.phoneNum" class="phone-inp"></el-input>
                    </el-form-item>
                    <el-form-item label="地区" prop="area">
                        <el-cascader
                        size="large"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange">
                    </el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="detailAddress">
                        <el-input v-model="addressFrom.detailAddress" placeholder="请输入详细地址" class="address-inp"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('addressFrom')">添加</el-button>
                        <el-button @click="resetForm('addressFrom')">取消</el-button>
                    </el-form-item>
                    </el-form>
            </div>
    </div>
</template>
<script>
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
export default {
    data() {
        return {
                        // 详细地址
            detailedAddress:'',
            options: regionData,
            selectedOptions: [],
            // 新增表单
            addressFrom:{
                area:'',
                phoneNum:'',
                detailAddress:''
            },
            // 
            rules:{},
        }
    },
    methods:{
        handleChange() {
            var loc = "";
            for (let i = 0; i < this.selectedOptions.length; i++) {
                loc += CodeToText[this.selectedOptions[i]];
            }
            // 就像
            console.log('loc',loc);
            // 
        },
        sureAdd() {
        },
        // 添加的保存
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //跳转到地址预览页面
                    this.$router.push({
                        name:'userAddress'
                    })
                } else {
                    return false;
                }
            });
        },
        // 取消，跳转到收货地址列表那块
        resetForm() {
            this.$router.push({
                name:'userAddress'
            })
        }
    }
}
</script>
<style scoped lang='scss'>
.add-address_from {
    width: 600px;
    height: 100%;
    margin: auto;
    margin-top: 20px;
    // 手机号输入框
    .phone-inp {
        width: 217px;
    }
    .address-inp {
        width: 300px;
    }
}
</style>