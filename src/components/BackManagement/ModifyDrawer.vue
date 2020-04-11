<template>
    <div class="modify-drawer">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" 
        label-width="150px" class="demo-ruleForm" label-position='left'>
            <el-form-item label="书名" prop="bookName">
                <el-input v-model="ruleForm.bookName"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="bookAuthor">
                <el-input v-model="ruleForm.bookAuthor"></el-input>
            </el-form-item>
            <el-form-item label="图书国际编号" prop="bookIsbn">
                <el-input v-model="ruleForm.bookIsbn"></el-input>
            </el-form-item>
            <el-form-item label="图书类别" prop="bookCategory">
                <el-select v-model="ruleForm.bookCategory" placeholder="请选择">
                    <el-option v-for="(item,index) in bookClassify" 
                    :key="index" 
                    :label="item.label" 
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出版社" prop="bookPublish">
                <el-input v-model="ruleForm.bookPublish"></el-input>
            </el-form-item>
            <el-form-item label="出版时间" prop="bookPublishTime">
                <el-input v-model="ruleForm.bookPublishTime"></el-input>
            </el-form-item>
            <!-- -->
            <el-form-item label="图书价格" prop="bookNewPrice">
                <el-input v-model="ruleForm.bookNewPrice"></el-input>
            </el-form-item>
            <el-form-item label="图书原价" prop="bookOldPrice">
                <el-input v-model="ruleForm.bookOldPrice"></el-input>
            </el-form-item>
            <!-- 上传图片 -->
            <el-upload
                action="http://192.168.10.83:8989/bokustore/book/upload"
                name='picture'
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success='successFile'
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
            <el-form-item>
                <el-button type="primary" @click="onSave('ruleForm')">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
    </el-form>
    </div>
</template>
<script>
import request from '../../api/api'
export default {
    data() {
        return {
            adminId:'',
            // 图片路径
            dialogImageUrl: '',
            // 是否显示
            dialogVisible: false,
            // 图书类型字典表
            bookClassify:[
                    {
                        label: "精选图书",
                        value: "1"
                    },
                    {
                        label: "推荐图书",
                        value: "2"
                    },
                    {
                        label: "科普图书",
                        value: "3"
                    }
                ],
            rules:{
                bookName:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookAuthor:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookCategory:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookIsbn:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookNewPrice:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookOldPrice:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookPicture:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookPublish:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                bookPublishTime:[
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            },
            bookPictures:[],
            bookId:""
        }
    },
    props:{
        // 修改表单
        ruleForm:{
            type:Object,
            default:()=> {}
        }
    },
    created() {
        this.bookId = this.ruleForm.bookId
    },
    methods:{
        onSave(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let {bookId} = this
                let adminId = this.$store.state.adminId
                adminId = 'a103'
                console.log('bookPictures',this.bookPictures)
                let data = {...this.ruleForm,adminId}
            } 
            });
        },
        // 关闭弹窗
        resetForm() {
            this.$emit('close-modify')
        },
        // 移除文件
        handleRemove(file, fileList) {
            // 移除文件的时候获取当前的list，进行赋值
            let arr = [...fileList]
            // 获取当前存在的url
            this.bookPictures = arr.map(el=>{
                return el.response.result
            })
        },
        // 放大当前文件
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 图片上传成功
        successFile(response,file,fileList) {
            this.bookPictures.push(response.result)
            console.log('this.imgUrlList',this.imgUrlList)
        }
    }
}
</script>
<style lang="scss" scoped>
.modify-drawer {
    padding: 40px;
    box-sizing: border-box;
}
</style>