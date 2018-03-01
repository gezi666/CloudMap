<template>
    <div class="boot-page recruit-box" >
        <!--并购信息-->
        <div class="merge overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">交易标的</th>
                    <th class="thirdTh">并购方式</th>
                    <th class="fourthTh">交易金额（万）</th>
                    <th class="fifthTh">公告日期</th>
                    <th class="lastTh">操作</th>
                </tr>
                <tr v-for="(item,index) in merge" @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd">
                            {{item.tradeTarget}}
                    </td>
                    <td>
                            {{item.mergeWay}}
                    </td>
                    <td>
                            {{item.tradeAmount}}
                    </td>
                    <td>
                            {{item.announceDate}}
                    </td>
                    <td  class="lastTd" @click="showPopup()">
                            详情
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">合并信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公告日期：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.releaseDate}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">交易标的：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.tradeTarget}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">标的获得方：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.targetObtainer}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">标的出让方：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.targetTransferor}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">并购方式：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.mergeWay}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">最新进度：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.lastestSchedule}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">交易目的：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.tradeGoal}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">投资轮次：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.tradeRound}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">交易金额（万元）：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.tradeAmount}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">币种：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.currency}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">标的类型：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.targetType}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">股权交易比例（%）：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.equityTradingRatio}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">获得方最终持有比例（%）：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.obtainerFinalRadio}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">标的行业：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.targetIndustry}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">标的详情：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.targetDetail}}</span></p>
                        </div>
                        <div class="dialog-item">
                        <h4 class="clearfix item-name">
                            <i class="fl"></i>
                            <span class="titleBarName fl">首次公告日期：</span>
                        </h4>
                        <p class="item-value"><span>{{mergeDetails.firstAnnounceDate}}</span></p>
                    </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">交易日期：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.tradeDate}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">是否海外并购：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.overseaMerge}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">交易简介：</span>
                            </h4>
                            <p class="item-value"><span>{{mergeDetails.tradeIntro}}</span></p>
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
        name: 'mergeList',
        mounted(){
            api.Get('/cloudMap/opStatus/getMergeList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":50,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.merge =res.data;
            })
        },
        data () {
            return {
                entName: this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                merge:[],
                mergeDetails:{},
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/opStatus/getMergeList',{
                    "entId": 1,
                    "entName": this.entName,
                    "pageSize":50,
                    "page":1
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.merge =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/opStatus/getMergeDetails',{
                    "entId": 1,
                    "entName": this.entName
                }).then((res)=>{
                    this.mergeDetails =res.data;
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
    .merge .firstTh{
        width:10%;
    }
    .merge .secondTh{
        width:29%;
    }
    .merge .thirdTh{
        width:18%;
    }
    .merge .fourthTh{
        width:18%
    }
    .merge .fifthTh{
        width:15%
    }
    .merge .lastTh{
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
