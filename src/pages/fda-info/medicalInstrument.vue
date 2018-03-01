<template>
    <div class="boot-fad">
        <ul class="fad-tab-list">
            <li><router-link :to="{name:'domesticEquipment'}" >国产器械</router-link></li>
            <li><router-link :to="{name:'importedEquipment'}" >进口器械</router-link></li>
            <li><router-link :to="{name:'medicalInstrumentsRecord'}" >第一类医疗器械（含第一类体外诊断试剂）备案信息</router-link></li>
            <li><router-link :to="{name:'inspectionDirectory'}" >医疗器械检测中心受检目录</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script type="es6">
    export default {
        name: 'medicalInstrument',
        data () {
            return {}
        },
        mounted(){
            this.$router.push({name: 'domesticEquipment'})
        },
        methods: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "./assets/css/fadTab.css";
</style>
