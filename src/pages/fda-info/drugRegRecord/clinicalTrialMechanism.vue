<template>
    <div class="boot-page">
        <div class="overflowAuto mediaTable" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                <tr>
                    <th class="tc w50">序号</th>
                    <th>证书编号</th>
                    <th>认定专业</th>
                    <th>认证日期</th>
                    <th class="w150">有效期截止日</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(list,index) in datalist">
                    <td class="tc">{{index+1 | isValue}}</td>
                    <td>{{list.certificateNum | isValue}}</td>
                    <td>{{list.cogSpecialty | isValue}}</td>
                    <td>{{list.atDate | isValue}}</td>
                    <td>{{list.termOfValidity | isValue}}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <!--分页-->
        <div class="pageWrap"  v-if="this.totalRecord>this.pageSize">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="this.currentPage"
                    :page-size="this.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="this.totalRecord">
            </el-pagination>
        </div>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui'
    export default {
        name: 'clinicalTrialMechanism',
        data () {
            return {
                loading: true,
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: []
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getClinicalTrialMechanismList',params).then((res)=>{
                    this.loading=false;
                    this.datalist =res.data;
                    this.totalRecord=res.totalRecord;
                })
                .catch(err=>{
                })
            },
            handleCurrentChange(val) {//分页
                this.getList({
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    page:val,
                    pageSize:this.pageSize
                })
            }
        },
        mounted(){
            this.getList({//列表
                entId:1,
                entName:this.$router.currentRoute.params.entName,
                page:1,
                pageSize:this.pageSize
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
    @import "../assets/css/tableCon.css";
</style>
