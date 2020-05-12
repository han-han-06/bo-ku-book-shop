<template>
    <div id="qrcode" ref="qrcode"></div>
</template>
<script>
import QRCode from 'qrcodejs2' 
export default {
    data() {
        return {}
    },
    created() {
        this.qrcode()
    },
    methods:{
        // 扫描二维码，
        qrcode() {
            let qrcode = new QRCode('qrcode', {
                width: 132,  
                height: 132,
                text: 'http://192.168.10.80:8080/#/confirmPay', // 二维码地址(跳转到确认支付页面)
                colorDark : "#000",
                colorLight : "#fff",
            })
        },
    }
    

}
</script>