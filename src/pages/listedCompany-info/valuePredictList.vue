<template>
    <div class="boot-page"  v-loading="loading" element-loading-text="数据加载中...">
        <!--价值预测-->
        <div class="companyFileList">
            <!--业绩预测-->
            <div class="achievement">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">业绩预测</span>
                </h3>
                <div class="achLeft">
                    <p class="achTitle">
                        <span>汇总--预测年报每股收益</span>
                        <span>单位：元</span>
                    </p>
                    <table class="achTable">
                        <thead>
                            <tr>
                                <th class="years">年度</th>
                                <th class="institutionsNum">预测机构数</th>
                                <th class="minimum">最小值</th>
                                <th class="shareAmount meanValue">均值</th>
                                <th class="maximum">最大值</th>
                                <th class="average borderRightNone">行业平均数</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="listItem marginRight" v-for="item in executive">
                                <td class="years">{{item.years | isValue}}</td>
                                <td class="institutionsNum">{{item.institutionsNum | isValue}}</td>
                                <td class="minimum">{{item.minimum | isValue}}</td>
                                <td class="shareAmount meanValue">{{item.meanValue | isValue}}</td>
                                <td class="maximum">{{item.maximum | isValue}}</td>
                                <td class="borderRightNone average">{{item.average | isValue}}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!--分页-->
                    <div class="pageWrap"  v-if="this.totalRecord1>this.pageSize">
                        <el-pagination
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage1"
                                :page-size="pageSize"
                                layout="prev, pager, next, jumper"
                                :total="this.totalRecord1">
                        </el-pagination>
                    </div>
                </div>

                <!--预测年报净利润-->
                <div class="achrRight">
                    <p class="achTitle">
                        <span>汇总--预测年报净利润</span>
                        <span>单位：亿元</span>
                    </p>
                    <table class="achTable">
                        <thead>
                            <tr>
                                <th>年度</th>
                                <th class="institutionsNum">预测机构数</th>
                                <th >最小值</th>
                                <th>均值</th>
                                <th>最大值</th>
                                <th class="average">行业平均数</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="listItem" v-for="item in profit">
                                <td class="years">{{item.years | isValue}}</td>
                                <td class="institutionsNum">{{item.institutionsNum | isValue}}</td>
                                <td class="minimum">{{item.minimum | isValue}}</td>
                                <td class="shareAmount meanValue">{{item.meanValue | isValue}}</td>
                                <td class="maximum">{{item.maximum | isValue}}</td>
                                <td class="average">{{item.average | isValue}}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!--分页-->
                    <div class="pageWrap"  v-if="this.totalRecord2>this.pageSize">
                        <el-pagination
                                @current-change="handleCurrentChange2"
                                :current-page="currentPage2"
                                :page-size="pageSize"
                                layout="prev, pager, next, jumper"
                                :total="this.totalRecord2">
                        </el-pagination>
                    </div>
                </div>
            </div>

            <!--详细指标预测-->
            <div class="indexPrediction">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">详细指标预测</span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">预测指标</th>
                        <th v-for="item in details.predictionIndex">{{item | isValue}}</th>
                    </tr>

                    <tr>
                        <td>营业收入（元）</td>
                        <td v-for="item in details.income">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td>营业收入增长率</td>
                        <td v-for="item in details.growthRate">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td>利润总额（元）</td>
                        <td v-for="item in details.totalProfit">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td>净利润（元）</td>
                        <td v-for="item in details.netProfit">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td>净利润增长率</td>
                        <td v-for="item in details.profitGrowthDate">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td>每股现金流（元）</td>
                        <td v-for="item in details.cashFlow">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td>每股净资产（元）</td>
                        <td v-for="item in details.netAssets">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td>净资产收益率</td>
                        <td v-for="item in details.rateReturn">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td>市盈率（动态）</td>
                        <td v-for="item in details.earningsRatio">{{item | isValue}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'companyFileList',
        data () {
            return {
                loading:true,
                pageSize:50,
                currentPage1: 1,
                currentPage2: 1,
                totalRecord1:'',
                totalRecord2:'',
                executive:{},
                profit: {},
                details:{}
            }
        },
        methods:{
            //业绩预测列表--左侧
            achieLeftList(params){
                api.Get('/cloudMap/internetInfo/getExecutivetList',params).then((res)=>{
                    this.executive=res.data;
                    this.totalRecord1=res.totalRecord;
                })
            },
            //业绩预测列表--右侧
            achieRightList(params){
                api.Get('/cloudMap/internetInfo/getProfitList',params).then((res)=>{
                    this.loading=false;
                    this.profit=res.data;
                    this.totalRecord2=res.totalRecord;
                })
            },
            //详细指标预测列表
            getList(params){
                api.Get('/cloudMap/listedCompany/getIndexPredictionList',params).then((res)=>{
                    this.details =res.data;
                })
            },
            handleCurrentChange1(val) {//分页 左侧
                this.achieLeftList({
                    entId:1,
                    entName: this.$router.currentRoute.params.entName,
                    page: val,
                    pageSize: this.pageSize
                })
            },
            handleCurrentChange2(val) { //右侧
                this.achieRightList({
                    entId:1,
                    entName: this.$router.currentRoute.params.entName,
                    page: val,
                    pageSize: this.pageSize
                })
            }
        },
        mounted(){
            //业绩预测列表-左侧
            this.achieLeftList({
                entId:1,
                entName: this.$router.currentRoute.params.entName,
                page:1,
                pageSize:this.pageSize
            });
            //业绩预测列表-右侧
            this.achieRightList({
                entId:1,
                entName: this.$router.currentRoute.params.entName,
                page:1,
                pageSize:this.pageSize
            });

            //详细指标预测列表
            this.getList({
                entId:1,
                entName: this.$router.currentRoute.params.entName,
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
    @import 'assets/css/common.css';
    .boot-page {
        width: 100%;
        height: 100%;
    }
    /*业绩预测*/
    .achievement{
        margin-bottom:22px;
    }
    .achTitle{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #cdcdd0;
        margin:3px;
    }
    .achLeft,.achrRight{
        display: inline-block;
        width: calc((100% - 4px) / 2 );
    }
    .achTable .tableSpan{
        width: 1px;
        height: 16px;
        background: rgb(32, 76, 153);;
        float: right;
        margin-top: 3px;
    }
    .achTable td:first-child,.achTable th:first-child {
        border-left: 1px solid rgba(99,150,255,0.35);
    }
    .achTable td:last-child,.achTable th:last-child {
        border-right: 1px solid rgba(99,150,255,0.35);
    }
    .achTable tr th{
        text-align: left;
        padding: 0 10px;
    }
    .achTable tr td{
        text-align: left;
        padding: 0 10px;
    }
    .institutionsNum{
        width:16%;
    }
    .average{
        width:16%;
    }
    /*详细指标预测*/
    .indexPrediction .firstTh{
        border-left:1px solid #284f9d;
        text-align: left;
    }
    .indexPrediction .lastTh{
        border-right:1px solid #284f9d;
    }
</style>
