<template>
    <div class="boot-page">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <ul class="clearfix foodLcence-list">
                <li v-for="list in datalist">
                    <a @click="showPopup(list.id)">
                        <h4 class="foodLcence-title">{{list.atInfoName | isValue}}</h4>
                        <p><span>编号：<em>{{list.atNum | isValue}}</em></span></p>
                        <p><span>发证日期: <em>{{list.dateOfIssue | isValue}}</em></span></p>
                    </a>
                </li>
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
                        <span class="titleBarName fl">编号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.atNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">社会信用代码/组织机构代码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.societyCode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分类码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.classificationNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">省市：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proCities | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">法定代表人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.legalRepresentative | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业负责人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.personCharge | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">质量负责人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.qualityOfficer | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">注册地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.regAddress | isValue}}</span></p>
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
                        <span class="titleBarName fl">生产范围：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productdRange | isValue}}</span></p>
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
                        <span class="titleBarName fl">日常监管机构：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.regulatoryBody | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">日常监管人员：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.supervisor | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">监督举报电话：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.supervisoryCall | isValue}}</span></p>
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
        name: 'certificationInfo',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'药品生产企业',
                datalist:[],
                dataDetails:[]
            }
        },
        mounted(){
            api.Get("/cloudMap/fda/getCertificationInfoList",{
                "entName": this.$router.currentRoute.params.entName
            })
            .then(res=>{
                this.loading=false;
                this.datalist = res.data;
            })
            .catch(err=>{
            })
        },
        methods:{
            showPopup(id){
                this.dialogVisible = true;
                api.Get('/cloudMap/fda/getCertificationInfoDetails',{
                    "entName": this.$router.currentRoute.params.entName,
                    "cerId":id
                })
                .then(res=>{
                    this.dataDetails = res.data;
                })
                .catch(err=>{
                })
            }
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
    @import "../assets/css/dialog.css";
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
