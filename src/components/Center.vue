<template>
    <!--   前台个人中心管理页面 -->
    <div class="registered">
        <!-- 头部 放个注册的logo啥的-->
        <div class="registered-head">
            <div class="registered-heade_content">
                <div class="heade_content">
                    <div class="boku-logo">
                    <img class="boku-logo_img" src="../assets/images/logo.jpg">
                </div>
                <div class="boku-zhuce">欢迎登录个人中心</div>
                </div>
                <div class="registered-heade_login">
                    
                    <span class="heade_login" @click.stop="onGoShou">首页</span>
                </div>
            </div>
        </div>
        <div class="registered-content">
            <div class="registered-content_form">
                <el-form :model="ruleForm" status-icon 
                :rules="rules" 
                ref="ruleForm" 
                label-width="100px" 
                class="demo-ruleForm"
                :hide-required-asterisk='true'>
                    <el-form-item label="用户名" prop="userName">
                        <el-input v-model="ruleForm.userName" :disabled="dis"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-radio-group v-model="ruleForm.userSex" prop='userSex' :disabled="dis">
                            <el-radio :label="0">男</el-radio>
                            <el-radio :label="1">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="手机号" prop="userPhone">
                        <el-input v-model="ruleForm.userPhone" :disabled="true"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="验证码" prop="verificationCode">
                            <div class="verification">
                                <el-input v-model="ruleForm.verificationCode" class="bbb"></el-input>
                                <el-button @click.stop="getCode" class="aaa">
                                    <span v-if="!ranNum">验证码</span>
                                    <span>{{ranNum}}</span>
                                </el-button>
                            </div>
                    </el-form-item>    -->
                    <el-form-item label="密码" prop="userPassword">
                        <!-- 禁用 -->
                        <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off" disabled></el-input>
                    </el-form-item>
                    <!-- -->
                    <el-form-item>
                        <!-- 保存 -->
                        <el-button type="primary" @click="modify()" class="zhuce-btn">修改</el-button>
                        <!-- 取消 -->
                        <!-- <el-button type="primary" @click="submitForm('ruleForm')" class="zhuce-btn">保存</el-button> -->
                    </el-form-item>
                    <el-form-item>
                        <!-- 保存 -->
                        <!-- <el-button type="primary" @click="submitForm('ruleForm')" class="zhuce-btn">修改</el-button> -->
                        <!-- 取消 -->
                        <el-button type="primary" @click="submitForm('ruleForm')" class="zhuce-btn">保存</el-button>
                    </el-form-item>
                    <!--  -->
                </el-form>
            </div>
        </div>
    </div>
    
</template>
<script>
    import request from '../api/api'
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
            } else if (value !== this.ruleForm.userPassword) {
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
                userPassword: '',
                checkPass: '',
                userSex:0,
                userName:'',
                userPhone:''
            },
            ranNum:"",
            // 禁用标识
            dis:true,
            rules: {
                userPassword: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                verificationCode:[
                    { validator: checkCode, trigger: 'blur' }
                ],
                userPhone:[
                    {validator:checkPhone,trigger:'blur'}
                ],
                userSex:[
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                userName:[
                    { required: true, message: '请输入用户名', trigger: 'change' }
                ]
            },
            userId:''
        };
        },
        created() {
            this.ruleForm.userName = sessionStorage.getItem("userName");
            let userSex = sessionStorage.getItem("userSex");
            if(userSex=='男') {
                this.ruleForm.userSex = 0
            }else{
                this.ruleForm.userSex = 1
            }
            this.ruleForm.userPhone = sessionStorage.getItem("userPhone");
            this.ruleForm.userPassword = sessionStorage.getItem("userPassword");
            this.userId = sessionStorage.getItem("userId");
        },
        methods: {
        /**
         * @author : 王涵
         * @Date : 2020-05-19
         * @information : 保存
         * @parmams : 
         */
        submitForm(formName) {
            this.$refs[formName].validate().then(() =>{
                let {userId} = this
                request.onModifyCenter({userId,...this.ruleForm}).then(res=>{
                    // 消息提示
                    this.$commonUtils.setMessage('success','修改成功')
                    // // 跳转到登录页面
                    this.$router.push({
                        path:'login',   
                    })
                }).catch(err => {
                    // console.log('err',err)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                })
            }).catch(err=>{
                // 
            })
        },
        modify() {
            // 取消禁用
            this.dis = false
            
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
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
        onGoShou() {
            this.$router.push(
                {
                    name:"bookStoreHome"
                }
            )
        },
        }
    }
</script>
<style scoped lang='scss'>
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