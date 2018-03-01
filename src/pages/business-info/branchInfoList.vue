<template>
    <div class="boot-page business-tabel" >
        <!--分支机构信息-->
        <div class="branchInfo overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th>注册号</th>
                    <th>分支机构</th>
                    <th class="lastTh">登记机关</th>
                </tr>
                <tr v-for="(item,index) in branchInfo">
                    <td class="firstTd">{{index+1}}</td>
                    <td class="secondeTd">{{item.regNumber | isValue}}</td>
                    <td>{{item.branch | isValue}}</td>
                    <td class="lastTd">{{item.registerOrganization | isValue}}</td>
                </tr>
            </table>
        </div>
        <div class="pageWrap" v-if="this.totalRecord>this.pageSize">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage3"
                    :page-size="this.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="this.totalRecord">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'branchInfoList',
        mounted(){
            api.Get('/cloudMap/business/getBranchInfoList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.branchInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                branchInfo:[],
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getBranchInfoList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.branchInfo =res.data;
                })
            }
        },
        components:{

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
    @import 'assets/css/common.css';
    @import 'assets/css/tableStyle.css';
    .branchInfo {
        width: 100%;
        height: 424px;
    }
</style>
