<template>
    <div class="boot-page" v-loading="loading" element-loading-text="数据加载中...">
        <div class="companyFileList" >
            <!--基本信息-->
            <div  class="baseInfo" >
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        基本信息
                    </span>
                </h3>
                <table>
                    <tr>
                        <td class="tdname">公司名称</td>
                        <td class="tdcon borderRightNone">{{baseInfo.entName | isValue}}</td>
                        <td class="tdname">所属地域</td>
                        <td class="tdcon">{{baseInfo.geographicalArea | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">英文名称</td>
                        <td class="tdcon borderRightNone">{{baseInfo.englishName | isValue}}</td>
                        <td class="tdname">所属行业</td>
                        <td class="tdcon">{{baseInfo.ownedIndustry | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">曾用名</td>
                        <td class="tdcon borderRightNone">{{baseInfo.nameUsedBefore | isValue}}</td>
                        <td class="tdname">公司网址</td>
                        <td class="tdcon entUrl">{{baseInfo.entUrl | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">主营业务</td>
                        <td class="tdcon" colspan="3">{{baseInfo.mainBusiness | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">产品名称</td>
                        <td class="tdcon" colspan="3">{{baseInfo.productName | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">控股股东</td>
                        <td class="tdcon" colspan="3">{{baseInfo.controllingShareholder | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">实际控股人</td>
                        <td class="tdcon" colspan="3">{{baseInfo.actualController | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">最终控股人</td>
                        <td class="tdcon" colspan="3">{{baseInfo.ultimateController | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">董事长</td>
                        <td class="tdcon borderRightNone">{{baseInfo.chairman | isValue}}</td>
                        <td class="tdname">董秘</td>
                        <td class="tdcon">{{baseInfo.secretary}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">法人代表</td>
                        <td class="tdcon borderRightNone">{{baseInfo.legalRepresentative | isValue}}</td>
                        <td class="tdname">总经理</td>
                        <td class="tdcon">{{baseInfo.generalManager | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">注册资金</td>
                        <td class="tdcon borderRightNone">{{baseInfo.registeredCapital | isValue}}</td>
                        <td class="tdname">员工人数</td>
                        <td class="tdcon">{{baseInfo.employeesNum | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">电话</td>
                        <td class="tdcon borderRightNone">{{baseInfo.entTel | isValue}}</td>
                        <td class="tdname">传真</td>
                        <td class="tdcon">{{baseInfo.entFax}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">邮编</td>
                        <td class="tdcon borderRightNone">{{baseInfo.entPostcode | isValue}}</td>
                        <td class="tdname">办公地址</td>
                        <td class="tdcon">{{baseInfo.officeAddress | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname tl" colspan="4">公司简介</td>
                    </tr>
                    <tr>
                        <td class="tdcon lastTd" colspan="4">
                            <div :class=" showAll0 ? 'active' : 'showall0' ">
                                {{baseInfo.companyProfile | isValue}}
                            </div>
                            <div class="checkAll" @click="showAllFn0" v-html="showAll0 ? '收起<<' : '查看全部>>'"></div>
                        </td>
                    </tr>
                </table>
            </div>
            <!--高管介绍-->
            <div class="executiveInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        高管介绍
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current==0 ? 'active' : '']" @click="tab(0)">董事会（{{boardDirectorDetails.length}}人）</li>
                    <li class="fl" :class="[current==1 ? 'active' : '']" @click="tab(1)">监事会（{{boardSupervisorDetails.length}}人）</li>
                    <li class="fl" :class="[current==2 ? 'active' : '']" @click="tab(2)">高管（{{seniorExecutiveDetails.length}}人）</li>
                </ul>
                <ul class="clearfix">
                    <li class="listItem fl th">
                        <span class="num">序号</span>
                        <span class="name">姓名</span>
                        <span class="position">职务</span>
                        <span class="shareAmount borderRightNone">持股数</span>
                    </li>
                    <li class="listItem fl th marginRightZero">
                        <span class="num">序号</span>
                        <span class="name">姓名</span>
                        <span class="position">职务</span>
                        <span class="shareAmount borderRightNone">持股数</span>
                    </li>
                </ul>
                <ul class="clearfix" >
                    <li class="listItem fl" v-if="current==0" v-for="(item,index) in boardDirectorDetails" :class='{marginRightZero:(index+1)%2==0}'>
                        <span class="num">{{index+1}}</span>
                        <span class="name">{{item.name | isValue}}</span>
                        <span class="position">{{item.position | isValue}}</span>
                        <span class="shareAmount borderRightNone">{{item.shareAmount | isValue}}</span>
                    </li>
                    <li class="listItem fl" v-if="current==1" v-for="(item,index) in boardSupervisorDetails" :class='{marginRightZero:(index+1)%2==0}'>
                        <span class="num">{{index+1}}</span>
                        <span class="name">{{item.name | isValue}}</span>
                        <span class="position">{{item.position | isValue}}</span>
                        <span class="shareAmount borderRightNone">{{item.shareAmount | isValue}}</span>
                    </li>
                    <li class="listItem fl"  v-if="current==2" v-for="(item,index) in seniorExecutiveDetails" :class='{marginRightZero:(index+1)%2==0}'>
                        <span class="num">{{index+1}}</span>
                        <span class="name">{{item.name | isValue}}</span>
                        <span class="position">{{item.position | isValue}}</span>
                        <span class="shareAmount borderRightNone">{{item.shareAmount | isValue}}</span>
                    </li>
                </ul>
            </div>
            <!--发行筹资（发行相关）-->
            <div class="issueFinance">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        发行筹资（发行相关）
                    </span>
                </h3>
                <table>
                    <tr>
                        <td class="tdname">成立日期</td>
                        <td class="tdcon borderRightNone">{{issueFinance.registerDate | isValue}}</td>
                        <td class="tdname">发行数量</td>
                        <td class="tdcon borderRightNone">{{issueFinance.issueAmount | isValue}}</td>
                        <td class="tdname">发行价格</td>
                        <td class="tdcon">{{issueFinance.issuePrice | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">上市日期</td>
                        <td class="tdcon borderRightNone">{{issueFinance.listedDate | isValue}}</td>
                        <td class="tdname">发行市盈率</td>
                        <td class="tdcon borderRightNone">{{issueFinance.peRadio | isValue}}</td>
                        <td class="tdname">预计筹资</td>
                        <td class="tdcon">{{issueFinance.expectFinance | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">首日开盘价</td>
                        <td class="tdcon borderRightNone">{{issueFinance.openingPrice | isValue}}</td>
                        <td class="tdname">发行中签率</td>
                        <td class="tdcon borderRightNone">{{issueFinance.successRate | isValue}}</td>
                        <td class="tdname">实际筹资</td>
                        <td class="tdcon">{{issueFinance.actualFinance | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">主承销商</td>
                        <td class="tdcon borderRightNone" colspan="2">{{issueFinance.leadUnderwriter | isValue}}</td>
                        <td class="tdname">上市保荐人</td>
                        <td class="tdcon" colspan="2">{{issueFinance.listedSponsor | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname" colspan="6">历史沿革</td>
                    </tr>
                    <tr>
                        <td class="tdcon lastTd" colspan="6">
                            <div :class=" showAll ? 'active' : 'showall' ">
                                {{issueFinance.history | isValue}}
                            </div>
                            <div class="checkAll" @click="showAllFn" v-html="showAll ? '收起<<' : '查看全部>>'"></div>
                        </td>
                    </tr>
                </table>
            </div>
            <!--参股控股公司-->
            <div class="sharesHolding">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        参股控股公司
                    </span>
                </h3>
                <ul class="clearfix">
                    <li class="fl summaryItem">
                        参股或控股公司：<span class="totalNum">{{sharesHolding.sharesTotalNum | isValue}}</span> 家，其中合并报表的有 <span class="totalNum">{{sharesHolding.mergeTotalNum | isValue}}</span> 家。
                    </li>
                    <li class="fr summaryItem">
                        上市公司最新公告日期：{{sharesHolding.latestDate | isValue}}
                    </li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">序号</th>
                        <th class="secondTh">关联公司名称</th>
                        <th class="thirdTh">参控关系</th>
                        <th class="fourthTh" :class="{'up': isA }" @click="reOrder(0)">
                            <span>参控比例</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="fifthTh"  :class="{'up': isB }"  @click="reOrder(1)">
                            <span>投资金额</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="sixthTh"  :class="{'up': isC }" @click="reOrder(2)">
                            <span>被参控公司净利润（元）</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="seventhTh" :class="{'up': isD }" @click="reOrder(3)">
                            <span>是否报表合并</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="lastTh">被参控公司主营业务</th>
                    </tr>
                    <tr v-for="(item,index) in sharesHolding.details">
                        <td class="firstTd">{{index+1}}</td>
                        <td>{{item.affiliatedComName | isValue}}</td>
                        <td>{{item.controllRelation | isValue}}</td>
                        <td>{{item.controllRadio | isValue}}</td>
                        <td>{{item.investAmount | isValue}}</td>
                        <td>{{item.netProfit | isValue}}</td>
                        <td>{{item.isMerge | isValue}}</td>
                        <td class="lastTd">{{item.mainBusiness | isValue}}</td>
                    </tr>
                </table>
                <div class="pageWrap" v-if="this.totalRecord>this.pageSize">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page.sync="this.currentPage3"
                            :page-size="this.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="this.totalRecord">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'companyFileList',
        mounted(){
//基本信息
            api.Get('/cloudMap/listedCompany/getEntBaseInfo',{
                "entId": 1,
                "entName": this.entName,
            }).then((res)=>{
                this.loading=false;
                this.baseInfo =res.data;
            });
// 高管介绍
            api.Get('/cloudMap/listedCompany/getExecutiveList',{
                "entId": 1,
                "entName": this.entName,
            }).then((res)=>{
                this.executive =res.data;
                this.boardDirectorDetails=res.data.boardDirector.details;
                this.boardSupervisorDetails=res.data.boardSupervisor.details;
                this.seniorExecutiveDetails=res.data.seniorExecutive.details;
            });
//发行筹资
            api.Get('/cloudMap/listedCompany/getIssueFinanceInfo',{
                "entId": 1,
                "entName": this.entName,
            }).then((res)=>{
                this.issueFinance =res.data;
            });
//参股控股公司
            api.Get('/cloudMap/listedCompany/getShareholdingList',{
                "entId": 1,
                "entName": this.entName,
                "page":1,
                "pageSize":this.pageSize,
                "controlRadioOrder":this.controlRadioOrder,
                "investAmountOrder":this.investAmountOrder,
                "netProfitOrder":this.netProfitOrder,
                "isMergeOrder":this.isMergeOrder
            }).then((res)=>{
                this.sharesHolding =res.data;
                this.totalRecord=res.totalRecord;
            });
        },
        data () {
            return {
                loading:true,
                showAll:false, //查看全部变量1
                showAll0:false,//查看全部变量2
                entId:1,
                entName:this.$router.currentRoute.params.entName,
                currentPage3:1,
                pageSize:50,
                totalRecord:0,
                current:0,
                baseInfo:{},
                executive:{},
                boardDirectorDetails:'',
                boardSupervisorDetails:'',
                seniorExecutiveDetails:'',
                issueFinance:{},
                sharesHolding:{},
                isA:false,        //表格排序上下三角形类名变量
                isB:false,
                isC:false,
                isD:false,
                controlRadioOrder:0,     //参控比例排序
                investAmountOrder:0,     //投资金额排序
                netProfitOrder:0,        //被参控公司净利润排序
                isMergeOrder:0           //是否报表合并排序
            }
        },
        methods:{
//参股控股公司--表格排序
            reOrder(n){
                if(n==0){
                    this.controlRadioOrder=1;
                    this.investAmountOrder=this.netProfitOrder=this.isMergeOrder=0;
                    this.isA=!this.isA;
                }else if(n==1){
                    this.controlRadioOrder=this.netProfitOrder=this.isMergeOrder=0;
                    this.investAmountOrder=1;
                    this.isB=!this.isB;
                }else if(n==2){
                    this.controlRadioOrder= this.investAmountOrder=this.isMergeOrder=0;
                    this.netProfitOrder=1;
                    this.isC=!this.isC;
                }else{
                    this.controlRadioOrder=this.investAmountOrder=this.netProfitOrder=0;
                    this.isMergeOrder=1;
                    this.isD=!this.isD;
                }
                api.Get('/cloudMap/listedCompany/getShareholdingList',{
                    "entId": 1,
                    "entName": this.entName,
                    "page":1,
                    "pageSize":this.pageSize,
                    "controlRadioOrder":this.controlRadioOrder,
                    "investAmountOrder":this.investAmountOrder,
                    "netProfitOrder":this.netProfitOrder,
                    "isMergeOrder":this.isMergeOrder
                }).then((res)=>{
                    this.sharesHolding =res.data;
                    this.totalRecord=res.totalRecord;
                })
            },
//基本信息--查看全部
            showAllFn0(){
                this.showAll0=!this.showAll0;
            },
//发行筹资--查看全部
            showAllFn(){
                this.showAll=!this.showAll;
            },
//参股控股公司--分页
            handleCurrentChange(val) {
                api.Get('/cloudMap/listedCompany/getShareholdingList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val,
                    "controlRadioOrder":this.controlRadioOrder,
                    "investAmountOrder":this.investAmountOrder,
                    "netProfitOrder":this.netProfitOrder,
                    "isMergeOrder":this.isMergeOrder
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.sharesHolding =res.data;
                })
            },
//高管介绍--切换
            tab(i){
                this.current=i;
                this.fetList(i)
            },
            fetList(id){
                api.Get('/cloudMap/listedCompany/getExecutiveList',{
                    "entId": 1,
                    "entName": this.entName,
                    "dataType":id
                }).then((res)=>{
                    this.executive =res.data;
                    this.boardDirectorDetails=res.data.boardDirector.details;
                    this.boardSupervisorDetails=res.data.boardSupervisor.details;
                    this.seniorExecutiveDetails=res.data.seniorExecutive.details;
                });
            }
        },
        components:{

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
    @import 'assets/css/common.css';
    .showall {
        height: 84px;
        overflow: hidden;
        clear: both;
    }
    .showall.active {
        height: auto;
    }
    .showall0 {
        height: 84px;
        overflow: hidden;
        clear: both;
    }
    .showall0.active {
        height: auto;
    }
    .checkAll{
        float: right;
        text-align: right;
        text-decoration: underline;
        cursor: pointer;
        color: #fff;
        font-weight: bold;
    }
    .checkAll:hover{
        color:#33b0ff;
        font-weight: bold;
    }
    .companyFileList table,.executiveInfo{
        margin-bottom:22px;
    }
    /*企业信息*/
    .baseInfo .entUrl{
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
    }
    .baseInfo .entUrl:hover{
        color:#33b0ff;
        font-weight: bold;
    }
    .baseInfo td.tdname{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
        padding-left:18px;
    }
    .baseInfo td.tdname:hover{
        height:34px;
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        padding-left:18px;
        text-align: left;
    }
    .baseInfo td.tdcon{
        height:34px;
        border:1px solid rgba(99,150,255,0.35);
        border-left:none;
        background:rgba(88,143,255,0.15);
        color:#fff;
        line-height:28px;
        text-align: left;
        padding-left:38px;
        box-sizing: border-box;
    }
    .baseInfo td.tdcon:hover{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-left:none;
        padding-left:38px;
        box-sizing: border-box;
    }
    .baseInfo td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .baseInfo tr:hover td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .baseInfo td.borderRightNone{
        border-right:none;
    }
    .baseInfo td.borderRightNone:hover{
        border-right:none;
    }
    /*高管介绍*/
    .executiveInfo{
        width:100%;
    }
    .executiveInfo .listItem{
        box-sizing:border-box;
        margin:2px 4px 2px 0;
        width:calc((100% - 6px) / 2 );
        height:34px;
        background:rgba(88,143,255,0.15);
        color: #ffffff;
        border:1px solid #1e417a;
    }
    .executiveInfo .th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
    }
    .executiveInfo .marginRightZero{
        margin:2px 0px 2px 0;
    }
    .executiveInfo .listItem span{
        display: inline-block;
        border-right:1px solid #204c99;
        height:16px;
        margin-top:8px;
        text-align: center;
    }
    .executiveInfo .th span{
        border-right:none;
    }
    .executiveInfo .listItem:hover{
        background: rgba(40,92,198,0.35);
    }
    .executiveInfo .listItem .num{
        width:calc(15% - 6px);
        text-align: center;
    }
    .executiveInfo .listItem .position{
        width:calc((85% - 6px) / 3);
    }
    .executiveInfo .listItem .name{
        width:calc((85% - 6px) / 3);
    }
    .executiveInfo .listItem .shareAmount{
        width:calc((85% - 6px) / 4);
    }
    /*发行筹资（发行相关）*/
    .issueFinance {
        position: relative;
    }
    .issueFinance td.tdname{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        padding-left:18px;
        text-align: left;
    }
    .issueFinance td.tdname:hover{
        height:34px;
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
    }
    .issueFinance td.tdcon{
        height:34px;
        border:1px solid rgba(99,150,255,0.35);
        border-left:none;
        background:rgba(88,143,255,0.15);
        color:#fff;
        line-height:28px;
        padding-left:38px;
        text-align: left;
    }
    .issueFinance td.tdcon:hover{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-left:none;
        box-sizing: border-box;
        padding-left:38px;
    }
    .issueFinance td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .issueFinance tr:hover td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .issueFinance td.borderRightNone{
        border-right:none;
    }
    .issueFinance td.borderRightNone:hover{
        border-right:none;
    }
    /*参股控股公司*/
    .sharesHolding th{
        position: relative;
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
        text-align: left;
        padding:0 10px;
    }
    .sharesHolding .firstTh{
        border-left:1px solid #284f9d;
        width:8%;
        text-align: center;
    }
    .sharesHolding .secondTh{
        width:12%;
    }
    .sharesHolding .thirdTh{
        width:10%;
    }
    .sharesHolding .fourthTh,.sharesHolding .fifthTh{
        width:10%;
        cursor: pointer;
    }
    .sharesHolding .sixthTh{
        width:15%;
        cursor: pointer;
    }
    .sharesHolding .seventhTh{
        width:12%;
        cursor: pointer;
    }
    .sharesHolding .lastTh{
        border-right:1px solid #284f9d;
        width:33%;
    }
    .sharesHolding td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
        padding:10px 10px;
        vertical-align: top;
    }
    .sharesHolding tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .sharesHolding .lastTd{
        border-right:1px solid #1f3b6d;
    }
    .sharesHolding .firstTd{
        border-left:1px solid #1f3b6d;
        box-sizing: border-box;
        text-align: center;
    }
    .sharesHolding tr:hover .firstTd{
        border-left:1px solid #1f3b6d;
        box-sizing: border-box;
    }
    .sharesHolding tr:hover .lastTd{
        border-right:1px solid #1f3b6d;
        box-sizing: border-box;
    }
    .totalNum{color:#00c5ff;}
    .summaryItem{color:#fff;}
    th span
    {
        float: left;
        margin-right: 4px;
    }
    th i{
        position: absolute;
        top:30%;
        width: 0;
        height: 0;
        border:6px solid transparent;
        border-top: 6px solid #fff;
        margin-top: 6px;
        cursor: pointer;
    }
    th.up i{
        border:6px solid transparent;
        border-bottom: 6px solid #fff;
        margin-top: 0px;
        margin-bottom: 6px;
    }
    .boot-page {
        height: auto;
    }
</style>
