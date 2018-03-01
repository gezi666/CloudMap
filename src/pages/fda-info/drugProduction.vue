<template>
    <div class="boot-fad">
        <ul class="fad-tab-list">
            <li><router-link :to="{name:'certificationInfo'}" >认证信息</router-link></li>
            <li><router-link :to="{name:'approvedMedicinePackage'}" >批准的药包材</router-link></li>
            <li><router-link :to="{name:'regApprovalSendsInfo'}">药品注册批件发送信息</router-link></li>
            <li><router-link :to="{name:'cnProtectionVarieties'}">中药保护品种</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script type="es6">
    export default {
        name: 'drugProduction',
        data () {
            return {}
        },
        mounted(){
            this.$router.push({name: 'certificationInfo'})
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "./assets/css/fadTab.css";
</style>
