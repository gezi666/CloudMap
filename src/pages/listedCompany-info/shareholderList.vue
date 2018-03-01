<template>
    <div class="boot-page"  v-loading="loading" element-loading-text="数据加载中...">
        <div class="shareholderEquity">
            <!--十大流通股东-->
            <div class="tenShareholders">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                            十大流通股东
                        </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current==index ? 'active' : '']" v-for="(item,index) in tenCirculate.date"  @click="tab(index,item)">{{item}}</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">机构或基金名称</th>
                        <th class="secondTh">持有数量（股）</th>
                        <th>持股变化（股）</th>
                        <th>占流通股比例</th>
                        <th>机构成本估算（元）</th>
                        <th>实际增减持</th>
                        <th>股份类型</th>
                        <th class="lastTh">持股详情</th>
                    </tr>
                    <tr v-for="(item,index) in tenCirculate.details">
                        <td class="firstTd">{{item.admName | isValue}}</td>
                        <td>{{item.holdAmount | isValue}}</td>
                        <td :class="{classA:item.sharesChangeStatus==1,classB:item.sharesChangeStatus==2,classC:item.sharesChangeStatus==3,classD:item.sharesChangeStatus==4}">{{item.sharesChange | isValue}}</td>
                        <td>{{item.circulateRadio | isValue}}</td>
                        <td>{{item.costEstimate | isValue}}</td>
                        <td :class="{classA:item.ActualAddMinusStatus==1,classB:item.ActualAddMinusStatus==2,classC:item.ActualAddMinusStatus==3,classD:item.ActualAddMinusStatus==4}">{{item.ActualAddMinus | isValue}}</td>
                        <td>{{item.sharesType | isValue}}</td>
                        <td class="lastTd"><a class="look-a" @click="showPopup(item.admName,item.id)">查看</a></td>
                    </tr>
                </table>
            </div>
            <!--十大股东-->
            <div class="tenShareholders">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        十大股东
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current2==index ? 'active' : '']" v-for="(item,index) in tenShareholder.date"  @click="tab2(index,item)">{{item}}</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">机构或基金名称</th>
                        <th class="secondTh">持有数量（股）</th>
                        <th>持股变化（股）</th>
                        <th>占流通股比例</th>
                        <th>机构成本估算（元）</th>
                        <th>实际增减持</th>
                        <th>股份类型</th>
                        <th class="lastTh">持股详情</th>
                    </tr>
                    <tr v-for="(item,index) in tenShareholder.details">
                        <td class="firstTd">{{item.admName | isValue}}</td>
                        <td>{{item.holdAmount | isValue}}</td>
                        <td :class="{classA:item.sharesChangeStatus==1,classB:item.sharesChangeStatus==2,classC:item.sharesChangeStatus==3,classD:item.sharesChangeStatus==4}">{{item.sharesChange | isValue}}</td>
                        <td>{{item.circulateRadio | isValue}}</td>
                        <td>{{item.costEstimate | isValue}}</td>
                        <td :class="{classA:item.ActualAddMinusStatus==1,classB:item.ActualAddMinusStatus==2,classC:item.ActualAddMinusStatus==3,classD:item.ActualAddMinusStatus==4}">{{item.ActualAddMinus | isValue}}</td>
                        <td>{{item.sharesType | isValue}}</td>
                        <td class="lastTd"><a class="look-a" @click="showPopup2(item.admName,item.id)">查看</a></td>
                    </tr>
                </table>
            </div>
            <!--解禁时间表-->
            <div class="liftTimetable">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        解禁时间表
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">解禁日期</th>
                        <th>解禁股成本（元）</th>
                        <th>前日收盘价（元）</th>
                        <th>解禁市值（元）</th>
                        <th>解禁股占总股本比例</th>
                        <th>解禁股份类型</th>
                        <th class="lastTh">是否实际值</th>
                    </tr>
                    <tr v-for="(item,index) in liftTimetable">
                        <td class="firstTd">{{item.liftDate | isValue}}</td>
                        <td>{{item.liftCost | isValue}}</td>
                        <td>{{item.closePrice | isValue}}</td>
                        <td>{{item.liftShareWorth | isValue}}</td>
                        <td>{{item.liftShareRadio | isValue}}</td>
                        <td>{{item.liftShareType | isValue}}</td>
                        <td class="lastTd">{{item.isRealValue | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--总股本结构-->
            <div class="totalStockStru">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        总股本结构
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">日期</th>
                        <th>总股本（股）</th>
                        <th>A股总股本（股）</th>
                        <th>流通A股（股）</th>
                        <th>限售A股（股）</th>
                        <th class="lastTh">变动原因</th>
                    </tr>
                    <tr v-for="(item,index) in totalStockStru">
                        <td class="firstTd">{{item.date | isValue}}</td>
                        <td>{{item.totalShares | isValue}}</td>
                        <td>{{item.aTotalShares | isValue}}</td>
                        <td>{{item.aCirculateShares | isValue}}</td>
                        <td>{{item.aSaleShares | isValue}}</td>
                        <td class="lastTd">{{item.changeReason | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--A股历次股本变动-->
            <div class="tatalStockStru">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        A股历次股本变动
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">变动日期</th>
                        <th>变动原因</th>
                        <th>变动后A股总股本（股）</th>
                        <th>变动后流通A股（股）</th>
                        <th class="lastTh">变动后限售A股（股）</th>
                    </tr>
                    <tr v-for="(item,index) in aStockChanges">
                        <td class="firstTd">{{item.date | isValue}}</td>
                        <td>{{item.changeReason | isValue}}</td>
                        <td>{{item.aTotalShares | isValue}}</td>
                        <td>{{item.aCirculateShares | isValue}}</td>
                        <td class="lastTd">{{item.aSaleShares | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--股东人数增减量排名-->
            <div class="addMinusRank tatalStockStru clearfix">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        股东人数增减量排名
                    </span>
                </h3>
                <table class="halfTable fl topTen">
                    <tr>
                        <th class="firstTh lastTh" colspan="3">同行业股东人数增减少前10名</th>
                    </tr>
                    <tr>
                        <th class="firstTh">股票名称</th>
                        <th>股东人数</th>
                        <th class="lastTh">较上期变化</th>
                    </tr>
                    <tr v-for="(item,index) in addMinusRankTop">
                        <td class="firstTd">{{item.stockName | isValue}}</td>
                        <td class="secondTd">{{item.holdersAmount | isValue}}</td>
                        <td class="lastTd">{{item.holdersChanges | isValue}}</td>
                    </tr>
                </table>
                <table class="halfTable fr bottomTen">
                    <tr>
                        <th class="firstTh lastTh" colspan="3">同行业股东人数增减少后10名</th>
                    </tr>
                    <tr>
                        <th class="firstTh">股票名称</th>
                        <th>股东人数</th>
                        <th class="lastTh">较上期变化</th>
                    </tr>
                    <tr v-for="(item,index) in addMinusRankBottom">
                        <td class="firstTd">{{item.stockName | isValue}}</td>
                        <td class="secondTd">{{item.holdersAmount | isValue}}</td>
                        <td class="lastTd">{{item.holdersChanges | isValue}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <!--弹框-->
        <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false" custom-class="el-dialog-historyShares">
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">历史持股</span>
                    </h4>
                </div>
                <p class="title">{{title}}</p>
                <div class="echarts">
                    <bar-chart :barChartId="'bar'+entId" :dataList="barData"></bar-chart>
                </div>
                <div class="dialog-table">
                    <table>
                        <tr>
                            <th class="firstTh">报告日期</th>
                            <th class="secondTh">持有数量（万股）</th>
                            <th>占比（%）</th>
                            <th class="lastTh">增减情况（万股）</th>
                        </tr>
                        <tr v-for="(item,index) in historyShares">
                            <td class="firstTd">{{item.reportDate | isValue}}</td>
                            <td>{{item.shareQuantity | isValue}}</td>
                            <td>{{item.shareProportion | isValue}}</td>
                            <td class="lastTd">{{item.shareRegulation | isValue}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import barChart from '@/pages/listedCompany-info/components/barChart.vue'
    export default {
        name: 'shareholderList',
        mounted(){
//            十大流通股东
            api.Get('/cloudMap/listedCompany/getTenCirculateShareholderList', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.loading=false;
                this.tenCirculate = res.data;
            })
//            十大流通股东--弹窗图表
            api.Get('/cloudMap/listedCompany/getTenCirculateShareholderDetailsChart', {
                "entId": 1,
                "entName": this.entName,
                "admId":this.admId,
            }).then((res) => {
                this.barData = res.data;
            })
//            十大流通股东--弹窗列表
            api.Get('/cloudMap/listedCompany/getTenCirculateShareholderDetailsTable', {
                "entId": 1,
                "entName": this.entName,
                "admId":this.admId,
            }).then((res) => {
                this.historyShares = res.data;
            })
//            十大股东
            api.Get('/cloudMap/listedCompany/getTenShareholderList2', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.tenShareholder = res.data;
            })
//            十大股东--弹窗图表
            api.Get('/cloudMap/listedCompany/getTenShareholderDetailsChart2', {
                "entId": 1,
                "entName": this.entName,
                "admId":this.admId,
            }).then((res) => {
                this.barData = res.data;
            })
//            十大股东--弹窗列表
            api.Get('/cloudMap/listedCompany/getTenShareholderDetailsTable', {
                "entId": 1,
                "entName": this.entName,
                "admId":this.admId,
            }).then((res) => {
                this.historyShares = res.data;
            })
//            解禁时间表
            api.Get('/cloudMap/listedCompany/getLiftTimetableList', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.liftTimetable = res.data;
            })
//           总股本构成
            api.Get('/cloudMap/listedCompany/getTotalStockStru', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.totalStockStru = res.data;
            })
//            A股历次变动股本
            api.Get('/cloudMap/listedCompany/getAStockChanges', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.aStockChanges = res.data;
            })
//            同行业股东人数增减少钱10名
            api.Get('/cloudMap/listedCompany/addMinusRankTop10', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.addMinusRankTop = res.data;
            })
//            同行业股东人数增减少后10名
            api.Get('/cloudMap/listedCompany/addMinusRankBottom10', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.addMinusRankBottom = res.data;
            })
        },
        data () {
            return {
                loading:true,
                entId:1,
                entName:this.$router.currentRoute.params.entName,
                dialogVisible: false,
                title:'',  //弹出框title
                current:0,
                current2:0,
                classA: 'classA',  //表格增加减少类名变量--不变
                classB: 'classB',  //表格增加减少类名变量--增加
                classC: 'classC',  //表格增加减少类名变量--减少
                classD: 'classD',  //表格增加减少类名变量--新进
                barData:{},        //弹出框--图表数据
                admId:1,
                tenCirculate:[],
                tenShareholder:[],
                liftTimetable:[],
                totalStockStru:[],
                aStockChanges:[],
                addMinusRankTop:[],
                addMinusRankBottom:[],
                historyShares:[]
            }
        },
        methods:{
//十大流通股东--切换
            tab(i){
                this.current=i;
                this.fetList(this.tenCirculate.date[i],'/cloudMap/listedCompany/getTenCirculateShareholderList',this.tenCirculate)
            },
//十大股东--切换
            tab2(i){
                this.current2=i;
                this.fetList(this.tenShareholder.date[i],'/cloudMap/listedCompany/getTenShareholderList2',this.tenShareholder)
            },
            fetList(dateType,url,data){
                api.Get(url, {
                    "entId": 1,
                    "entName": this.entName,
                    "dateType": dateType,
                }).then((res) => {
                    data = res.data;
                })
            },
//十大流通股东--弹出框
            showPopup(txt,admId){
                this.dialogVisible = true;
                this.title = txt;
                api.Get('/cloudMap/listedCompany/getTenCirculateShareholderDetailsChart', {
                    "entId": 1,
                    "entName": this.entName,
                    "admId":admId
                }).then((res) => {
                    this.barData = res.data;
                })
                api.Get('/cloudMap/listedCompany/getTenCirculateShareholderDetailsTable', {
                    "entId": 1,
                    "entName": this.entName,
                    "admId":admId
                }).then((res) => {
                    this.historyShares = res.data;
                })
            },
//十大股东--弹出框
            showPopup2(txt,admId){
                this.dialogVisible = true;
                this.title = txt;
                api.Get('/cloudMap/listedCompany/getTenShareholderDetailsChart2', {
                    "entId": 1,
                    "entName": this.entName,
                    "admId":admId
                }).then((res) => {
                    this.barData = res.data;
                })
                api.Get('/cloudMap/listedCompany/getTenShareholderDetailsTable', {
                    "entId": 1,
                    "entName": this.entName,
                    "admId":admId
                }).then((res) => {
                    this.historyShares = res.data;
                })
            }
        },
        components:{
            barChart
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
    table{
        margin-bottom:22px;
    }
    .tenShareholders table tr,.tenShareholders table tr:hover{
        cursor: pointer;
    }
    /*十大流通股东*/
    .tenShareholders th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
        text-align: left;
        padding:0 20px;
    }
    .tenShareholders .firstTh{
        border-left:1px solid #284f9d;
        width:20%;
    }
    .tenShareholders .lastTh{
        border-right:1px solid #284f9d;
    }
    .tenShareholders td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
        padding:0 20px;
    }
    .tenShareholders tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .tenShareholders .lastTd a{
        border-right:1px solid #1f3b6d;
        font-weight: bold;
        text-decoration: underline;
    }
    .tenShareholders tr:hover .lastTd a{
        color:#33b0ff;
        font-weight: bold;
        text-decoration: underline;
        cursor: pointer;
    }
    .tenShareholders .firstTd{
        border-left:1px solid #1f3b6d;
    }
    .tenShareholders tr:hover  .firstTd{
        border-left:1px solid #1f3b6d;
    }
    .tenShareholders td.classA{
       color:#fff;
    }
    .tenShareholders td.classB{
        color:#e07567;
    }
    .tenShareholders td.classB:after{
        content:" ↑";
        color:#e07567;
        font-weight:bold;
    }
    .tenShareholders td.classC{
        color:#3cd947;
    }
    .tenShareholders td.classC:before{
        content:"- ";
        color:#3cd947;
        font-weight:bold;
    }
    .tenShareholders td.classC:after{
        content:" ↓";
        color:#3cd947;
        font-weight:bold;
    }
    .tenShareholders td.classD{
        color:#ff6344;
    }
    /*解禁时间表*/ /*总股本结构*/
    .liftTimetable th,.tatalStockStru th{
        height:34px;
        background: rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
        text-align: left;
        padding:0 20px;
    }
    .liftTimetable .firstTh,.tatalStockStru .firstTh{
        border-left:1px solid #284f9d;
    }
    .liftTimetable .lastTh,.tatalStockStru .lastTh{
        border-right:1px solid #284f9d;
    }
    .liftTimetable td, .tatalStockStru td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
        padding:0 20px;
    }
    .liftTimetable tr:hover td,.tatalStockStru tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .liftTimetable .firstTd,.tatalStockStru .firstTd{
        border-left:1px solid #1f3b6d;
    }
    .liftTimetable tr:hover .firstTd,.tatalStockStru tr:hover .firstTd{
        border-left:1px solid #1f3b6d;
    }
    .tatalStockStru .lastTd{
        border-right:1px solid #1f3b6d;
    }
    .tatalStockStru tr:hover .lastTd{
        border-right:1px solid #1f3b6d;
    }
    .tatalStockStru .firstTh{
        width:12%;
    }
    /*股东人数增减量排名*/
    .addMinusRank .halfTable{
        width:49%;
    }
    .halfTable .firstTd{
        cursor: pointer;
        text-decoration: underline;
        font-weight: bold;
        width:40%;
    }
    .halfTable tr:hover .firstTd{
        color:#33b0ff;
        font-weight: bold;
    }
    .look-a{color:#fff;}
    /* 弹窗样式 */
    .dialog-con{
        height:600px;
        overflow:auto;
        overflow-x:hidden;
    }
    .dialog-con:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1);
    }
    .dialog-item{
        color:#fff;
        margin-left:14px;
        margin-right: 30px;
    }
    .dialog-item .item-name{
        margin-bottom:8px;
        margin-top: 24px;
    }
    .dialog-item .item-name span{
        height:15px;
        line-height:15px;
        font-size: 14px;
        color:#ffcc00;
    }
    .dialog-item .item-name i{
        margin-left:1px;
        margin-right:6px;
        height:15px;
        width:2px;
        background:#ffcc00;
    }
    .dialog-table{
        padding:0 35px;
    }
    /* 弹窗图表区域*/
    .echarts{
        width:100%;
        height: 350px;
        margin-bottom: 12px;
    }

</style>
