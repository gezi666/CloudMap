<template>
    <div class="customsregister">
        <!--海关注册信息-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="register-table">
                <thead class="register-thead">
                    <tr>
                        <th>序号</th>
                        <th>海关编码</th>
                        <th>报关关别</th>
                        <th>企业管理类别</th>
                        <th class="w100">注册有效期</th>
                    </tr>
                </thead>
                <tbody class="register-tbody">
                    <tr v-for="(item,index) in datalist">
                        <td>{{index+1 | isValue}}</td>
                        <td class="register-num">{{item.customCode | isValue}}</td>
                        <td>{{item.reportType | isValue}}</td>
                        <td>{{item.enterpriseAdminType | isValue}}</td>
                        <td>{{item.registrationPeriod | isValue}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--分页-->
        <div class="pageWrap" v-if="this.totalRecord>this.pageSize">
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

<script>
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'customsRegister',
        data () {
            return {
                pageSize:50,
                currentPage:1,
                loading: true,
                totalRecord:'',
                datalist: []
            }
        },
        methods: {
            handleCurrentChange(val) {//分页
                this.getList({
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    page:val,
                    pageSize:this.pageSize
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/customs/getRegisterList',params).then((res)=>{
                    this.loading=false;
                    this.datalist =res.data;
                    this.totalRecord=res.totalRecord;
                })
                .catch(err=>{

                })
            },
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
    .customsregister{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .register-table{
        width: 100%;
        border-collapse:separate;
        border-spacing:0 4px;
    }
    .register-thead th{
        height:34px;
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        padding:0 10px;
        background: rgba(40,92,198,0.35);
        color: #cdd2de;
        box-sizing: border-box;
        border-top: 1px solid #284f9d;
        border-bottom: 1px solid #284f9d;
    }
    .register-thead th:first-child{
        width: 95px;
        text-align: center;
        border-left: 1px solid #284f9d;
    }
    .register-thead th:last-child{
        border-right: 1px solid #284f9d;
        width:150px;
    }
    .register-tbody td{
        height:34px;
        color: #fff;
        font-size: 12px;
        text-align: left;
        padding:0 10px;
        vertical-align: middle;
        background: rgba(88,143,255,0.15);
        border-top:1px solid rgba(99,150,255,0.35);
        border-bottom:1px solid rgba(99,150,255,0.35);
        box-sizing: border-box;
    }
    .register-tbody td:first-child{
        text-align: center;
    }
    .register-tbody tr td:first-child{
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .register-tbody tr td:last-child{
        border-right:1px solid rgba(99,150,255,0.35);
    }
    .register-tbody tr:hover {
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
    }
    .overflowAuto{
        box-sizing: border-box;
        height:424px;
        flex: auto;
        overflow: auto;
        padding-right: 5px;
        overflow-x: hidden;
    }
    .overflowAuto:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .pageWrap{
        margin-top:10px;
    }
</style>
