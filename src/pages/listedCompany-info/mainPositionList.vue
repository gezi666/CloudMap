<template>
    <div class="boot-page"  v-loading="loading" element-loading-text="数据加载中...">
        <div class="mainPosition">
            <!--机构持股汇总-->
            <div class="inShareHoldDetail inShareHoldTotal">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        机构持股汇总
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">主力进出\报告期</th>
                        <th v-for="(item,index) in inShareHoldTotal.date">{{item | isValue}}</th>
                    </tr>
                    <tr>
                        <td class="firstTd">机构数量(家)</td>
                        <td  v-for="(item,index) in details.admAmount">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">累计持有数量(股)</td>
                        <td  v-for="(item,index) in details.totalAmount">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">累计市值(元)</td>
                        <td  v-for="(item,index) in details.totalValue">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">持仓比例</td>
                        <td  v-for="(item,index) in details.holdRadio">{{item | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">较上期变化(股)</td>
                        <td v-for="(item,index) in details.compareChange">{{item | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--机构持股明细-->
            <div class="inShareHoldDetail">
                <h3 class="titleBar2 clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        机构持股明细
                    </span>
                    <div class="listedComponeySelect listedComponeySelect2">
                        <el-select placeholder="全部" v-model="value" @change="changeCon(value)" popper-class="listedSelect">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current==index ? 'active' : '']" @click="tab(index,item)" v-for="(item,index) in inShareHoldDetail.date">{{item | isValue}}</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">机构或基金名称</th>
                        <th class="secondTh">机构类型</th>
                        <th>持有数量(股)</th>
                        <th>持股市值(元)</th>
                        <th>占流通股比例</th>
                        <th class="lastTh">增减情况(股)</th>
                    </tr>
                    <tr v-for="(item,index) in inShareHoldDetail.details">
                        <td class="firstTd">{{item.admName | isValue}}</td>
                        <td>{{item.admType | isValue}}</td>
                        <td>{{item.totalAmount | isValue}}</td>
                        <td>{{item.totalValue | isValue}}</td>
                        <td>{{item.circulateRadio | isValue}}</td>
                        <td class="lastTd" :class="{classA:item.status==1,classB:item.status==2,classC:item.status==3,classD:item.status==4}">{{item.addMinus | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--IPO获配机构-->
            <div class="ipoAllocateIns">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        IPO获配机构
                    </span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">序号</th>
                        <th class="secondTh">机构名称</th>
                        <th>获配数量（股）</th>
                        <th>申购数量（股）</th>
                        <th>锁定月（月）</th>
                        <th class="lastTh">机构类型</th>
                    </tr>
                    <tr v-for="(item,index) in ipoAllocateIns">
                        <td class="firstTd">{{index+1}}</td>
                        <td>{{item.admName}}</td>
                        <td>{{item.allocateAmount}}</td>
                        <td>{{item.chaseAmount}}</td>
                        <td>{{item.lockPeriod}}</td>
                        <td class="lastTd">{{item.admType}}</td>
                    </tr>
                </table>
            </div>
            <div class="pageWrap" v-if="this.totalRecord>this.pageSize">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage3"
                        :page-size="this.pageSize"
                        layout="prev, pager, next, jumper"
                        :total="this.totalRecord">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'mainPositionList',
        mounted(){
//            机构持股汇总
            api.Get('/cloudMap/listedCompany/getAdmShareTotalList', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.loading=false;
                this.inShareHoldTotal = res.data;
                this.details= res.data.details;
            })
//            机构持股明细
            api.Get('/cloudMap/listedCompany/getAdmShareTotalDetails', {
                "entId": 1,
                "entName": this.entName,
                "indexType":0
            }).then((res) => {
                this.inShareHoldDetail = res.data;
                this.details2= res.data.details;
            })
//            IPO获配机构
            api.Get('/cloudMap/listedCompany/getIpoAllocateInsList', {
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res) => {
                this.ipoAllocateIns = res.data;
                this.totalRecord=res.totalRecord;
            })
        },
        data () {
            return {
                loading:true,
                entId:1,
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                indexType:0,    //指标类型 0--全部，1--基金，2--保险公司，3--其他
                dateType:0,     //时间类型（按报告期，按年度，按单季度）
                value:'',
                options:[
                    {
                        value: '选项1',
                        label: '全部'
                    },{
                        value: '选项2',
                        label: '基金'
                    },{
                        value: '选项3',
                        label: '保险公司'
                    },{
                        value: '选项4',
                        label: '其他'
                    }
                ],
                current:0,
                classA: 'classA',
                classB: 'classB',
                classC: 'classC',
                classD: 'classD',
                details:'',
                details2:'',
                inShareHoldTotal:{},
                inShareHoldDetail:{},
                ipoAllocateIns:[]
            }
        },
        methods:{
            changeCon(value){
                switch(value)
                {
                    case '选项2':
                        api.Get('/cloudMap/listedCompany/getAdmShareTotalDetails', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":1
                        }).then((res) => {
                            this.inShareHoldDetail = res.data;
                            this.details2= res.data.details;
                            this.indexType=1
                        })
                        break;
                    case '选项3':
                        api.Get('/cloudMap/listedCompany/getAdmShareTotalDetails', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":2
                        }).then((res) => {
                            this.inShareHoldDetail = res.data;
                            this.details2= res.data.details;
                            this.indexType=2
                        })
                        break;
                    case '选项4':
                        api.Get('/cloudMap/listedCompany/getAdmShareTotalDetails', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":3
                        }).then((res) => {
                            this.inShareHoldDetail = res.data;
                            this.details2= res.data.details;
                            this.indexType=3
                        })
                        break;
                    default:
                        api.Get('/cloudMap/listedCompany/getAdmShareTotalDetails', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":0
                        }).then((res) => {
                            this.inShareHoldDetail = res.data;
                            this.details2= res.data.details;
                            this.indexType=0
                        })
                }
                return this.indexType;
            },
            tab(i,item){
                this.current=i;
                this.fetList(item);
            },
            fetList(dateType){
                api.Get('/cloudMap/listedCompany/getAdmShareTotalDetails', {
                    "entId": 1,
                    "entName": this.entName,
                    "indexType":this.indexType,
                    "dateType":dateType
                }).then((res) => {
                    this.inShareHoldDetail = res.data;
                    this.dateType=dateType;
                })
            },
            handleCurrentChange(val) {
                api.Get('/cloudMap/listedCompany/getIpoAllocateInsList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.ipoAllocateIns =res.data;
                })
            },
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
    .mainPosition table{
        margin-bottom:22px;
    }
    /*机构持股汇总*/
   /*机构持股明细*/
    .titleBar2>i{
        margin-right:6px;
        height:15px;
        width:1px;
        border:1px solid #2a56af;
        background:#1f3973;
    }
    .titleBar2 span{
        font-size: 14px;
        height:14px;
        line-height:14px;
        color: #cdcdd0;
    }
    .inShareHoldDetail th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
        text-align: left;
        padding:0 15px;
    }
    .inShareHoldDetail .firstTh{
        border-left:1px solid #284f9d;
        width:30%;
    }
    .inShareHoldTotal .firstTh{
        width:20%;
    }
    .inShareHoldTotal td:last-child{
        border-right:1px solid #1f3b6d;
    }
    .inShareHoldDetail .lastTh{
        border-right:1px solid #284f9d;
    }
    .inShareHoldDetail td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
        padding:0 15px;
    }
    .inShareHoldDetail tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .inShareHoldDetail .lastTd{
        border-right:1px solid #1f3b6d;
    }
    .inShareHoldDetail tr:hover .lastTd{
        border-right:1px solid #1f3b6d;
    }
    .inShareHoldDetail .firstTd{
        border-left:1px solid #1f3b6d;
        box-sizing: border-box;
    }
    .inShareHoldDetail tr:hover .firstTd{
        border-left:1px solid #1f3b6d;
        box-sizing: border-box;
        text-align: left;
    }
    .inShareHoldDetail td.classA{
        color:#fff;
    }
    .inShareHoldDetail td.classB{
        color:#e07567;
    }
    .inShareHoldDetail td.classB:after{
        content:" ↑";
        color:#e07567;
        font-weight:bold;
    }
    .inShareHoldDetail td.classC{
        color:#3cd947;
    }
    .inShareHoldDetail td.classC:before{
        content:"- ";
        color:#3cd947;
        font-weight:bold;
    }
    .inShareHoldDetail td.classC:after{
        content:" ↓";
        color:#3cd947;
        font-weight:bold;
    }
    .inShareHoldDetail td.classD{
        color:#ff6344;
    }
    /*IPO获配机构*/
    .ipoAllocateIns th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
        text-align: left;
        padding:0 20px;
    }
    .ipoAllocateIns .firstTh{
        width: 10%;
    }
    .ipoAllocateIns td{
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
    .ipoAllocateIns tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .ipoAllocateIns .lastTd{
        border-right:1px solid #1f3b6d;
    }
    .ipoAllocateIns tr:hover .lastTd{
        border-right:1px solid #1f3b6d;
    }
    .ipoAllocateIns .firstTd{
        border-left:1px solid #1f3b6d;
        box-sizing: border-box;
    }
    .ipoAllocateIns tr:hover .firstTd{
        border-left:1px solid #1f3b6d;
        box-sizing: border-box;
        text-align: left;
    }
    .ipoAllocateIns .secondTh{
        width:30%;
    }
    .ipoAllocateIns td{
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
</style>
