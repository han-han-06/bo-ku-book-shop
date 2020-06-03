<template>
    <!-- 管理员-商家管理中的修改侧滑 -->
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商家姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商家手机号" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-input v-model="ruleForm.sex"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {}
    },
    methods:{
        // 保存
        submitForm() {
            this.$emit('save-from')
        },
        // 取消
        resetForm() {
            this.$emit('cancle-from')
        },
        

    }
}
</script>