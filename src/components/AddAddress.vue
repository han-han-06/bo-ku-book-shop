<template>
    <div>
        <!--新增地址的表单  -->
            <div class="add-address_from">
                <div class="add-address_title">
                    <span>新增收获地址</span>
                </div>
                <!-- 一个选择省区的。一个详细地址~~ -->
                <el-form :model="addressFrom" :rules="rules" ref="addressFrom" label-width="120px" class="demo-ruleForm" label-position="left">
                    <div class='aaa'>
                        <el-form-item label="手机号码" prop="customPhone" >
                            <el-input v-model="addressFrom.customPhone" class="phone-inp" ></el-input>
                        </el-form-item>
                    </div>
                    <!-- <div class='aaa'> -->
                        <!-- <el-form-item label="地址信息" prop="area">
                        <el-cascader
                            size="large"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item> -->
                    <!-- </div> -->
                    <div class='aaa'>
                        <el-form-item label="详细地址" prop="address">
                        <el-input v-model="addressFrom.address" placeholder="请输入地址" class="address-inp"></el-input>
                        <el-checkbox v-model="addressFrom.isdefault">是否为默认地址</el-checkbox>
                    </el-form-item>
                    </div>
                    <div class='aaa'>
                        <el-form-item label="收货人姓名" prop="receiver">
                        <el-input v-model="addressFrom.receiver" placeholder="请输入收货人姓名" class="address-inp"></el-input>
                    </el-form-item>
                    </div>
                    </el-form>
                    <div class="baba">
                            <el-button type="primary" @click="submitForm('addressFrom')">添加</el-button>
                            <el-button @click="resetForm('addressFrom')">取消</el-button>
                    </div>
            </div>
    </div>
</template>

<script>
import request from '../api/api'
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
            console.log('loc',loc);
        },
        sureAdd() {
        },
        // 添加的保存
        submitForm(formName) {
            let customId = this.$store.state.userId
                    let data = {...this.addressFrom,customId}
                    // 请求接口
                    request.addAddressHs(data).then(res =>{
                        console.log('res',res)
                        this.$commonUtils.setMessage('success','添加成功')
                        //跳转到地址预览页面
                        this.$router.push({
                            name:'userAddress'
                        })
                        
                    })
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
                
                    
            //     } else {
            //         return false;
            //     }
            // });
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
    width: 500px;
    height: 100%;
    margin: auto;
    margin-top: 20px;
    // 手机号输入框
    .phone-inp {
        width: 217px;
    }
    .address-inp {
        width: 217px;
    }
    .aaa {
        padding-left: 30px;
        padding-top:10px ;
        padding-bottom:10px ;
        margin-bottom: 20px;
        box-sizing: border-box;
        background-color: #fff;
    }
    .add-address_title {
        padding: 10px;
        font-size: 14px;
        font-weight: 700;
        color: #ff4401;
        background-color: #fff;
        margin-bottom: 20px;
    }
    .aaa .el-form-item {
        margin-bottom: 0;
    }
    .baba {
        margin-left: 2px;
    }
}
</style>