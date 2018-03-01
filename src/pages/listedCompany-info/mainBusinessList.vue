<template>
    <div class="boot-page"  v-loading="loading" element-loading-text="数据加载中...">
        <div class="mainBusness">
            <!--主营介绍-->
            <div  class="mainBusnessIntro">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        主营介绍
                    </span>
                </h3>
                <table>
                    <tr>
                        <td class="tdname">产品类型</td>
                        <td class="tdcon">{{mainBusinessIntro.productType | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">产品名称</td>
                        <td class="tdcon">{{mainBusinessIntro.productName | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="tdname">经营范围</td>
                        <td class="tdcon">{{mainBusinessIntro.businessArea | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--主营构成分析-->
            <div class="mainBusnessAnalysis">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        主营构成分析
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current==index ? 'active' : '']" @click="tab(index,item)" v-for="(item,index) in mainBusinessAnalysis.date">{{item | isValue}}</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh" colspan="2">业务名称</th>
                        <th class="secondTh">营业收入（元）</th>
                        <th>收入比例</th>
                        <th>营业成本（元）</th>
                        <th>成本比例</th>
                        <th>利润比例</th>
                        <th class="lastTh">毛利率</th>
                    </tr>
                    <tr v-for="(item,index) in mainBusinessAnalysis.industry">
                        <td class="tdname" :rowspan="mainBusinessAnalysis.industry.length" v-if="index==0">按行业</td>
                        <td class="firstTd tdcon w20">{{item.businessName | isValue}}</td>
                        <td class="tdcon">{{item.businessIncome | isValue}}</td>
                        <td class="tdcon">{{item.incomeRate | isValue}}</td>
                        <td class="tdcon">{{item.businessCost | isValue}}</td>
                        <td class="tdcon">{{item.costRate | isValue}}</td>
                        <td class="tdcon">{{item.profitRate | isValue}}</td>
                        <td class="tdcon lastTd">{{item.netProfit | isValue}}</td>
                    </tr>
                    <tr v-for="(item,index) in mainBusinessAnalysis.area">
                        <td class="tdname" :rowspan="mainBusinessAnalysis.area.length" v-if="index==0">按区域</td>
                        <td class="firstTd tdcon w20">{{mainBusinessAnalysis.area[0].businessName | isValue}}</td>
                        <td class="tdcon">{{mainBusinessAnalysis.area[0].businessIncome | isValue}}</td>
                        <td class="tdcon">{{mainBusinessAnalysis.area[0].incomeRate | isValue}}</td>
                        <td class="tdcon">{{mainBusinessAnalysis.area[0].businessCost | isValue}}</td>
                        <td class="tdcon">{{mainBusinessAnalysis.area[0].costRate | isValue}}</td>
                        <td class="tdcon">{{mainBusinessAnalysis.area[0].profitRate | isValue}}</td>
                        <td class="tdcon lastTd">{{mainBusinessAnalysis.area[0].netProfit | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--董事会经营评述-->
            <div class="directorateCommentary">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        董事会经营评述
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current2==index ? 'active' : '']" @click="tab2(index,item)" v-for="(item,index) in directorateCommentary.date">{{item | isValue}}</li>
                </ul>
                <table>
                    <tr>
                        <td>
                            <div :class=" showAll0 ? 'active' : 'showall' ">
                                {{directorateCommentary.commentary | isValue}}
                            </div>
                            <div class="checkAll" @click="showAllFn0" v-html="showAll0 ? '收起<<' : '查看全部>>'"></div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'mainBusinessList',
        mounted(){
//主营介绍
            api.Get('/cloudMap/listedCompany/getMainBusinessIntro', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.loading=false;
                this.mainBusinessIntro = res.data;
            })
//主营构成分析
            api.Get('/cloudMap/listedCompany/getMainBusinessAnalysisList', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.mainBusinessAnalysis = res.data;
                this.length=res.data.industry.length;
            })
//董事会经营评述
            api.Get('/cloudMap/listedCompany/getDirectorateCommentary', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.directorateCommentary = res.data;
            })
        },
        data () {
            return {
                loading:true,
                entId:1,
                entName:this.$router.currentRoute.params.entName,
                length:'',        //主营构成分析--按行业--数组长度
                showAll0:false,  //查看全部变量
                current:0,
                current2:0,
                mainBusinessIntro:{},
                mainBusinessAnalysis:{},
                directorateCommentary:{}
            }
        },
        methods:{
            showAllFn0(){
                this.showAll0=!this.showAll0;
            },
            tab(i,item){
                this.current=i;
                this.fetList(item);
            },
            tab2(i,item){
                this.current2=i;
                this.fetList2(item);
            },
            fetList(dateType){
                api.Get('/cloudMap/listedCompany/getMainBusinessAnalysisList', {
                    "entId": 1,
                    "entName": this.entName,
                    "dateType":dateType
                }).then((res) => {
                    this.mainBusinessAnalysis = res.data;
                    this.length=res.data.industry.length;
                })
            },
            fetList2(dateType){
                api.Get('/cloudMap/listedCompany/getDirectorateCommentary', {
                    "entId": 1,
                    "entName": this.entName,
                    "dateType":dateType
                }).then((res) => {
                    this.directorateCommentary = res.data;
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
    .mainBusness table{
        margin-bottom:22px;
    }
    .showall {
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
    }
    .checkAll:hover{
        color:#33b0ff;
        font-weight: bold;
    }
    /*主营介绍*/
    .mainBusnessIntro td.tdname{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
        padding-left:18px;
        width:12%;
    }
    .mainBusnessIntro td.tdname:hover{
        height:34px;
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
        padding-left:18px;
    }
    .mainBusnessIntro td.tdcon{
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
    .mainBusnessIntro td.tdcon:hover{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-left:none;
        padding-left:38px;
        box-sizing: border-box;
    }
    .mainBusnessIntro td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .mainBusnessIntro tr:hover td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .mainBusnessIntro td.borderRightNone{
        border-right:none;
    }
    .mainBusnessIntro td.borderRightNone:hover{
        border-right:none;
    }
    /*主营构成分析 */
    .mainBusnessAnalysis .filter li{
        margin:2px 1px -1px 0;
    }
    .mainBusnessAnalysis ul{margin-bottom:2px;}
    .mainBusnessAnalysis table{
        border-collapse: collapse;
        border-spacing:0;
    }
    .mainBusnessAnalysis th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
        text-align: center;
    }
    .mainBusnessAnalysis .firstTh{
        border-left:1px solid #284f9d;
        width:40%;
        padding:0 20px;
        box-sizing: border-box;
        text-align: center;
    }
    .mainBusnessAnalysis .lastTh{
        border-right:1px solid #284f9d;
    }
    .mainBusnessAnalysis td.tdname{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        padding-left:18px;
        width:10%;
    }
    .mainBusnessAnalysis td.w20{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        padding-left:18px;
        width:20%;
    }
    .mainBusnessAnalysis td.tdname:hover{
        height:34px;
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
        padding-left:18px;
    }
    .mainBusnessAnalysis td.tdcon{
        height:34px;
        border:1px solid rgba(99,150,255,0.35);
        border-left:none;
        background:rgba(88,143,255,0.15);
        color:#fff;
        line-height:28px;
        box-sizing: border-box;
        text-align: center;
    }
    .mainBusnessAnalysis td.tdcon:hover{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-left:none;
        box-sizing: border-box;
    }
    /*董事会评述*/
    .directorateCommentary td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        text-align: left;
        padding:2%;
        text-indent: 2em;
    }
</style>
