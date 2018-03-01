<template>
    <div class="boot-pages">
        <!--税务行政处罚-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>决定书文号</th>
                        <th>处罚事由</th>
                        <th>处罚结果</th>
                        <th class="w100">处罚生效日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list,index) in datalist" @click="showPopup(list.punId)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(list.punId)">{{list.wrDecisionNo | isValue}}</a>
                        </td>
                        <td>{{list.puReason | isValue}}</td>
                        <td>{{list.punishResult | isValue}}</td>
                        <td>{{list.effectiveDate | isValue}}</td>
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
            <p class="title">{{title}}</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">行政处罚决定书文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.penaltyNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚事由：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.puReason | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚依据：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.punishmentBasis | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚结果：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.punishResult | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚生效日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.effectiveDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚截止日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.closingDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚机关：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.penaltyOrgan | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'taxAdministrativePenalty',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'税务行政处罚详情',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/tax/getTaxAdministrativePenaltyList',params).then((res)=>{
                    this.loading=false;
                    this.datalist = res.data;
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
            },
            showPopup(id){
                this.dialogVisible = true;
                api.Get('/cloudMap/tax/getTaxAdministrativePenaltyDetails',{
                    "entName": this.$router.currentRoute.params.entName,
                    "punId":id
                })
                    .then(res=>{
                        this.dataDetails = res.data;
                    })
                    .catch(err=>{
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
    @import "./assets/css/tableCon.css";
    @import "./assets/css/dialog.css";
    .court-table{
        table-layout: fixed;
    }
    .court-table td{
        padding:5px 10px;
        vertical-align: top;
    }
    .court-table th:nth-child(2){
        width: 150px;
    }
    .court-table td:nth-child(3),.court-table td:nth-child(4){
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .court-table tr:hover{
        cursor: pointer;
    }
</style>
