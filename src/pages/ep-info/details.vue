<template>
    <div class="boot-page">
        <!--环保行政处罚-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>决定书文号</th>
                        <th>环境违法事实和证据</th>
                        <th>处罚结果</th>
                        <th class="w100">处罚日期</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(list,index) in datalist" @click="showPopup(list.envId)">
                    <td class="tc">{{index+1 | isValue}}</td>
                    <td>
                        <a @click="showPopup(list.envId)">{{list.wrDecisionNo | isValue}}</a>
                    </td>
                    <td class="evidence">{{list.punishContent | isValue}}</td>
                    <td>{{list.punishResult | isValue}}</td>
                    <td>{{list.penaltyDate | isValue}}</td>
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

        <!--弹框-->
        <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
            <p class="title">{{title}}</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">决定书文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.wrDecisionNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚决定的机关：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.organizationName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">环境违法事实和证据：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.punishContent | isValue}}</span></p>
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
                        <span class="titleBarName fl">处罚类型：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.punishType | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.penaltyDate | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'environmentalDetails',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'环保行政处罚详情',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
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
            showPopup(id){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/ep/getEnvironmentalDetails',{
                    "entName": this.$router.currentRoute.params.entName,
                    "envId":id
                })
                .then(res=>{
                    this.dataDetails = res.data;
                })
                .catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/ep/getEnvironmentalList',params).then((res)=>{
                    this.loading=false;
                    this.datalist = res.data;
                    this.totalRecord=res.totalRecord;
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
    .evidence,.court-table td:nth-child(4){
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .court-table th:nth-child(2){
        width:205px;
    }
    .court-table th:nth-child(4){
        width:130px;
    }
    .court-table{
        table-layout: fixed;
    }
</style>
