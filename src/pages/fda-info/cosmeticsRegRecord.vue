<template>
    <div class="boot-fad">
        <ul class="fad-tab-list">
            <li><router-link :to="{name:'specialCosmetics'}" >国产特殊用途化妆品</router-link></li>
            <li><router-link :to="{name:'importCosmetics'}" >进口化妆品</router-link></li>
            <li><router-link :to="{name:'nonSpecificRecord'}">国产非特殊用途化妆品备案检验</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script type="es6">
    export default {
        name: 'cosmeticsRegRecord',
        data () {
            return {}
        },
        mounted(){
            this.$router.push({name: 'specialCosmetics'})
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "./assets/css/fadTab.css";
</style>
