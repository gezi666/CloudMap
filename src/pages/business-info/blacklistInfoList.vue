<template>
    <div class="boot-page business-tabel" >
        <!--严重违法失信企业名单-->
        <div class="blacklistInfo overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">类别</th>
                    <th class="thirdTh">列入原因</th>
                    <th class="fourthTh">决定机关/日期</th>
                    <th class="fifthTh">移除原因</th>
                    <th class="lastTh">决定机关/日期</th>
                </tr>
                <tr v-for="(item,index) in blacklistInfo">
                    <td class="firstTd">{{index+1}}</td>
                    <td>
                        {{item.illeagalType | isValue}}
                    </td>
                    <td class="secondTd">
                        {{item.inputReason | isValue}}
                    </td>
                    <td>
                        <span>
                            {{item.inputOrganization | isValue}}<br/>{{item.inputDate | isValue}}
                        </span>
                    </td>
                    <td class="fourthTd">
                        {{item.outputReason | isValue}}
                    </td>
                    <td  class="lastTd">
                            {{item.outputOrganization | isValue}}<br/>{{item.outputDate | isValue}}
                    </td>
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
        name: 'blacklistInfoList',
        mounted(){
            api.Get('/cloudMap/business/getBreakLawPromiseList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.blacklistInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                blacklistInfo:[],
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getBreakLawPromiseList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.blacklistInfo =res.data;
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
    /*黑名单*/
    .blacklistInfo td{
        vertical-align: top;
        padding:5px 10px;
    }
    .blacklistInfo .firstTd{
        border-left:1px solid #1e417a;
    }
    .blacklistInfo .lastTd{
        border-right:1px solid #1e417a;
    }
    .blacklistInfo .firstTh{
        width:10%;
    }
    .blacklistInfo .secondTh{
        width:10%;
    }
    .blacklistInfo .thirdTh{
        width:17%;
    }
    .blacklistInfo .fourthTh{
        width:15%
    }
    .blacklistInfo .fifthTh{
        width:17%
    }
    .blacklistInfo .lastTh{
         width:15%
    }
    .blacklistInfo span{
        vertical-align: top;
        text-align: left;
        float: right;
        width:calc(100% - 15px);
        margin-right:0px;
        padding-right: 15px;
        border-right: 1px solid #214c99;
        display: inline-block;
    }
    .secondTd,.fourthTd{
        padding:5px 10px;
    }
    tr:hover .secondTd,tr:hover .fourthTd{
        padding:5px 10px;
    }
</style>
