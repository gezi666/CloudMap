<template>
    <div class="boot-page">
        <div class="overflowAuto mediaTable" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>备案号</th>
                        <th>药品通用名称</th>
                        <th class="w150">备案日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list,index) in datalist" @click="showPopup(list.id)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(list.id)">{{list.recordNum | isValue}}</a>
                        </td>
                        <td>{{list.genericName | isValue}}</td>
                        <td>{{list.filingDate | isValue}}</td>
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
                        <span class="titleBarName fl">受理号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.acceptanceNum | isValue}}</span></p>
                </div>
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
                        <span class="titleBarName fl">药品通用名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.genericName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">英文名称/拉丁名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enGenericName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">药品分类：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.type | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">剂型：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.dosageForm | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">规格：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.specifications | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">包装规格：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.packSpec | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">批准文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.approvalNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">药品标准：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.drugStandard | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案内容：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.filingCon | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">药品生产企业：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productionEnt | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案机关：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.filingOrgan | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备案日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.filingDate | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui'
    export default {
        name: 'supplementRecord',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'药品注册补充申请备案',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getSupplementRecordList',params).then((res)=>{
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
            showPopup(id){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/fda/getSupplementRecordDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    supId: id
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
</style>
