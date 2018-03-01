<template>
    <div class="boot-page">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>批准文号</th>
                        <th>产品名称</th>
                        <th>批件有效期</th>
                        <th class="w150">批准日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(item.id)">{{item.approvalNo | isValue }}</a>
                        </td>
                        <td>{{item.productName | isValue }}</td>
                        <td>{{item.termOfValidity | isValue }}</td>
                        <td>{{item.approvalDate | isValue }}</td>
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
                        <span class="titleBarName fl">产品名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productName | isValue}}</span></p>
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
                        <span class="titleBarName fl">生产企业：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.manufactEnt | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产企业地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.manufactAddress | isValue}}</span></p>
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
                        <span class="titleBarName fl">批件状态：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.approvalState | isValue}}</span></p>
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
                        <span class="titleBarName fl">批件有效期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.effectiveDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">卫产许可证号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.licenseNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品名称备注：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proNameRemarks | isValue}}</span></p>
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
                        <span class="titleBarName fl">产品技术要求：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.skillRequire | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'specialCosmetics',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'国产特殊用途化妆品',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist:[],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getSpecialCosmeticsList',params).then((res)=>{
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
            showPopup(specialId){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/fda/getSpecialCosmeticsDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    specialId: specialId
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
