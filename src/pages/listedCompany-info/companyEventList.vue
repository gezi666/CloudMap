<template>
    <div class="boot-page"  v-loading="loading" element-loading-text="数据加载中...">
        <!--公司大事-->
        <div class="companyEvent">
            <!--近期重要事件-->
            <div class="importantEvents eventsFirst">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">近期重要事件</span>
                </h3>
                <table>
                    <tr v-for="(item,index) in importantEvents" @click="showPopup(item.eventContent,item.eventDate,item.id )">
                        <td class="firstTd">{{item.eventDate}}</td>
                        <td class="lastTd detailSpan">{{item.eventContent | isValue}} <span>详情</span></td>
                    </tr>
                </table>
            </div>
            <!--高管持股变动-->
            <div class=" executiveChange">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        高管持股变动
                    </span>
                </h3>
                <table>
                    <thead>
                        <tr>
                            <th class="firstTh">变动日期</th>
                            <th>变动人</th>
                            <th>与公司高管关系</th>
                            <th>变动数量（股）</th>
                            <th>交易均价（元）</th>
                            <th>剩余股份（股）</th>
                            <th class="lastTh">股份变动途径</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in executiveChange">
                            <td class="firstTd">{{item.changeData | isValue}}</td>
                            <td>{{item.changeUser | isValue}}</td>
                            <td>{{item.exeRelations | isValue}}</td>
                            <td :class="{classA:item.changeStatus==1,classB:item.changeStatus==2,classC:item.changeStatus==3}">{{item.changeNum | isValue}}</td>
                            <td>{{item.averagePrice | isValue}}</td>
                            <td>{{item.remainingShares | isValue}}</td>
                            <td class="lastTd">{{item.shareChangeApproach | isValue}}</td>
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
            <!--股东持股变动-->
            <div class=" shareholderChange">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">股东持股变动</span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">公告日期</th>
                        <th>变动股东</th>
                        <th>变动数量（股）</th>
                        <th>交易均价（元）</th>
                        <th>剩余股份总数（股）</th>
                        <th>变动时间</th>
                        <th class="lastTh">变动途径</th>
                    </tr>
                    <tr v-for="(item,index) in shareholderChange">
                        <td class="firstTd">{{item.announceDate | isValue}}</td>
                        <td>{{item.varShareholder | isValue}}</td>
                        <td :class="{classA:item.changeStatus==1,classB:item.changeStatus==2,classC:item.changeStatus==3}">{{item.changeNum | isValue}}</td>
                        <td>{{item.averagePrice | isValue}}</td>
                        <td>{{item.remainingTotal | isValue}}</td>
                        <td>{{item.changeTime | isValue}}</td>
                        <td class="lastTd">{{item.changeChannel | isValue}}</td>
                    </tr>
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
            <!--担保明细-->
            <div class=" detailed">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">担保明细</span>
                </h3>
                <table>
                    <tr>
                        <th class="firstTh">时间</th>
                        <th>担保金额</th>
                        <th class="period">担保期限</th>
                        <th>担保方</th>
                        <th>担保类型</th>
                        <th>被担保方</th>
                        <th class="lastTh">关联交易</th>
                    </tr>
                    <tr v-for="(item,index) in detailed">
                        <td class="firstTd">{{item.guaranteeTime | isValue}}</td>
                        <td>{{item.guaranteeAmount | isValue}}</td>
                        <td>{{item.guaranteePeriodStart | dateFormat | isValue}}-{{item.guaranteePeriodEnd | dateFormat | isValue}}</td>
                        <td>{{item.guarantor | isValue}}</td>
                        <td>{{item.guaranteeType | isValue}}</td>
                        <td>{{item.isGuaranteed | isValue}}</td>
                        <td class="lastTd">{{item.transaction | isValue}}</td>
                    </tr>
                </table>

                <!--分页-->
                <div class="pageWrap"  v-if="this.totalRecord3>this.pageSize">
                    <el-pagination
                            @current-change="handleCurrentChange3"
                            :current-page="currentPage3"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="this.totalRecord3">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!--弹框-->
        <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
            <p class="title">重要事件详情</p>
            <!--这里写自己的内容-->
            <div class="con">
                <h3>{{this.eventTitle | isValue}}</h3>
                <p class="time">{{this.eventDate | isValue}}</p>
                <p class="boxLine"></p>
                <p>{{eventText.articleCon | isValue}}</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'shareholderList',
        data () {
            return {
                loading:true,
                classA: 'classA',
                classB: 'classB',
                classC: 'classC',
                pageSize:50,
                currentPage1: 1,
                currentPage2: 1,
                currentPage3: 1,
                totalRecord1:'',
                totalRecord2:'',
                totalRecord3:'',
                eventTitle:'',
                eventDate:'',
                dialogVisible: false,
                importantEvents:[],
                executiveChange:[],
                shareholderChange:[],
                detailed:[],
                eventText:{}
            }
        },
        methods:{
            handleCurrentChange1(val) {//高管持股变动列表分页
                this.getList({
                    entId:1,
                    entName: this.$router.currentRoute.params.entName,
                    page: val,
                    pageSize: this.pageSize
                })
            },
            handleCurrentChange2(val) {//股东持股变动列表分页
                this.getSharChangeList({
                    entId:1,
                    entName: this.$router.currentRoute.params.entName,
                    page: val,
                    pageSize: this.pageSize
                })
            },
            handleCurrentChange3(val) {//担保明细分页
                this.getWarrantyList({
                    entId:1,
                    entName: this.$router.currentRoute.params.entName,
                    page: val,
                    pageSize: this.pageSize
                })
            },
            showPopup(txt,eventDate,id){  //模态框
                this.dialogVisible = true;
                this.eventTitle = txt;
                this.eventDate=eventDate;
                api.Get('/cloudMap/listedCompany/getRecentEventsDetails', {
                    entId:1,
                    entName: this.$router.currentRoute.params.entName,
                    eventDetalisId:id
                }).then((res) => {
                    this.eventText= res.data
                })
            },
           //近期重要事件列表
            getList(params){
                api.Get('/cloudMap/listedCompany/getRecentEventsList',params).then((res)=>{
                    this.loading=false;
                    this.importantEvents = res.data
                })
            },
            //高管持股变动列表
            getSharChangeList(params){
                api.Get('/cloudMap/listedCompany/getHoldingChangeList',params).then((res)=>{
                    this.totalRecord1=res.totalRecord;
                    this.executiveChange = res.data;
                })
            },
            //股东持股变动列表
            getHolderChangeList(params){
                api.Get('/cloudMap/listedCompany/getshareholderChangeList',params).then((res)=>{
                    this.totalRecord2=res.totalRecord;
                    this.shareholderChange = res.data;
                })
            },
            //担保明细
            getWarrantyList(params){
                api.Get('/cloudMap/listedCompany/getWarrantyDetailsList',params).then((res)=>{
                    this.totalRecord3=res.totalRecord;
                    this.detailed = res.data;
                })
            }
        },
        mounted(){
            //近期重要事件列表
            this.getList({
                entId:1,
                entName: this.$router.currentRoute.params.entName
            }),
            //高管持股变动列表
            this.getSharChangeList({
                entId:1,
                entName: this.$router.currentRoute.params.entName,
                page: 1,
                pageSize: this.pageSize,
            }),
            //股东持股变动列表
            this.getHolderChangeList({
                entId:1,
                entName: this.$router.currentRoute.params.entName,
                page: 1,
                pageSize: this.pageSize
            }),
            //担保明细
             this.getWarrantyList({
                 entId:1,
                 entName: this.$router.currentRoute.params.entName,
                 page: 1,
                 pageSize: this.pageSize
             })
        },
        filters: {
            dateFormat: function (value) {
                return value.replace(/-/g, ".")
            },
            isValue(val){
                return val = (val=="") ? "-" : val
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import 'assets/css/common.css';
    /*向上及其向下箭头*/
    tr td,tr th{
        padding:0 10px;
    }
    .classC:after{
        content:" ↓";
        color:#3cd947;
        font-weight:bold;
    }
    .classB:after{
        content:" ↑";
        color:#e07567;
        font-weight:bold;
    }
    .classC:before{
        content:" -";
        color:#3cd947;
        font-weight:bold;
    }
    /*模态框*/
    .con{
        height: 600px;
        overflow: auto;
        overflow-x: hidden;
        padding:0 20px;
    }
    .con:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .con h3{
        color: #fff;
        font-size: 16px;
        line-height: 33px;
        text-align: center;
        font-weight: bold;
    }
    .con p{
        text-indent: 30px;
        line-height: 30px;
        margin-top: 30px;
        color: #fff;
        letter-spacing: 1px;
    }
    .con p.time{
        text-align: center;
        margin:30px 0 0;
    }
    .boxLine{
        border:1px dashed #ffffff;
        margin-bottom: 10px!important;
        margin-top: 10px;
    }
    .lastText span:first-child{
        text-indent: 0;
    }
    /*内容区域*/
    .boot-page {
        width: 100%;
        height: 100%;
    }
    .companyEvent table{
        margin-bottom:22px;
        table-layout: fixed;
    }
    tr td.detailSpan{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-right:60px;
    }
    .firstTh{
        border-left:1px solid #1e417a;
    }
    .lastTh{
        border-right:1px solid #1e417a;
    }
    .eventsFirst .firstTd{
        padding:0 18px 0 18px;
        width:14%;
    }
    /*近期重要事件*/
    .importantEvents .lastTd{
        text-align: left;
        padding-left: 18px;
    }
    .importantEvents .firstTd{
        border-right:1px solid #1e417a;
    }
    td.classA{
        color:#fff;
    }
    td.classB{
        color:#e07567;
    }
    .classC{
        color:#3cd947;
    }
    .detailSpan span{
        text-decoration: underline;
        cursor: pointer;
        position: absolute;
        top:5px;
        right:10px;
    }
    .detailSpan{
        position: relative;
    }
    tr:hover .detailSpan span{
        color:#33b0ff;
    }
    th.period{
        width:21%;
    }
    td{
        vertical-align: middle;
    }
    .eventsFirst table tr:hover{
        cursor: pointer;
    }
</style>
