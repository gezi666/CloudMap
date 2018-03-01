<template>
    <div class="boot-page recruit-box" >
        <!--招投标-中标信息-->
        <div class="winBid overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">招标名称</th>
                    <th class="thirdTh">品目</th>
                    <th class="fourthTh">招标单位</th>
                    <th class="lastTh">发布时间</th>
                </tr>
                <tr v-for="(item,index) in winBid" @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd" @click="showPopup()">
                            {{item.bidName}}
                    </td>
                    <td>
                            {{item.itemType}}
                    </td>
                    <td>
                            {{item.bidEnt}}
                    </td>
                    <td  class="lastTd">
                            {{item.releaseDate}}
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">中标信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招标名称：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.bidName}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">品目：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.itemType}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">行政区域：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.admArea}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">省份：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.province}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">发布时间：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.releaseDate}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招投标公告类型：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.bidPublicityType}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">项目联系人：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.proContact}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">项目联系电话：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.proContactNumber}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招标单位：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.bidEnt}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招标单位地址：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.bidEntAddress}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招标单位联系方式：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails. bidEntContact}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">代理机构名称：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.agencyName}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">代理机构地址：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.agencyAddress}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">代理机构联系方式：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.agencyContact}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">网址：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.entUrl}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">正文：</span>
                            </h4>
                            <p class="item-value"><span>{{windBidDetails.mainText}}</span></p>
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
        name: 'winBidList',
        mounted(){
            api.Get('/cloudMap/opStatus/getWinBidList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.winBid =res.data;
                this.totalRecord=res.totalRecord;
            })
        },
        data () {
            return {
                entName: this.$router.currentRoute.params.entName,
                totalRecord:0,
                dialogVisible: false,
                pageSize:50,
                currentPage3:1,
                winBid:[],
                windBidDetails:{},
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/opStatus/getWinBidList',{
                    "entId": 1,
                    "entName": this.entName,
                    "pageSize":this.pageSize,
                    "page":1
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.winBid =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/opStatus/getWinBidDetails',{
                    "winBidId": 1,
                    "entName": this.entName
                }).then((res)=>{
                    this.windBidDetails =res.data;
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
    /*中标信息*/
    .winBid .lastTd{
        border-right:1px solid #1e417a;
    }
    .winBid .firstTh{
        width:10%;
    }
    .winBid .secondTh{
        width:25%;
    }
    .winBid .thirdTh{
        width:15%;
    }
    .winBid .fourthTh{
        width:35%
    }
    .winBid .lastTh{
        width:15%
    }
    .secondTd{
        cursor: pointer;
        text-decoration: underline;
        font-weight: bold;
    }
    tr:hover .secondTd{
        color:#33b0ff;
        font-weight: bold;
    }

</style>
