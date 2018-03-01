<template>
    <div class="boot-fad">
        <ul class="fad-tab-list">
            <li><router-link :to="{name:'adApprovedInfo'}">广告获批信息</router-link></li>
            <li><router-link :to="{name:'falseAdNotice'}" >虚假广告通告信息</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script type="es6">
    export default {
        name: 'adManagement',
        data () {
            return {}
        },
        mounted(){
            this.$router.push({name: 'adApprovedInfo'})
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "./assets/css/fadTab.css";
</style>
