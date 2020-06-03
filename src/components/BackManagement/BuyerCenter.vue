<template>
    <!-- 注册页面 -->
    <div class="registered">
        <div class="registered-head">
            <div class="registered-heade_content">
                <div class="heade_content">
                    <div class="boku-logo">
                    <img class="boku-logo_img" src="../../assets/images/logo.jpg">
                    </div>
                    <div class="boku-zhuce">后台管理系统</div>
                </div>
                <div class="heade_denglu">
                    <span>已有帐号？</span>
                    <span style="color:red;cusor:pointer" @click="onGoLogin">去登陆</span>
                </div>
            </div>
        </div>
        <!-- 头部 放个注册的logo啥的-->
        <div class="registered-content">
            <div class="registered-content_form">
                <el-form :model="ruleForm" status-icon 
                :rules="rules" 
                ref="ruleForm" 
                label-width="100px" 
                class="demo-ruleForm"
                :hide-required-asterisk='true'>
                    <el-form-item label="用户名" prop="adminName">
                        <el-input v-model="ruleForm.adminName" :disabled="isDis"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-radio-group v-model="ruleForm.adminSex" prop='adminSex' :disabled="isDis">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="手机号" prop="adminPhone">
                        <el-input v-model="ruleForm.adminPhone" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="adminPassword">
                        <el-input type="password" v-model="ruleForm.adminPassword" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" :disabled="isDis"></el-input>
                    </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="modifyInfo" class="zhuce-btn">修改信息</el-button>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button type="primary" @click="modifyInfo" class="zhuce-btn">修改信息</el-button> -->
                        <el-button type="primary" @click="submitForm()" class="zhuce-btn">保存信息</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>


import request from '../../api/api'
    export default {
        data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.ruleForm.checkPass !== '') {
                this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.adminPassword) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        var checkCode = (rule, value, callback) => {
            if (value&&value.toLowerCase()!==this.ranNum.toLowerCase()) {
                callback(new Error('请输入正确验证码'));
            }else {
                callback()
            }
        };
        var checkPhone = (rule,value,callback) => {
            var myreg=/^[1][3,4,5,7,8,6,9][0-9]{9}$/;
            if(value&&!myreg.test(value)) {
                callback(new Error('请输入正确手机号'));
            }else{
                callback()
            }
        }
        return {
            ruleForm: {
                adminPassword: '',
                checkPass: '',
                adminSex:0,
                adminName:''
            },
            ranNum:"",
            rules: {
                adminPassword: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                verificationCode:[
                    { validator: checkCode, trigger: 'blur' }
                ],
                adminPhone:[
                    {validator:checkPhone,trigger:'blur'}
                ],
                adminSex:[
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                adminName:[
                    { required: true, message: '请输入用户名', trigger: 'change' }
                ]
            },
            // 是否禁用
            isDis:true,
            adminId:''
        };
        },
        created() {
            this.ruleForm.adminName = sessionStorage.getItem("adminName");
            let adminSex = sessionStorage.getItem("adminSex");
            if(adminSex=='男') {
                this.ruleForm.adminSex = 0
            }else{
                this.ruleForm.adminSex = 1
            }
            this.ruleForm.adminPhone = sessionStorage.getItem("adminPhone");
            this.ruleForm.adminPassword = sessionStorage.getItem("adminPassword");
            this.adminId = sessionStorage.getItem("adminId");
        },
        methods: {
        // submitForm(formName) {
        //     this.$refs[formName].validate().then(() =>{
        //         request.adminRegister({...this.ruleForm}).then(res =>{
        //             this.$commonUtils.setMessage('success','注册成功')
        //             // 注册成功跳转到登录页面
        //             this.$router.push(
        //                 {name:'tableloginIn'}
        //             )
        //         })
        //     }).catch(err=>{
        //     })
        // },
        // 重置
        // resetForm(formName) {
        //     this.$refs[formName].resetFields();
        // },
        // 获取随机数
        getRandom(n, m) { 
            n = Number(n);
            m = Number(m);
            // 确保 m 始终大于 n
            if (n > m) {
                let temp = n;
                n = m;
                m = temp;
            }
            // 下有详细说明
            return Math.floor(Math.random()*(m - n) + n);
        },
        // 生成随机验证码
        getCode() {
            let codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let str = '';
            // 验证码有几位就循环几次
            for (var i = 0;i < 4;i ++) {
                str += codeStr.charAt(this.getRandom(0, 62));
            }
            this.ranNum = str
        },
        // 跳转到登录页面
        onGoLogin() {
            this.$router.push({
                name:'tableloginIn',   
            })
        },
        // 点击修改信息按钮
        modifyInfo() {
            // 取消禁用
            this.isDis = false
            
        },
        // 保存信息
        submitForm() {
            let {ruleForm} =  this
            let {adminId} = this
            // console.log('ruleForm',ruleForm)
            request.modifyBuyerInfo({...ruleForm,adminId}).then(res =>{
                this.$commonUtils.setMessage('success','修改成功')
                // console.log('res',res)
                // 跳转到登录页面
                this.$router.push({
                    name:'tableloginIn'
                })
            }) 
        }
        }
    }
</script>

<style scoped lang='scss'>
.registered-head {
    height: 120px;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    box-shadow:0px 5px 10px 0px #e5e7eb;
    display: flex;
    justify-content: space-between;
    .registered-heade_content {
        
        height: 100%;
        width: 1200px;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        .heade_content {
            display: flex;
            .boku-logo { 
            margin-right: 20px;
            height: 100%;
            font: 20px Arial,Verdana;
            color: #EB4C44;
            line-height: 150px;
            .boku-logo_img {
                margin-top: 43px;
            }
        } 
        .boku-zhuce {
            font: 20px Arial,Verdana;
            color: #666;
            margin-top: 70px;
        }
        }
        
    }
}
.heade_denglu {
 line-height: 180px;
}
.registered-head {
    height: 120px;
    width: 100%;
    position: fixed;
    left: 0;
    background-color: #fff;
    top: 0;
    box-shadow:0px 5px 10px 0px #e5e7eb;
    display: flex;
    justify-content: space-between;
    .registered-heade_content {
        height: 100%;
        width: 1200px;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        .heade_content {
            display: flex;
            .boku-logo { 
            margin-right: 20px;
            height: 100%;
            font: 20px Arial,Verdana;
            color: #EB4C44;
            line-height: 150px;
            .boku-logo_img {
                margin-top: 43px;
            }
        } 
        .boku-zhuce {
            font: 20px Arial,Verdana;
            color: #666;
            margin-top: 70px;
        }
        }
        
    }
    .registered-heade_login {
        margin-top: 75px;
        color: #666;
        .heade_login {
            color: #EB4C44;
        }
        .heade_login:hover {
            cursor: pointer;
        }
    }
}

.registered-content {
    width: 1200px;
    margin: 0 auto;
    margin-top: 200px;
    // background-color: #cccccc;
    .registered-content_form {
        .zhuce-btn {
            width: 100%;
            // background-color:  #EB4C44;
            // border: 1px solid #EB4C44;
        }
        width: 400px;
        margin: 0 auto;
        .verification {
            display: flex;                    
            .bbb {
                margin-right: 20px;;
            }
        }
    }
}
</style>