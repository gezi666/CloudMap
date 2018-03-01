<template>
    <div class="boot-page recruit-box" >
        <!--招投标-投标信息-->
        <div class="bid overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">招标名称</th>
                    <th class="thirdTh">品目</th>
                    <th class="fourthTh">招标单位</th>
                    <th class="lastTh">发布时间</th>
                </tr>
                <tr v-for="(item,index) in bid" @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd">
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
                <p class="title">投标信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招标名称：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.bidName}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">品目：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.itemType}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">行政区域：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.admArea}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">省份：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.province}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">发布时间：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.releaseDate}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招投标公告类型：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails. bidPublicityType}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">项目联系人：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.proContact}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">项目联系电话：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.proContactNumber}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招标单位：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.bidEnt}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招标单位地址：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.bidEntAddress}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招标单位联系方式：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.bidEntContact}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">代理机构名称：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.agencyName}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">代理机构地址：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.agencyAddress}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">代理机构联系方式：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.agencyContact}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">网址：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.entUrl}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">正文：</span>
                            </h4>
                            <p class="item-value"><span>{{bidDetails.mainText}}</span></p>
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
        data () {
            return {
                entName: this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                bid:[],
                bidDetails:{},
                loading:true
            }
        },
        mounted(){
            api.Get('/cloudMap/opStatus/getBidInfoList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.bid=res.data;
            })
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/opStatus/getBidInfoList',{
                    "entId": 1,
                    "entName": this.entName,
                    "pageSize":this.pageSize,
                    "page":1
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.bid=res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/opStatus/getBidDetails',{
                    "bidId": 1,
                    "entName": this.entName
                }).then((res)=>{
                    this.bidDetails =res.data;
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
    .bid .secondTd{
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
    }
    tr:hover .secondTd{
        color:#33b0ff;
        font-weight: bold;
    }
    .bid .lastTd{
        border-right:1px solid #1e417a;
    }
    .bid .firstTh{
        width:10%;
    }
    .bid .secondTh{
        width:25%;
    }
    .bid .thirdTh{
        width:15%;
    }
    .bid .fourthTh{
        width:35%
    }
    .bid .lastTh{
        width:15%
    }
</style>
