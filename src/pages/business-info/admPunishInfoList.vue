<template>
    <div class="boot-page business-tabel" >
        <!--行政处罚信息-->
        <div class="admPunishInfo overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">决定书文号</th>
                    <th class="thirdTh">违法行为类型</th>
                    <th class="fourthTh">行政处罚内容</th>
                    <th class="lastTh">公示日期</th>
                </tr>
                <tr v-for="(item,index) in admPunishInfo" @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd">
                            {{item.decDocNumber | isValue}}
                    </td>
                    <td>
                        <span>
                            {{item.illegalActType | isValue}}
                        </span>
                    </td>
                    <td class="fourthTd">
                        <span>
                            {{item.punishCon | isValue}}
                        </span>
                    </td>
                    <td  class="lastTd">
                            {{item.publicityDate | isValue}}
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">行政处罚信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">决定书文号：</span>
                            </h4>
                            <p class="item-value"><span>{{admPunishDetails.decDocNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">行政处罚决定书：</span>
                            </h4>
                            <p class="item-value"><span>{{admPunishDetails.punishDoc | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">决定机关名称：</span>
                            </h4>
                            <p class="item-value"><span>{{admPunishDetails.decisionAdm | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">处罚决定日期：</span>
                            </h4>
                            <p class="item-value"><span>{{admPunishDetails.decisionDate | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">法定代表人（负责人）：</span>
                            </h4>
                            <p class="item-value"><span>{{admPunishDetails.legalRepresentative | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">违法行为类型：</span>
                            </h4>
                            <p class="item-value"><span>{{admPunishDetails.illegalActType | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">行政处罚内容：</span>
                            </h4>
                            <p class="item-value"><span>{{admPunishDetails.punishCon | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公示日期：</span>
                            </h4>
                            <p class="item-value"><span>{{admPunishDetails.publicityDate | isValue}}</span></p>
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
        name: 'admPunishInfoList',
        mounted(){
            api.Get('/cloudMap/business/getAdmPunishList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.admPunishInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                admPunishInfo:[],
                admPunishDetails:{},
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getAdmPunishList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.admPunishInfo =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/business/getAdmPublishDetails',{
                    "entId": 1,
                    "entName":this.entName
                }).then((res)=>{
                    this.admPunishDetails =res.data;
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
    .writtenVerdict{
        padding:4px 15px 30px;
    }
    /*行政处罚信息*/
    .admPunishInfo td{
        vertical-align: top;
        padding:10px 10px;
    }
    .admPunishInfo .firstTd{
        border-left:1px solid #1e417a;
    }
    .secondTd{
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
    }
    tr:hover .secondTd{
        color:#33b0ff;
        font-weight: bold;
    }
    .admPunishInfo .lastTd{
        border-right:1px solid #1e417a;
    }
    .admPunishInfo .firstTh{
        width:10%;
    }
    .admPunishInfo .secondTh{
        width:12%;
    }
    .admPunishInfo .thirdTh{
        width:20%;
    }
    .admPunishInfo .fourthTh{
        width:46%
    }
    .admPunishInfo .lastTh{
        width:12%
    }
    .admPunishInfo .td span{
        vertical-align: top;
        text-align: left;
        float: right;
        width:calc(100% - 15px);
        margin-right:0px;
        padding-right: 15px;
        border-right: 1px solid #214c99;
        display: inline-block;
    }
    .admPunishInfo table tr:hover{
        cursor: pointer;
    }
</style>
