<template>
    <div class="boot-page recruit-box" >
        <!--投资信息-->
        <div class="invest overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">被投企业</th>
                    <th class="thirdTh">投资金额</th>
                    <th class="fourthTh">轮次</th>
                    <th class="fifthTh">投资时间</th>
                    <th class="lastTh">操作</th>
                </tr>
                <tr v-for="(item,index) in invest" @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd">
                        {{item.investedEnt}}
                    </td>
                    <td>
                        {{item.investAmount}}
                    </td>
                    <td>
                        {{item.round}}
                    </td>
                    <td>
                        {{item.investDate}}
                    </td>
                    <td  class="lastTd"  @click="showPopup()">
                        详情
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">投资信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">企业全称：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.entName}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">企业简称：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.shorthand}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">投资方：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.investor}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">投资时间：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.investDate}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">投资金额：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.entAmount}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">行业：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.industry}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">股权：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.stockRight}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">投资轮次：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.entName}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">地区：</span>
                            </h4>
                            <p class="item-value"><span>{{investDetails.area}}</span></p>
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
        name: 'investList',
        mounted(){
            api.Get('/cloudMap/opStatus/getInvestmentList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.invest =res.data;
            })
        },
        data () {
            return {
                entName: this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                invest:[],
                investDetails:{},
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/opStatus/getInvestmentList',{
                    "entId": 1,
                    "entName": this.entName,
                    "pageSize":this.pageSize,
                    "page":1
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.invest =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/opStatus/getInvestDetails',{
                    "investId": 1,
                    "entName": this.entName,
                }).then((res)=>{
                    this.investDetails =res.data;
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
    /*弹出框*/
    .dialog-item .item-value{
        text-align: left;
    }
    .dialog-item .item-value span{
        text-align: left;
    }
    .writtenVerdict{
        padding:4px 15px 30px;
    }
    /*表格*/
    .invest .firstTh{
        width:10%;
    }
    .invest .secondTh{
        width:35%;
    }
    .invest .thirdTh{
        width:15%;
    }
    .invest .fourthTh{
        width:15%
    }
    .invest .fifthTh{
        width:15%
    }
    .invest .lastTh{
        width:10%
    }
    .lastTd{
        cursor: pointer;
        text-decoration: underline;
        font-weight: bold;
    }
    tr:hover .lastTd{
        color:#33b0ff;
        font-weight: bold;
    }
</style>
