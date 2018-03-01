<template>
    <div class="boot-fad">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>证书编号</th>
                        <th>域名</th>
                        <th>类型</th>
                        <th class="w100">有效截至日期</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(item.id)">{{item.certificateNum | isValue}}</a>
                        </td>
                        <td>{{item.domainName | isValue}}</td>
                        <td>{{item.typeStatus | isValue}}</td>
                        <td>{{item.expirationDate | isValue}}</td>
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
                        <span class="titleBarName fl">证书编号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.certificateNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">服务性质：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.serviceNature | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">机构名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.orgName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">法定代表：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.legalRepresen | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">有效截至日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.expirationDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">地址和邮编：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.addressCode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">网站域名：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.webDomainName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">发证机关：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.issuingAuthority | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">有效起始日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.effeStartDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">网站负责人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.siteManager | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui'
    export default {
        name: 'internetDrug',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'互联网药品信息服务',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getInternetDrugList',params).then((res)=>{
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
            showPopup(drugId){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/fda/getInternetDrugDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    drugId: drugId
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
    @import "./assets/css/tableCon.css";
    @import "./assets/css/dialog.css";
    .court-table th:last-child{
        width: 150px;
    }
</style>
