<template>
    <div class="boot-page">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                <tr>
                    <th class="tc w50">序号</th>
                    <th class="w220">案号</th>
                    <th>案件名称</th>
                    <th class="w220">法院</th>
                    <th class="w100">裁判日期</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in datalist" @click="showPopup(item.caseName,item.caseNo,item.id,item.refereeDate)">
                    <td class="tc">{{index+1 | isValue}}</td>
                    <td><a @click="showPopup(item.caseName,item.caseNo,item.id,item.refereeDate)">{{item.caseNo | isValue}}</a></td>
                    <td>{{item.caseName | isValue}}</td>
                    <td>{{item.courtName | isValue}}</td>
                    <td>{{item.refereeDate | isValue}}</td>
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

        <!--弹框-->
        <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
            <p class="title">{{title | isValue}}</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="writtenVerdict">
                    <h4 class="wtitle">{{this.caseTitle | isValue}}</h4>
                    <div class="wcontent">
                        <div class="whead">
                            <p class="tc wtype">{{dataDetails.publishingOrg | isValue}}<br/>{{this.caseNo | isValue}}</p>
                            <p class="clearfix wline">
                                <span class="fl">{{dataDetails.civilSupervision | isValue}}</span>
                                <span>{{dataDetails.judgmentType | isValue}}</span>
                                <span class="fr">{{this.refereeDate | isValue}}</span>
                            </p>
                        </div>
                        <div class="wtext">
                            <p>{{dataDetails.refereeContent | isValue}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'refereeDocuments',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'裁判文书',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                caseTitle:'',
                caseNo:'',
                refereeDate:'',
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            handleCurrentChange(val) {//分页
                this.getList({
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    page:val,
                    pageSize:this.pageSize
                })
            },
            showPopup(caseName, caseNo,id,date){//模态框
                this.dialogVisible = true;
                this.caseTitle=caseName;
                this.caseNo=caseNo;
                this.refereeDate=date;
                api.Get("/cloudMap/court/getRefereeDocumentsDetails",{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    refereeListId:id
                }).then((res)=>{
                    this.dataDetails=res.data;
                })
                .catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/court/getRefereeDocumentsList',params).then((res)=>{
                    this.loading=false;
                    this.datalist = res.data;
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
    @import "./assets/css/tableCon.css";
    @import "./assets/css/dialog.css";
    .tc{
        text-align:center;
    }
    .writtenVerdict{
        padding:4px 15px 30px;
    }
    .writtenVerdict .wtitle{
        text-align:center;
        font-size:16px;
        font-weight:bold;
        color:#fff;
        line-height:33px;
        margin-bottom:20px;
        padding:0 25px;
    }
    .writtenVerdict .wcontent{
        text-align:center;
        font-size:14px;
        color:#fff;
        margin-bottom:10px;
    }
    .whead{
        line-height:32px;
    }
    .whead .wtype{
        margin-bottom:34px;
    }
    .whead .wline{
        line-height:24px;
        border-bottom:1px dashed #fff;
        margin-bottom:37px;
    }
    .wtext p{
        line-height:32px;
        text-indent:2em;
        text-align:left;
        margin-bottom:32px;
    }
    .court-table td:nth-child(3){
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .court-table{
        table-layout: fixed;
    }
</style>
