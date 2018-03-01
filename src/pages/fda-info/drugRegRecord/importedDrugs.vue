<template>
    <div class="boot-page">
        <div class="overflowAuto mediaTable" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>注册证号</th>
                        <th>产品名称(中文)</th>
                        <th class="w150">发证日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list,index) in datalist" @click="showPopup(list.id)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(list.id)">{{list.regNum | isValue}}</a>
                        </td>
                        <td>{{list.cnProductName | isValue}}</td>
                        <td>{{list.dateOfIssue | isValue}}</td>
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
                        <span class="titleBarName fl">注册证号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.regNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">原注册证号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.origRegNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">注册证号备注：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.remarks | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分包装批准文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.approvalNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公司名称（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.cnEntName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公司名称（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enEntName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">地址（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.cnAddress | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">地址（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enAddress | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">国家/地区（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.cnArea | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">国家/地区（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enArea | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品名称（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.cnProductName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品名称（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enProductName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">商品名（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.commodityName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">商品名（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enCommodityName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">剂型（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.dosageForm | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">规格（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.specifications | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">包装规格（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.packSpec | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产厂商（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.cnManufacturer | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产厂商（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enManufacturer | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">厂商地址（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.cnFacturerAds | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">厂商地址（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enFacturerAds | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">厂商国家/地区（中文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.cnFacturerArea | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">厂商国家/地区（英文）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enFacturerArea | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">发证日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.dateOfIssue | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">有效期截止日：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.closingDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分包装企业名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.packEntName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分包装企业地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.packEntAds | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分包装文号批准日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.packApprovalDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分包装文号有效期截止日：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.packClosingDate | isValue}}</span></p>
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
                        <span class="titleBarName fl">药品本位码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.standardCode | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui'
    export default {
        name: 'importedDrugs',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'进口药品',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getImportedDrugsList',params).then((res)=>{
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
                api.Get('/cloudMap/fda/getImportedDrugsDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    envId: id
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
