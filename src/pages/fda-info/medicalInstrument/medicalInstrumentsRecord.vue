<template>
    <div class="boot-page">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>备案号</th>
                        <th>产品类别</th>
                        <th class="w150">备案日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(item.id)">{{item.recordNum | isValue}}</a>
                        </td>
                        <td>{{item.proCategory | isValue}}</td>
                        <td>{{item.filingDate | isValue}}</td>
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
                        <span class="titleBarName fl">备案号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.recordNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品类别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proCategory | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案人名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.applicantName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案人组织机构代码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.applicantCode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案人注册地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.applicantAds | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productionAds | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">代理人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.agent | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">代理人注册地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.agentRegisAds | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品名称或产品分类名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proClassifiName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">型号/规格或包装规格：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.specifications | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品有效期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proValidity | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品描述或主要组成成份：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.MainComponent | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">预期用途：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.intendedUse | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备注：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.remarks | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案单位：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.filingUnit | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.filingDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">变更情况：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.alteration | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案状态：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.filingState | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui'
    export default {
        name: 'medicalInstrumentsRecord',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'第一类医疗器械（含第一类体外诊断试剂）备案信息',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getmedicalInstrumentsRecordList',params).then((res)=>{
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
            },
            showPopup(medicalId){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/fda/getmedicalInstrumentsRecordDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    medicalId: medicalId
                }).then((res)=>{
                    this.dataDetails =res.data;
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
    @import "../assets/css/tableCon.css";
    @import "../assets/css/dialog.css";
    .boot-page{
        display: flex;
        flex-direction: column;
    }
</style>
