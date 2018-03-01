<template>
    <div class="boot-page"  v-loading="loading" element-loading-text="数据加载中...">
        <div class="companyFileList">
            <!--行业地位-->
            <div class="clearfix sharesHolding">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        行业地位
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current==index ? 'active' : '']" @click="tab(index,item)" v-for="(item,index) in industryPosition.date">{{item | isValue}}</li>
                </ul>

                <table>
                    <tr>
                        <th class="firstTh w8">股票代码</th>
                        <th class="w8">股票简称</th>
                        <th class="w4">排名</th>
                        <th class="w8" :class="{'up': isA }" @click="reOrder(0)">
                            <span>每股收益（元）</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="w9" :class="{'up': isB }" @click="reOrder(1)">
                            <span>每股净资产（元）</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="w9" :class="{'up': isC }" @click="reOrder(2)">
                            <span>每股现金流（元）</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="w9" :class="{'up': isD }" @click="reOrder(3)">
                            <span>净利润（元）</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="w9" :class="{'up': isE }" @click="reOrder(4)">
                            <span>营业收入（元）</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="w8" :class="{'up': isF }" @click="reOrder(5)">
                            <span>总资产（元）</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="w7" :class="{'up': isG }" @click="reOrder(6)">
                            <span>净资产收益率</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="w9" :class="{'up': isH }" @click="reOrder(7)">
                            <span>股东权益比率</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="w6" :class="{'up': isI }" @click="reOrder(8)">
                            <span>销售毛利率</span>
                            <i class="triangle"></i>
                        </th>
                        <th class="lastTh w8" :class="{'up': isJ }" @click="reOrder(9)">
                            <span>总股本（股）</span>
                            <i class="triangle"></i>
                        </th>
                    </tr>
                    <tr v-for="(item,index) in industryPosition.details">
                        <td class="firstTd">{{item.sharesCode}}</td>
                        <td>{{item.sharesName | isValue}}</td>
                        <td class="ranking">{{index+1}}</td>
                        <td>{{item.profit | isValue}}</td>
                        <td>{{item.assets | isValue}}</td>
                        <td>{{item.cashFlow | isValue}}</td>
                        <td>{{item.netProfit | isValue}}</td>
                        <td>{{item.businessIncome | isValue}}</td>
                        <td>{{item.totalAssets | isValue}}</td>
                        <td>{{item.profitRate | isValue}}</td>
                        <td>{{item.ratio | isValue}}</td>
                        <td>{{item.grossProfit | isValue}}</td>
                        <td class="lastTd">{{item.generalCapital | isValue}}</td>
                    </tr>
                </table>
                <div class="pageWrap"  v-if="this.totalRecord>this.pageSize">
                    <el-pagination
                            @current-change="handleCurrentChange()"
                            :current-page.sync="currentPage3"
                            :page-size="this.pageSize"
                            layout="prev, pager, next, jumper"
                            :total="this.totalRecord">
                    </el-pagination>
                </div>
            </div>
            <!--行业新闻-->
            <div class="issueFinance">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        行业新闻
                    </span>
                </h3>
                <ul class="clearfix newsDateList">
                    <!--右侧文字信息-->
                    <li v-for="(item,index) in industryNews.newsTop" :class='{marginRightZero:(index+1)%2==0}'>
                        <div class="con">
                            <h2 class="clearfix">
                                <a href="javascript:;" class="title">{{item.title | isValue}}</a>
                                <a href="javascript:;" class="fr lookAll">查看全文&gt;&gt;</a>
                            </h2>
                            <p>{{item.text}}</p>
                            <p class="right-details">
                                <span>{{item.source | isValue}}</span>
                                <span class="fr">{{item.times | isValue}}</span>
                            </p>
                        </div>
                    </li>
                    <li class="bottom-list">
                        <div class="con">
                            <p class="clearfix" v-for="(list,index) in industryNews.newsBottom" v-if="index<4"><i>·</i> <a href="javascript:;">{{list.name | isValue}}</a> <span class="fr">{{list.date | isValue}}</span></p>
                        </div>
                    </li>
                    <li class="bottom-list">
                        <div class="con marginRightZero">
                            <p class="clearfix" v-for="(list,index) in industryNews.newsBottom" v-if="index>=4 && index<8"><i>·</i> <a href="javascript:;">{{list.name | isValue}}</a> <span class="fr">{{list.date | isValue}}</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'industryAnalysisList',
        mounted(){
//行业地位
            api.Get('/cloudMap/listedCompany/getIndustryPositionList',{
                "entId": 1,
                "entName": this.entName,
                "page":1,
                "pageSize":this.pageSize,
                "shareIncomeOrder":this.shareIncomeOrder,
                "shareNetAssetsOrder":this.shareNetAssetsOrder,
                "shareCashFlowOrder":this.shareCashFlowOrder,
                "netProfitOrder":this.netProfitOrder,
                "businessIncomeOrder":this.businessIncomeOrder,
                "totalAssetsOrder":this.totalAssetsOrder,
                "assetsIncomeRateOrder":this.assetsIncomeRateOrder,
                "rightsRateOrder":this.rightsRateOrder,
                "saleNetRateOrder":this.saleNetRateOrder,
                "totalSharesOrder":this.totalSharesOrder
            }).then((res)=>{
                this.loading=false;
                this.industryPosition =res.data;
                this.totalRecord=res.totalRecord
            });
//行业新闻
            api.Get('/cloudMap/listedCompany/getIndustryNewsList',{
                "entId": 1,
                "entName": this.entName,
            }).then((res)=>{
                this.industryNews =res.data;
            });
        },
        data () {
            return {
                loading:true,
                entId:1,
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                current:0,
                currentPage3:1,
                datalist:[],
                industryPosition:[],
                industryNews:{},
                isA:false,        //表格排序上下三角形类名变量
                isB:false,
                isC:false,
                isD:false,
                isE:false,
                isF:false,
                isG:false,
                isH:false,
                isI:false,
                isJ:false,
                shareIncomeOrder:0,            //每股收益排序
                shareNetAssetsOrder:0,         //每股净资产排序
                shareCashFlowOrder:0,          //每股现金流排序
                netProfitOrder:0,              //净利润排序
                businessIncomeOrder:0,         //每股收益排序
                totalAssetsOrder:0,            //总资产排序
                assetsIncomeRateOrder:0,       //净资产收益率排序
                rightsRateOrder:0,             //股东权益比率排序
                saleNetRateOrder:0,            //销售毛利率排序
                totalSharesOrder:0             //总股本排序
            }
        },
        created:function () {
        },
        methods:{
            reOrder(n){
                if(n==0){
                    this.shareIncomeOrder=1;
                    this.shareNetAssetsOrder=this.shareCashFlowOrder=this.netProfitOrder=this.businessIncomeOrder=this.rightsRateOrder=this.totalAssetsOrder=this.assetsIncomeRateOrder=this.saleNetRateOrder=this.totalSharesOrder=0;
                    this.isA=!this.isA;
                }else if(n==1){
                    this.shareNetAssetsOrder=1;
                    this.shareIncomeOrder=this.shareCashFlowOrder=this.netProfitOrder=this.businessIncomeOrder=this.rightsRateOrder=this.totalAssetsOrder=this.assetsIncomeRateOrder=this.saleNetRateOrder=this.totalSharesOrder=0;
                    this.isB=!this.isB;
                }else if(n==2){
                    this.shareIncomeOrder=this.shareNetAssetsOrder=this.netProfitOrder=this.businessIncomeOrder=this.rightsRateOrder=this.totalAssetsOrder=this.assetsIncomeRateOrder=this.saleNetRateOrder=this.totalSharesOrder=0;
                    this.shareCashFlowOrder=1;
                    this.isC=!this.isC;
                }else if(n==3){
                    this.shareIncomeOrder=this.shareNetAssetsOrder=this.shareCashFlowOrder=this.businessIncomeOrder=this.rightsRateOrder=this.totalAssetsOrder=this.assetsIncomeRateOrder=this.saleNetRateOrder=this.totalSharesOrder=0;
                    this.netProfitOrder=1;
                    this.isD=!this.isD;
                }else if(n==4){
                    this.shareIncomeOrder=this.shareNetAssetsOrder=this.shareCashFlowOrder=this.netProfitOrder=this.rightsRateOrder=this.totalAssetsOrder=this.assetsIncomeRateOrder=this.saleNetRateOrder=this.totalSharesOrder=0;
                    this.businessIncomeOrder=1;
                    this.isE=!this.isE;
                }else if(n==5){
                    this.shareIncomeOrder=this.shareNetAssetsOrder=this.shareCashFlowOrder=this.netProfitOrder=this.rightsRateOrder=this.businessIncomeOrder=this.assetsIncomeRateOrder=this.saleNetRateOrder=this.totalSharesOrder=0;
                    this.totalAssetsOrder=1;
                    this.isF=!this.isF;
                }else if(n==6){
                    this.shareIncomeOrder=this.shareNetAssetsOrder=this.shareCashFlowOrder=this.netProfitOrder=this.rightsRateOrder=this.businessIncomeOrder=this.totalAssetsOrder=this.saleNetRateOrder=this.totalSharesOrder=0;
                    this.assetsIncomeRateOrder=1;
                    this.isG=!this.isG;
                }else if(n==7){
                    this.shareIncomeOrder=this.shareNetAssetsOrder=this.shareCashFlowOrder=this.netProfitOrder=this.rightsRateOrder=this.businessIncomeOrder=this.totalAssetsOrder=this.saleNetRateOrder=this.totalSharesOrder=0;
                    this.rightsRateOrder=1;
                    this.isH=!this.isH;
                }else if(n==8){
                    this.shareIncomeOrder=this.shareNetAssetsOrder=this.shareCashFlowOrder=this.netProfitOrder=this.rightsRateOrder=this.businessIncomeOrder=this.totalAssetsOrder=this.assetsIncomeRateOrder=this.totalSharesOrder=0;
                    this.saleNetRateOrder=1;
                    this.isI=!this.isI;
                }else{
                    this.shareIncomeOrder=this.shareNetAssetsOrder=this.shareCashFlowOrder=this.netProfitOrder=this.rightsRateOrder=this.businessIncomeOrder=this.totalAssetsOrder=this.assetsIncomeRateOrder=this.saleNetRateOrder=0;
                    this.totalSharesOrder=1;
                    this.isJ=!this.isJ;
                }
                api.Get('/cloudMap/listedCompany/getShareholdingList',{
                    "entId": 1,
                    "entName": this.entName,
                    "page":1,
                    "pageSize":this.pageSize,
                    "shareIncomeOrder":this.shareIncomeOrder,
                    "shareNetAssetsOrder":this.shareNetAssetsOrder,
                    "shareCashFlowOrder":this.shareCashFlowOrder,
                    "netProfitOrder":this.netProfitOrder,
                    "businessIncomeOrder":this.businessIncomeOrder,
                    "totalAssetsOrder":this.totalAssetsOrder,
                    "assetsIncomeRateOrder":this.assetsIncomeRateOrder,
                    "rightsRateOrder":this.rightsRateOrder,
                    "saleNetRateOrder":this.saleNetRateOrder,
                    "totalSharesOrder":this.totalSharesOrder
                }).then((res)=>{
                    this.sharesHolding =res.data;
                    this.totalRecord=res.totalRecord
                })
            },
            handleCurrentChange(val) {
                api.Get('/cloudMap/listedCompany/getIndustryPositionList',{
                    "entId": 1,
                    "entName": this.entName,
                    "page":val,
                    "pageSize":this.pageSize,
                    "shareIncomeOrder":this.shareIncomeOrder,
                    "shareNetAssetsOrder":this.shareNetAssetsOrder,
                    "shareCashFlowOrder":this.shareCashFlowOrder,
                    "netProfitOrder":this.netProfitOrder,
                    "businessIncomeOrder":this.businessIncomeOrder,
                    "totalAssetsOrder":this.totalAssetsOrder,
                    "assetsIncomeRateOrder":this.assetsIncomeRateOrder,
                    "rightsRateOrder":this.rightsRateOrder,
                    "saleNetRateOrder":this.saleNetRateOrder,
                    "totalSharesOrder":this.totalSharesOrder
                }).then((res)=>{
                    this.industryPosition =res.data;
                    this.totalRecord=res.totalRecord
                });
            },
            tab(i,item){
                this.current=i;
                this.fetList(item)
            },
            fetList(item){
                api.Get('/cloudMap/listedCompany/getIndustryPositionList',{
                    "entId": 1,
                    "entName": this.entName,
                    "page":1,
                    "pageSize":this.pageSize,
                    "dataType":item,
                    "shareIncomeOrder":this.shareIncomeOrder,
                    "shareNetAssetsOrder":this.shareNetAssetsOrder,
                    "shareCashFlowOrder":this.shareCashFlowOrder,
                    "netProfitOrder":this.netProfitOrder,
                    "businessIncomeOrder":this.businessIncomeOrder,
                    "totalAssetsOrder":this.totalAssetsOrder,
                    "assetsIncomeRateOrder":this.assetsIncomeRateOrder,
                    "rightsRateOrder":this.rightsRateOrder,
                    "saleNetRateOrder":this.saleNetRateOrder,
                    "totalSharesOrder":this.totalSharesOrder
                }).then((res)=>{
                    this.industryPosition =res.data;
                    this.totalRecord=res.totalRecord
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
    th span
    {
        float: left;
        /*margin-right: 4px;*/
    }
    .sharesHolding th{
        position: relative;
    }
    .sharesHolding table{
        margin-bottom:12px;
    }
    th i{
        position: absolute;
        right:2px;
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
    /*行业地位*/
    tr th,tr td {
        padding:0 12px 0 2px !important;
    }
    .firstTh,.firstTd{
        text-align: center;
    }
    .w4{
        width:4%;
    }
    /*行业新闻*/
    .newsDateList{
        width: 100%;
        margin-bottom:20px;
    }
    .newsDateList li{
        float:left;
        width:50%;
    }
    .newsDateList li .con{
        padding:16px;
        margin:0 5px 5px 0;
        background: rgba(88,143,255,0.15);
        border:1px solid rgba(99,150,255,0.35);
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    .newsDateList li.marginRightZero .con{
        margin:0 0px 5px 0;
    }
    .newsDateList li .marginRightZero{
        margin:0 0px 5px 0;
    }
    .newsDateList h2 a{
        font-size: 14px;
        font-weight: 700;
        text-decoration:underline;
        color: #fff;
        text-align: left;
        margin-bottom:5px;
    }
    .newsDateList h2 a:hover{
        color:#33b0ff;
        font-weight: bold;
    }
    .newsDateList h2 a.lookAll{
         font-size: 12px;
     }
    .newsDateList p{
        line-height:21px;
        margin-bottom:5px;
        font-size: 12px;
        color: #d5d7db;
    }
    /*icons*/
    .icons{
        display:inline-block;
        width:10px;
        height:10px;
        background:url(../listedCompany-info/assets/imgs/page-icon.png) no-repeat;
    }
    .icon-arrow-first{
        background-position:0 0;
    }
    .icon-arrow-last{
        background-position:-73px 0;
    }
    .icon-arrow-prev{
        background-position: -23px 0;
    }
    .icon-arrow-next{
        background-position:-49px 0;
    }
    .bottom-list p,.bottom-list p a{
        line-height: 22px;
        font-size: 14px;
        color: #fff;
        margin-bottom: 0;
    }
    .bottom-list p a:hover{
        color:#33b0ff;
        font-weight: bold;
    }
    .bottom-list p i{
        display: inline-block;
        float: left;
        margin-right: 3px;
        margin-top: 3px;
        line-height: 14px;
        font-size: 20px;
    }
    .bottom-list p span{
        font-size: 12px;
        color: rgba(255,255,255,0.7);
    }
    .newsDateList li:hover{
        cursor:pointer;
    }
    .pageWrap{
        margin-top:10px;
    }
</style>
