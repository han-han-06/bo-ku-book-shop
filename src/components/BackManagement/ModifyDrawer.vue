<template>
    <div class="modify-drawer">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" 
        label-width="150px" class="demo-ruleForm" label-position='left'>
            <el-form-item label="书名" prop="bookName">
                <el-input v-model="ruleForm.bookName" disabled></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="bookAuthor">
                <el-input v-model="ruleForm.bookAuthor" disabled></el-input>
            </el-form-item>
            <el-form-item label="图书国际编号" prop="bookIsbn">
                <el-input v-model="ruleForm.bookIsbn" disabled></el-input>
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
                <el-select v-model="ruleForm.bookPublish" placeholder="请选择">
                    <el-option v-for="(item,index) in bookPublish" 
                    :key="index" 
                    :label="item.label" 
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出版时间" prop="bookPublishTime">
                <el-input v-model="ruleForm.bookPublishTime"></el-input>
            </el-form-item>
            <el-form-item label="图书价格" prop="bookOldPrice">
                <el-input v-model="ruleForm.bookOldPrice" @blur="bookPrice(ruleForm.bookOldPrice)"></el-input>
            </el-form-item>
            <el-form-item label="折扣率" prop="discountRate">
                <el-select v-model="putawayState" placeholder="请选择" @change="changeDisount">
                    <el-option v-for="(item,index) in disCountList" 
                    :key="index" 
                    :label="item.label" 
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图书现价" prop="bookNewPrice">
                <el-input v-model="ruleForm.bookNewPrice"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="stockCount">
                <el-input v-model.number="ruleForm.stockCount"></el-input>
            </el-form-item>
            <!-- <el-form-item label="上架状态" prop="putawayState">
                <el-select v-model="ruleForm.putawayState" placeholder="请选择">
                    <el-option v-for="(item,index) in putawayStateList" 
                    :key="index" 
                    :label="item.label" 
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item> -->
            <!-- 上传封面 -->
            <!-- 图书封面 -->
            <el-form-item label="图书封面">
            <div>
                <el-upload
                    class="upload-demo"
                    action="http://192.168.10.83:8989/bokustore/book/upload"
                    name='picture'
                    :on-preview="handlePictureCardPreview2"
                    :on-remove="handleRemove2"
                    :on-success='successFile2'
                    :file-list="picArr"
                    list-type="picture"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传一张主图</div>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
                <el-dialog :visible.sync="dialogVisible2">
                    <img width="100%" :src="dialogImageUrl2" alt="">
                </el-dialog>
            </div>
            </el-form-item>
            <!-- 上传大图-->
            <!-- 这有点问题，就是不能展示后端给的图片 -->
            <el-form-item label="图片详情">
                <!-- 这里放一个div，用于放置图片 -->
                <el-upload
                    class="upload-demo"
                    action="http://192.168.10.83:8989/bokustore/book/upload"
                    name='picture'
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success='successFile'
                    :file-list="bookPictures"
                    list-type="picture"
                    >
                    <el-button size="small" type="primary">点击上传</el-button>
                    
                </el-upload>
                <!-- -->
            </el-form-item>
            <div >
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
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
                        label: "文学图书",
                        value: 1
                    },
                    {
                        label: "科普图书",
                        value: 2
                    },
                    {
                        label: "儿童图书",
                        value: 3
                    }
            ],
            // 折扣率
            disCountList:[
            {
                label:'30%',
                value:'0.3'
            },
            {
                label:'50%',
                value:'0.5'
            },
            {
                label:'70%',
                value:'0.7'
            },
            {
                label:'90%',
                value:'0.9'
            },
        ],
            // 上架状态
            putawayStateList:[
                    {
                        label: "已上架",
                        value: 1
                    },
                    {
                        label: "已下架",
                        value: 2
                    },
                    {
                        label: "未上架",
                        value: 3
                    },
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
            // 图书详情列表
            bookPictures:[],
            bookId:"",
            // 是否显示主图图片
            dialogVisible2:false,
            // 封面list，实际上封面只能有一个
            picArr:[
                {url:""}
            ],
            // 封面路径 
            dialogImageUrl2:'',
            // 图片是否能显示
            picDialog:false,
            // 折扣率
            discountRateList:[],
             // 商品现价
            bookOldPrice:'',
            putawayState:'',
            // 出版社字典表
            bookPublish:[]
        }
    },
    props:{
        // 修改表单
        ruleForm:{
            type:Object,
            default:()=> {}
        }
        // 
    },
    computed:{
        bookNewPrice: function () {
            if(this.bookOldPrice && this.putawayState) {
                // console.log(222)
                let price  = Number(this.bookOldPrice)*this.putawayState
                return Number(this.bookOldPrice)*this.putawayState
            }else {
                return this.bookOldPrice
            }
        }
    },
    watch:{
    },
    created() {
        // this.bookNewPrice = 111
        this.bookId = this.ruleForm.bookId
        // this.bookNewPrice = this.ruleForm.bookNewPrice
        // bookPictures
        let arr = this.ruleForm.bookPictures
        for(let item of arr) {
            if(item.mainPic) {
                let url = item.pictureUrl
                this.picArr =  [{url}]
            }else if(item.mainPic === false) {
                this.bookPictures.push({url:item.pictureUrl})
            }
        }
        this.getPublisher()
    },
    methods:{
        zheKou(price,disCount) {
            // let price = 
            let num = price*disCount
            this.ruleForm.bookNewPrice = num
        },
        getPublisher() {
             request.getPublisherInfo().then(res =>{
                 this.bookPublish = res
             })
        },
        // 修改的保存
        onSave(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                let {bookId} = this
                let adminId = this.$store.state.adminId
                let bookPictures = []
                this.bookPictures.map(el =>{
                    let obj = {}
                    obj.mainPic = false
                    obj.pictureUrl = el.url
                    bookPictures.push(obj)
                })
                let obj2 = {}
                obj2.pictureUrl = this.picArr[0].url
                obj2.mainPic = true
                bookPictures.push(obj2)
                // this.ruleForm.bookNewPrice = this.bookNewPrice
                // this.ruleForm.bookOldPrice = this.bookOldPrice
                // this.ruleForm.bookOldPrice = `${this.ruleForm.bookOldPrice}`
                // this.ruleForm.bookNewPrice = `${this.ruleForm.bookNewPrice}`
                let data = {...this.ruleForm,adminId,bookPictures}
                request.saveModifyFrom(bookId,data).then(res =>{
                    // 关闭侧滑
                    this.$emit('close-draw')
                })
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
            let obj = {}
            obj.mainPic = false
            obj.url = response.result
            this.bookPictures.push(obj)
            // console.log('this.imgUrlList',this.imgUrlList)
        },
        // 封面的展示方法
        handlePictureCardPreview2(file) {
            // 获取图片地址
            this.dialogImageUrl2 = file.url;
            // 展示相应的图片
            this.dialogVisible2 = true;
        },
        // 封面上传的文件
        successFile2(response,file,fileList) {
            // 这个是路径
            // console.log('response.result',response.result)
            let obj  = {}
            obj.mainPic = true
            obj.url = response.result
            // 上传的是主图片，需要把它的标识变成true，是不是其他地方都不需要动吧
            this.picArr.push(obj)
        },
        // 移除文件
        handleRemove2(file, fileList) {
            // 移除文件的时候获取当前的list，进行赋值
            if(fileList.length) {
                let arr = [...fileList]
                // 获取当前存在的url3
                this.picArr = arr.length && arr.map(el => {
                    let obj = {}
                    obj.mainPic = true
                    obj.url = el.response.result
                    return obj
                })
            }else {
                this.picArr = []
            }
            
            // console.log('bookPictures,移除',this.bookPictures
        },
        changeDisount(val) {
            console.log('val',val)
            this.zheKou(this.ruleForm.bookOldPrice,val)
        },
        bookPrice(val) {
            this.zheKou(val,this.putawayState)
        }
    }
}
</script>
<style lang="scss" >
    .el-drawer__body {
        max-height: calc(100% - 10px);
        overflow-y: auto;
        padding: 40px;
        padding-top: 20px;
    }
.modify-drawer {
    // max-height: calc(100% - 73px);
    // overflow-y: auto;
    padding: 40px;
    box-sizing: border-box;
    .demo-ruleForm {
        height: 100%;
        // padding-bottom: 20px;
        box-sizing: border-box;
    }
}
</style>