<template>
    <div>
        <!-- 确认支付页面 -->
        <button  @click="confirm">确认支付</button>
    </div>
</template>
<script>
export default { 
    data() {
        return {}
    },
    methods:{
        // 确认支付，确认支付后跳转到支付成功页面
        confirm() {
            this.$router.push({
                name:'successPayment'
            })
        }
    }
}
</script>