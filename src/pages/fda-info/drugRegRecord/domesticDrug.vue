<template>
    <div class="boot-page">
        <div class="overflowAuto mediaTable" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                <tr>
                    <th class="tc w50">序号</th>
                    <th>批准文号</th>
                    <th>产品名称</th>
                    <th class="w150">批准日期</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(list,index) in datalist" @click="showPopup(list.id)">
                    <td class="tc">{{index+1 | isValue}}</td>
                    <td>
                        <a @click="showPopup(list.id)">{{list.approvalNo | isValue}}</a>
                    </td>
                    <td>{{list.productName | isValue}}</td>
                    <td>{{list.approvalDate | isValue}}</td>
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
                        <span class="titleBarName fl">批准文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.approvalNo | isValue}}</span></p>
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
                        <span class="titleBarName fl">英文名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.englishName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">商品名：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.commodityName | isValue}}</span></p>
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
                        <span class="titleBarName fl">生产单位：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productionUnit | isValue}}</span></p>
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
                        <span class="titleBarName fl">产品类别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.category | isValue}}</span></p>
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
                        <span class="titleBarName fl">原批准文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.origApprovalNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">药品本位码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.standardCode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">药品本位码备注：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.remarks | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">相关数据库查询：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.relatedBaseQuery | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui'
    export default {
        name: 'domesticDrug',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'国产药品',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails: {}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getDomesticDrugList',params).then((res)=>{
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
                api.Get('/cloudMap/fda/getDomesticDrugDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    drugId: id
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
