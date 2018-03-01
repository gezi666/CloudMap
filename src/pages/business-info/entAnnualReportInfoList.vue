<template>
    <div class="boot-page business-tabel" v-loading="loading" element-loading-text="数据加载中...">
        <div class="yearFilterWrapper">
            <ul class="yearFilter clearfix">
                <li class="fl" :class="[current==index ? 'active' : '']" v-for="(item,index) in year" @click='tab(index)'>{{item}}</li>
            </ul>
        </div>
        <div class="entAnnualReportInfoList overflowAuto">
            <!--企业基本信息-->
            <div  class="baseInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        企业基本信息
                    </span>
                </h3>
                <table>
                    <tr>
                        <td class="tdname">注册号/统一社会信用代码</td>
                        <td class="tdcon borderRightNone">{{baseInfo.codeOrRegistationNo | isValue}}</td>
                        <td class="tdname">企业名称</td>
                        <td class="tdcon">{{baseInfo.entName | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">企业联系电话</td>
                        <td class="tdcon borderRightNone">{{baseInfo.enterprisePhone | isValue}}</td>
                        <td class="tdname">邮政编码</td>
                        <td class="tdcon">{{baseInfo.postCode | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">企业通信地址</td>
                        <td class="tdcon" colspan="3">{{baseInfo.address | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">企业电子邮箱</td>
                        <td class="tdcon borderRightNone">{{baseInfo.email | isValue}}</td>
                        <td class="tdname">有限责任公司本年度是否发生股东股权转</td>
                        <td class="tdcon">{{baseInfo.ownShareChange | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">企业经营状态</td>
                        <td class="tdcon borderRightNone">{{baseInfo.operateStatus | isValue}}</td>
                        <td class="tdname">是否有网站或网店</td>
                        <td class="tdcon ">{{baseInfo.ownWebsite | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">企业是否有投资信息或购买其他公司股权</td>
                        <td class="tdcon borderRightNone">{{baseInfo.ownInvestmentOrMerger | isValue}}</td>
                        <td class="tdname">从业人数</td>
                        <td class="tdcon">{{baseInfo.employeeNumber | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--网站或网点信息-->
            <div  class="websiteInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        网站或网点信息
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">类型</th>
                        <th>名称</th>
                        <th class="lastTh">网站</th>
                    </tr>
                    <tr v-for="(item,index) in website">
                        <td class="firstTd">{{item.websiteCategary | isValue}}</td>
                        <td>{{item.websiteName | isValue}}</td>
                        <td class="lastTd">{{item.websiteUrl | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--股东（发起人）及出资信息-->
            <div  class="shareholderInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        股东（发起人）及出资信息
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">股东（发起人）</th>
                        <th>实缴出资额（万元）</th>
                        <th >认缴出资时间</th>
                        <th>认缴出资方式</th>
                        <th>实缴出资额（万元）</th>
                        <th>出资时间</th>
                        <th class="lastTh">出资方式</th>
                    </tr>
                    <tr v-for="(item,index) in shareholder">
                        <td class="firstTd">{{item.shareholderName | isValue}}</td>
                        <td>{{item.subscribedAmountSum | isValue}}</td>
                        <td>{{item.subscribedDate | isValue}}</td>
                        <td>{{item.subscribedType | isValue}}</td>
                        <td>{{item.paidAmountSum | isValue}}</td>
                        <td>{{item.paidDate | isValue}}</td>
                        <td class="lastTd">{{item.paidType | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--对外投资信息-->
            <div  class="investInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        对外投资信息
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">投资设立企业或购买股权企业名称</th>
                        <th class="lastTh">注册号/统一社会信用代码</th>
                    </tr>
                    <tr v-for="(item,index) in invest">
                        <td class="firstTd">{{item.entName | isValue}}</td>
                        <td class="lastTd">{{item.regNum | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--企业资产状况信息-->
            <div  class="entInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        企业资产状况信息
                    </span>
                </h3>
                <table>
                    <tr>
                        <td class="tdname">资产总额</td>
                        <td class="tdcon borderRightNone">{{entInfo.totalAssets | isValue}}</td>
                        <td class="tdname">所有者权益合计</td>
                        <td class="tdcon">{{entInfo.totalOwnersEquity | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">负债总额</td>
                        <td class="tdcon borderRightNone">{{entInfo.totalLiabilities | isValue}}</td>
                        <td class="tdname">营业总收入</td>
                        <td class="tdcon">{{entInfo.grossTradingIncome | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">利润总额</td>
                        <td class="tdcon borderRightNone">{{entInfo.totalProfit | isValue}}</td>
                        <td class="tdname">营业总收入中主营业务收入</td>
                        <td class="tdcon">{{entInfo.mainBusinessIncome | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">净利润</td>
                        <td class="tdcon borderRightNone">{{entInfo.netProfit | isValue}}</td>
                        <td class="tdname">纳税总额</td>
                        <td class="tdcon">{{entInfo.totalTaxAmount | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--对外提供保证担保信息-->
            <div  class="guaranteeInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        对外提供保证担保信息
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">债权人</th>
                        <th>债务人</th>
                        <th>主债权种类</th>
                        <th>主债权数额</th>
                        <th>履行债务的期限</th>
                        <th>保证的期间</th>
                        <th class="lastTh">保证的方式</th>
                    </tr>
                    <tr v-for="(item,index) in guarantee">
                        <td class="firstTd">{{item.creditor | isValue}}</td>
                        <td>{{item.debtor | isValue}}</td>
                        <td>{{item.creditorCategary | isValue}}</td>
                        <td>{{item.creditorAmount | isValue}}</td>
                        <td>{{item.fulfillObligation | isValue}}</td>
                        <td>{{item.assuranceDurn | isValue}}</td>
                        <td class="lastTd">{{item.assuranceType | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--股权变更信息-->
            <div  class="equityChangeInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                       股权变更信息
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">股东</th>
                        <th>变更前股权比例</th>
                        <th>变更后股权比例</th>
                        <th class="lastTh">股权变更日期</th>
                    </tr>
                    <tr v-for="(item,index) in equityChangeInfo">
                        <td class="firstTd">{{item.shareholderName | isValue}}</td>
                        <td>{{item.beforeRadio | isValue}}</td>
                        <td>{{item.afterRadio | isValue}}</td>
                        <td class="lastTd">{{item.changeDate | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--修改记录-->
            <div  class="changeRecordInfo">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                       修改记录
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">序号</th>
                        <th>修改事项</th>
                        <th>修改前</th>
                        <th>修改后</th>
                        <th class="lastTh">修改日期</th>
                    </tr>
                    <tr v-for="(item,index) in changeRecord">
                        <td class="firstTd">{{index + 1}}</td>
                        <td>{{item.changeItem | isValue}}</td>
                        <td>{{item.beforeChange | isValue}}</td>
                        <td>{{item.afterChange | isValue}}</td>
                        <td class="lastTd">{{item.changeDate | isValue}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'entAnnualReportInfoList',
        mounted(){
            api.Get('/cloudMap/business/getEntAnnualReportList',{
                "entId": 1,
                "entName":this.entName,
            }).then((res)=>{
                this.loading=false;
                this.year=res.data.year;
                this.baseInfo =res.data.details[0].annuaInfo;
                this.website =res.data.details[0].annuaWebsiteInfos;
                this.shareholder=res.data.details[0].annuaShareholderInvestmentInfos;
                this.invest =res.data.details[0].annuaOutInvestmentInfos;
                this.entInfo =res.data.details[0].annuaPropertyAssetInfos;
                this.guarantee =res.data.details[0].annuaOutGuaranteeInfos;
                this.equityChangeInfo =res.data.details[0].annuaEquityChangeInfos;
                this.changeRecord =res.data.details[0].annuaChangeInfos;
            })
        },
        data () {
            return {
                entName: this.$router.currentRoute.params.entName,
                current: 0,
                year:[],
                baseInfo: {},
                website: {},
                shareholder: {},
                invest: {},
                entInfo: {},
                guarantee: {},
                equityChangeInfo: {},
                changeRecord: {},
                loading:true
            }
        },
        methods:{
            handleSizeChange(val) {
//                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
//                console.log(`当前页: ${val}`);
                api.Get('/cloudMap/business/getEntAnnualReportList',{
                    "entId": 1,
                    "entName":this.entName,
                }).then((res)=>{
                    this.baseInfo =res.data.details.annuaInfo;
                    this.website =res.data.details.annuaWebsiteInfos;
                    this.shareholder=res.data.details.annuaShareholderInvestmentInfos;
                    this.invest =res.data.details.annuaOutInvestmentInfos;
                    this.entInfo =res.data.details.annuaPropertyAssetInfos;
                    this.guarantee =res.data.details.annuaOutGuaranteeInfos;
                    this.equityChangeInfo =res.data.details.annuaEquityChangeInfos;
                    this.changeRecord =res.data.details.annuaChangeInfos;
                })
            },
            tab(index){
                this.current=index;
                this.fetList(index);
            },
            fetList(index){
                api.Get('/cloudMap/business/getEntAnnualReportList',{
                    "entId": 1,
                    "entName":this.entName,
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.baseInfo =res.data.details[index].annuaInfo;
                    this.website =res.data.details[index].annuaWebsiteInfos;
                    this.shareholder =res.data.details[index].annuaShareholderInvestmentInfos;
                    this.invest =res.data.details[index].annuaOutInvestmentInfos;
                    this.entInfo =res.data.details[index].annuaPropertyAssetInfos;
                    this.guarantee =res.data.details[index].annuaOutGuaranteeInfos;
                    this.equityChangeInfo =res.data.details[index].annuaEquityChangeInfos;
                    this.changeRecord =res.data.details[index].annuaChangeInfos;
                })
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
    @import 'assets/css/tableStyle.css';
    .overflowAuto{
        height:354px;
    }
    .pageWrap{
        margin-bottom: 20px;
        height: 32px;
    }

    /*年份导航*/
    .yearFilterWrapper{
        position: relative;
        height:40px;
        margin-bottom:30px;
    }
    .yearFilter{
        position: absolute;
        left:50%;
        margin-left:-147px;
    }
    .yearFilter li{
        display:block;
        -webkit-border-radius: 16px;
        -moz-border-radius: 16px;
        border-radius: 16px;
        border:1px solid transparent;
        padding:0 12px;
        margin:0 17px;
        color:#fff;
        font-size:12px;
        text-decoration: none;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;

    }
    .yearFilter li.active{
        cursor: pointer;
        border:1px solid rgba(0,156,255,0.55);
        background:rgba(0,150,255,0.55);
        -webkit-box-shadow: 0 0 20px rgba(0,138,255,0.52);
        -moz-box-shadow: 0 0 20px  rgba(0,138,255,0.52);
        box-shadow: 0 0 20px rgba(0,138,255,0.52);
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
    }
    .yearFilter li:hover{
        cursor: pointer;
        border:1px solid rgba(0,156,255,0.55);
        background:rgba(0,150,255,0.55);
        -webkit-box-shadow: 0 0 20px rgba(0,138,255,0.52);
        -moz-box-shadow: 0 0 20px  rgba(0,138,255,0.52);
        box-shadow: 0 0 20px rgba(0,138,255,0.52);
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
    }
    /*企业基本信息*/
    /*企业信息*/
    .baseInfo td.tdname{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        padding-left:18px;
        text-align: left;
    }
    .baseInfo td.tdname:hover{
        height:34px;
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
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
        box-sizing: border-box;
        padding-left:38px;
    }
    .baseInfo td.tdcon:hover{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-left:none;
        box-sizing: border-box;
        padding-left:38px;
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
    /*网站信息*/
    .websiteInfo .lastTd{
        cursor: pointer;
        text-decoration: underline;
        font-weight: bold;
    }
    .websiteInfo .lastTd:hover{
        color:#33b0ff;
        font-weight: bold;
    }
    /*企业资产状况信息*/
    .entInfo td.tdname{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
        padding-left:18px;
    }
    .entInfo td.tdname:hover{
        height:34px;
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
        padding-left:18px;
    }
    .entInfo td.tdcon{
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
    .entInfo td.tdcon:hover{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-left:none;
        box-sizing: border-box;
    }
    .entInfo td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .entInfo tr:hover td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .entInfo td.borderRightNone{
        border-right:none;
    }
    .entInfo td.borderRightNone:hover{
        border-right:none;
    }
    .websiteInfo table tr:hover .lastTd{
        color:#33b0ff;
    }
</style>
