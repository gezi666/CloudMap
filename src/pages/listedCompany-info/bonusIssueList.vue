<template>
    <div class="boot-page"  v-loading="loading" element-loading-text="数据加载中...">
        <div class="companyFileList">
            <!-- 分红情况 -->
            <div class="bonusInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        分红情况
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">报告期</th>
                        <th>董事会日期</th>
                        <th>股东大会预案公告日期</th>
                        <th>实施日期</th>
                        <th>分红方案说明</th>
                        <th>A股股权登记日</th>
                        <th>A股除权除息日</th>
                        <th>方案进度</th>
                        <th class="w8">股利支付率</th>
                        <th class="lastTh w8">分红率</th>
                    </tr>
                    <tr v-for="(item,index) in shareOutBonus">
                        <td class="firstTd">{{item.reportDate | isValue}}</td><!--报告期-->
                        <td>{{item.boardDate | isValue}}</td><!--董事会日期-->
                        <td>{{item.noticeDate | isValue}}</td><!--股东大会预案公告日期-->
                        <td>{{item.implementDate | isValue}}</td><!--实施日期-->
                        <td>{{item.bonusSolutions | isValue}}</td><!--分红方案说明-->
                        <td>{{item.registrationDate | isValue}}</td><!--A股股权登记日-->
                        <td>{{item.exDividendDate | isValue}}</td><!--A股除权除息日-->
                        <td>{{item.planProgress | isValue}}</td><!--方案进度-->
                        <td>{{item.paymentRate | isValue}}</td> <!--股利支付率-->
                        <td class="lastTd">{{item.shareOutBonusRate | isValue}}</td><!--分红率-->
                    </tr>
                </table>
            </div>
            <!--增发概况-->
            <div  class="baseInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        增发概况
                    </span>
                    <a class="fr btn btn-show" v-show="showTable" @click="showTableFn('show')">展开</a>
                    <a class="fr btn btn-hide" v-show="hideTable" @click="showTableFn('hide')">收起</a>
                </h3>
                <div class="summaryItem" v-show="showTable">
                    <p>该股自上市以来累计增发<span class="totalNum">{{rightsIssueTotal.cumulative | isValue}}</span> 次，其中成功 <span class="totalNum">{{rightsIssueTotal.successful | isValue}}</span> 次，失败 <span class="totalNum">{{rightsIssueTotal.fail | isValue}}</span> 次，进行中 <span class="totalNum">{{rightsIssueTotal.inProgress | isValue}}</span> 次，累计实际募资净额为 <span class="totalNum">{{rightsIssueTotal.actualFundraising | isValue}}</span> 元。</p>
                </div>
                <div v-for="(increaseList,index) in increaseRightsIssue" :class="index==0 ? 'show' : 'hide'">
                    <table>
                        <tr>
                            <td class="tdname">方案进度</td>
                            <td class="tdcon borderRightNone">{{increaseList.projectProgress | isValue}}</td>
                            <td class="tdname">发行类型</td>
                            <td class="tdcon borderRightNone">{{increaseList.issueType | isValue}}</td>
                            <td class="tdname">发行方式</td>
                            <td class="tdcon ">{{increaseList.issueWay | isValue}}</td>
                        </tr>
                        <tr>
                            <td class="tdname">实际发行价格</td>
                            <td class="tdcon borderRightNone" colspan="2">{{increaseList.actualPrice | isValue}}</td>
                            <td class="tdname">新股上市公告日</td>
                            <td class="tdcon" colspan="2">{{increaseList.listedDate | isValue}}</td>
                        </tr>
                        <tr>
                            <td class="tdname">实际发行数量</td>
                            <td class="tdcon borderRightNone" colspan="2">{{increaseList.actualQuantity | isValue}}</td>
                            <td class="tdname">发行新股日</td>
                            <td class="tdcon" colspan="2">{{increaseList.issueDate | isValue}}</td>
                        </tr>
                        <tr>
                            <td class="tdname">实际募资净额</td>
                            <td class="tdcon borderRightNone" colspan="2">{{increaseList.actualFundraising | isValue}}</td>
                            <td class="tdname">证监会核准公告</td>
                            <td class="tdcon" colspan="2">{{increaseList.approvedDate | isValue}}</td>
                        </tr>
                        <tr>
                            <td class="tdname">预案发行价格</td>
                            <td class="tdcon borderRightNone" colspan="2">{{increaseList.preReleasePrice | isValue}}</td>
                            <td class="tdname">发审委公告日</td>
                            <td class="tdcon" colspan="2">{{increaseList.committeeDate | isValue}}</td>
                        </tr>
                        <tr>
                            <td class="tdname">预案发行数量</td>
                            <td class="tdcon borderRightNone" colspan="2">{{increaseList.preReleaseQuantity | isValue}}</td>
                            <td class="tdname">股东大会公告日</td>
                            <td class="tdcon" colspan="2">{{increaseList.shareholdersDate | isValue}}</td>
                        </tr>
                        <tr>
                            <td class="tdname">预案募资金额</td>
                            <td class="tdcon borderRightNone" colspan="2">{{increaseList.planFundraising | isValue}}</td>
                            <td class="tdname">董事会公告日</td>
                            <td class="tdcon" colspan="2">{{increaseList.directorsDate | isValue}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <!--配股概况-->
            <div  class="baseInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        配股概况
                    </span>
                </h3>
                <table v-for="item in rightsIssue">
                    <tr>
                        <td class="tdname">方案进度</td>
                        <td class="tdcon borderRightNone">{{item.projectProgress | isValue}}</td>
                        <td class="tdname">配股代码</td>
                        <td class="tdcon borderRightNone">{{item.rightsIssueCode | isValue}}</td>
                        <td class="tdname">配股简称</td>
                        <td class="tdcon borderRightNone">{{item.abbreviation | isValue}}</td>
                        <td class="tdname">配股年份</td>
                        <td class="tdcon" colspan="2">{{item.rightsIssueYear | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">实际配股比例</td>
                        <td class="tdcon borderRightNone" colspan="2">{{item.actualProportion | isValue}}</td>
                        <td class="tdname">配股上市日</td>
                        <td class="tdcon borderRightNone" colspan="2">{{item.stockListingDate | isValue}}</td>
                        <td class="tdname">证监会核准公告日</td>
                        <td class="tdcon" colspan="2">{{item.csrcApprovalDate | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">每股配股价格</td>
                        <td class="tdcon borderRightNone" colspan="2">{{item.unitPrice | isValue}}</td>
                        <td class="tdname ">缴款起止日</td>
                        <td class="tdcon borderRightNone" colspan="2">{{item.paymentDateStart | isValue}}至{{item.paymentDateEnd | isValue}}</td>
                        <td class="tdname">发审委公告日</td>
                        <td class="tdcon" colspan="2">{{item.porcAnnouncementDate | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">实际募集资金净额</td>
                        <td class="tdcon" colspan="8">{{item.actualMoney | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">预案配股比例上限</td>
                        <td class="tdcon borderRightNone" colspan="2">{{item.preProportion | isValue}}</td>
                        <td class="tdname">除权日</td>
                        <td class="tdcon borderRightNone" colspan="2">{{item.exRightDate | isValue}}</td>
                        <td class="tdname">股东大会公告日</td>
                        <td class="tdcon" colspan="2">{{item.shareholdersDate | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">预案募资金额上限</td>
                        <td class="tdcon borderRightNone" colspan="2">{{item.preMoney | isValue}}</td>
                        <td class="tdname">股权登记日</td>
                        <td class="tdcon borderRightNone" colspan="2">{{item.equityRegistrationDate | isValue}}</td>
                        <td class="tdname">董事会公告日</td>
                        <td class="tdcon" colspan="2">{{item.directorsDate | isValue}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'bonusIssueList',
        mounted(){
//主营介绍
            api.Get('/cloudMap/listedCompany/getBonusInfoList', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.loading=false;
                this.shareOutBonus = res.data;
            })
//增发概况
            api.Get('/cloudMap/listedCompany/getIncreaseRightsIssue', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.increaseRightsIssue = res.data.increaseRightsIssue;
                this.rightsIssueTotal = res.data.rightsIssueTotal;
            })
//配股概况
            api.Get('/cloudMap/listedCompany/getRightsIssue', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.rightsIssue = res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                showTable:true,
                hideTable:false,
                show:'show',
                hide:'hide',
                shareOutBonus:[],
                rightsIssueTotal:{},
                increaseRightsIssue:[],
                rightsIssue:[],
                loading:true
            }
        },
        methods:{
            showTableFn(state){
                if(state=='show'){
                    this.showTable=false;
                    this.hideTable=true;
                    this.hide='showHide';
                }else{
                    this.showTable=true;
                    this.hideTable=false;
                    this.hide='hide'
                }
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
    @import 'assets/css/common.css';
    .btn{
        display:block;
        width:48px;
        height:20px;
        line-height:20px;
        text-align:center;
        font-size:14px;
        cursor:pointer;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        margin-right:4px;
        color:rgba(255,255,255,0.7);
        text-decoration:none;
    }
    .btn:hover{
        opacity:.8;
    }
    .btn-show{
        border:1px solid rgba(0,156,255,0.85);
        background: rgba(0,150,255,0.45);
    }
    .btn-hide{
        border:1px solid #ff8718;
        border-top-color:#ffc233;
        border-bottom-color:#ff8718;
        background:-webkit-gradient(linear, 0 top, 0 bottom, from(#ad791e), to(#ad8d33));
    }
    .show,.showHide{display:block;}
    .hide{display:none;}
    .companyFileList table{
        margin-bottom:22px;
    }
    /*分红情况*/
    .bonusInfo th{
        padding:0 2px 0 0 !important;
        width:10%;
        white-space: nowrap;
    }
    .bonusInfo .w8{
        width:8%;
    }
    .bonusInfo td {
        padding:0 0px !important;
    }
    .bonusInfo .firstTh, .bonusInfo .firstTd{
        text-align: left;
        padding-left:10px !important;
    }
    /*参股控股公司*/
    .totalNum{color:#00c5ff;}
    .summaryItem{color:#fff;}
    /*配股概况    增发概况*/
    .baseInfo td.tdname{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
        padding-left: 18px;
    }
    .baseInfo td.tdname:hover{
        height:34px;
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
        padding-left: 18px;
    }
    .baseInfo td.tdcon{
        height:34px;
        border:1px solid rgba(99,150,255,0.35);
        border-left:none;
        background:rgba(88,143,255,0.15);
        color:#fff;
        line-height:28px;
        padding:0 10px;
        text-align: left;
        padding-left: 38px;
        box-sizing: border-box;
    }
    .baseInfo td.tdcon:hover{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-left:none;
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

</style>
