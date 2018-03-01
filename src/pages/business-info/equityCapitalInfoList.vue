<template>
    <div class="boot-page business-tabel" >
        <!--股权出质信息-->
        <div class="equityCapitalInfo overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">登记编号</th>
                    <th class="thirdTh">出质人</th>
                    <th class="fourthTh">质权人</th>
                    <th class="fifthTh">出质股权数额</th>
                    <th class="lastTh">公示日期</th>
                </tr>
                <tr v-for="(item,index) in equityCapitalInfo" @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd" >
                            {{item.regNumber | isValue}}
                    </td>
                    <td>
                            {{item.pledgor | isValue}}
                    </td>
                    <td>
                            {{item.pledgee | isValue}}
                    </td>
                    <td>
                            {{item.pledgedStockAmount | isValue}}
                    </td>
                    <td  class="lastTd">
                            {{item.publicityDate | isValue}}
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">股权出质信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">登记编号：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.regNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">登记日期：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.regDate | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">状态：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.status | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">出质人：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.pledgor | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">出质人证照/证件号码：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.pledgorLisenceNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">出质股权数额：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.pledgedStockAmount | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">质权人：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.pledgee | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">质权人证照/证件号码：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.pledgeeLisenceNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公示日期：</span>
                            </h4>
                            <p class="item-value"><span>{{equityCapitalDetails.publicityDate | isValue}}</span></p>
                        </div>
                    </div>
                </div>
            </el-dialog>
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
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'equityCapitalInfoList',
        mounted(){
            api.Get('/cloudMap/business/getEquityCapitalList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.equityCapitalInfo =res.data;
            })
        },
        data () {
            return {
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                equityCapitalInfo:[],
                equityCapitalDetails:{},
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getEquityCapitalList',{
                    "entId": 1,
                    "entName": this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.equityCapitalInfo =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/business/getEquityCapitalDetails',{
                    "entId": 1,
                    "entName":this.entName
                }).then((res)=>{
                    this.equityCapitalDetails =res.data;
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
    @import 'assets/css/dialog.css';
    .secondTd{
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
    }
    tr:hover .secondTd{
        color:#33b0ff;
        font-weight: bold;
    }
    .dialog-item .item-value{
        text-align: left;
    }
    .writtenVerdict{
        padding:4px 15px 30px;
    }
    .equityCapitalInfo table tr:hover{
        cursor: pointer;
    }

</style>
