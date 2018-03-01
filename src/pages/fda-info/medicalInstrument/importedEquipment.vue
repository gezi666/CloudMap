<template>
    <div class="boot-page">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                <tr>
                    <th class="tc w50">序号</th>
                    <th>注册证编号</th>
                    <th>产品名称</th>
                    <th class="w150">批准日期</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                    <td class="tc">{{index+1 | isValue}}</td>
                    <td>
                        <a @click="showPopup(item.id)">{{item.regCertificateNum | isValue}}</a>
                    </td>
                    <td>{{item.productName | isValue}}</td>
                    <td>{{item.approvalDate | isValue}}</td>
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
                        <span class="titleBarName fl">注册证编号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.regCertificateNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">注册人名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.registrantName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">注册人住所：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.residence | isValue}}</span></p>
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
                        <span class="titleBarName fl">代理人名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.agentName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">代理人住所：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.agentAds | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">型号、规格：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.specifications | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">结构及组成：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.structureForm | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">适用范围：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.applyScope | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">其他内容：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.otherCon | isValue}}</span></p>
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
                        <span class="titleBarName fl">批准日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.approvalDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">有效期至：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.termOfValidity | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">附件：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enclosure | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品标准：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productStandard | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">变更日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.changeDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">主要组成成分（体外诊断试剂）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.majorComponent | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">预期用途（体外诊断试剂）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.intendedUse | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品储存条件及有效期（体外诊断试剂）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.storageCon | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">审批部门：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.approvalDepar | isValue}}</span></p>
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
                        <span class="titleBarName fl">生产国或地区（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enProCountry | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产厂商名称（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.chManufacturer | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品名称（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.chProductName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">售后服务机构：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.serInstitutions | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产国或地区（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.chProCountry | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui'
    export default {
        name: 'importedEquipment',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'进口器械',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getImportedEquipmentList',params).then((res)=>{
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
            showPopup(importedId){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/fda/getImportedEquipmentDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    importedId: importedId
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
