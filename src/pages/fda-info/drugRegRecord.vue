<template>
    <div class="boot-fad">
        <ul class="fad-tab-list">
            <li><router-link :to="{name:'domesticDrug'}" >国产药品</router-link></li>
            <li><router-link :to="{name:'importedDrugs'}" >进口药品</router-link></li>
            <li><router-link :to="{name:'supplementRecord'}">药品注册补充申请备案</router-link></li>
            <li><router-link :to="{name:'cnExtractRecord'}" >中药提取物备案</router-link></li>
            <li><router-link :to="{name:'domesticProductsName'}" >国产药品商品名</router-link></li>
            <li><router-link :to="{name:'importedProductsName'}">进口药品商品名</router-link></li>
            <li><router-link :to="{name:'drugPatents'}" >药品专利</router-link></li>
            <li><router-link :to="{name:'clinicalTrialMechanism'}" >药物临床试验机构</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script type="es6">
    export default {
        name: 'drugRegRecord',
        data () {
            return {}
        },
        mounted(){
            this.$router.push({name: 'domesticDrug'})
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "./assets/css/fadTab.css";
    .boot-page{
        display: flex;
        flex-direction: column;
    }
</style>
