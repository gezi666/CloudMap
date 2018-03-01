<template>
    <div class="boot-pages">
        <!--A级纳税人名单-->
        <div class="overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <div class="taxpayers-title"><span>评价年份</span></div>
            <ul class="taxpayers-list">
                <li v-for="list in datalist">
                    <a href="javascript:;">
                        <span class="mtop">{{list.particularYear | isValue}}</span><span class="f14">年</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'taxDetails',
        data () {
            return {
                loading: true,
                datalist: []
            }
        },
        mounted(){
            api.Get("/cloudMap/tax/getTaxDetailsList",{
                "entName": this.$router.currentRoute.params.entName
            })
                .then(res=>{
                    this.loading=false;
                    this.datalist = res.data;
                })
                .catch(err=>{
                })
        },
        filters:{
            isValue(val){
                return val = (val=="") ? "-" : val
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "./assets/css/ballLamp.css";
    .taxpayers-title span{
        padding-top: 50px;
        margin-bottom: 10px;
    }
    .boot-pages{
        width:100%;
        height:100%;
    }
</style>
