<template>
    <div class="boot-fad">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <ul class="clearfix foodLcence-list">
                <li v-for="list in datalist"><a @click="showPopup(list.id,list.licenseName)">
                    <h4 class="foodLcence-title">{{list.licenseName | isValue}}</h4>
                    <p><span>许可证编号：<em>{{list.licenseNo | isValue}}</em></span></p>
                    <p><span>有效期至: <em>{{list.termOfValidity | isValue}}</em></span></p>
                </a></li>
            </ul>
        </div>

        <!--弹框-->
        <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
            <p class="title">{{title}}</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产者名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.producerName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">社会信用代码（身份证号码）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.societyCode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">法定代表人（负责人）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.legalRepresentative | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">住所：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.residence | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productAddress | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">食品类别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.foodCategory | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">许可证编号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.licenseNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">日常监督管理机构：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.suAgency | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">日常监督管理人员：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.suAdmin | isValue}}</span></p>
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
                        <span class="titleBarName fl">签发人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.issuer | isValue}}</span></p>
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
                        <span class="titleBarName fl">有效期至：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.termOfValidity | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">许可明细：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.licenseDetails | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui'
    export default {
        name: 'foodLcence',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'食品生产许可获证企业（SC）',
                datalist:[],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getFoodLcenceList',params).then((res)=>{
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
                api.Get('/cloudMap/fda/getFoodLcenceDetails',{
                    entName:this.$router.currentRoute.params.entName,
                    flId: id
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
    @import "./assets/css/dialog.css";
    .boot-page{
        width:100%;
        height:100%;
    }
    .foodLcence-list li{
        display:inline-block;
        width:33%;
    }
    .foodLcence-list li a{
        display:block;
        margin:5px 5px 0 0;
        height:118px;
        border:1px solid rgba(99,150,255,0.25);
        background:rgba(88,143,255,0.15);
        color:#fff;
        text-decoration:none;
        padding-left:40px;
        padding-right: 20px;
        -webkit-transition: box-shadow 0.3s;
        -moz-transition: box-shadow 0.3s;
        -ms-transition: box-shadow 0.3s;
        -o-transition: box-shadow 0.3s;
        transition: box-shadow 0.3s;
        cursor:pointer;
    }
    .foodLcence-list li a:hover{
        -webkit-box-shadow: 0 0 10px 0 rgba(99,150,255,0.4);
        -moz-box-shadow: 0 0 10px 0 rgba(99,150,255,0.4);
        box-shadow: 0 0 10px 0 rgba(99,150,255,0.4);
        -webkit-transition: box-shadow 0.3s;
        -moz-transition: box-shadow 0.3s;
        -ms-transition: box-shadow 0.3s;
        -o-transition: box-shadow 0.3s;
        transition: box-shadow 0.3s;
    }
    .foodLcence-list .foodLcence-title{
        width:100%;
        line-height:27px;
        font-size:14px;
        font-weight:500;
        margin-top:24px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .foodLcence-list p{
        line-height:22px;
        font-size:12px;
        color:#c6c6c6;
    }
    .foodLcence-list p em{
        color:#fff;
    }
</style>
