<template>
    <div class="boot-page business-tabel" >
        <!--司法协助信息-->
        <div class="judicialAssistInfo overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">执行通知书文号</th>
                    <th class="thirdTh">执行法院</th>
                    <th class="lastTh">股权数额</th>
                </tr>
                <tr v-for="(item,index) in judicialAssistInfo"  @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd">
                            {{item.noticeNumber | isValue}}
                    </td>
                    <td>
                            {{item.excuteCourt | isValue}}
                    </td>
                    <td  class="lastTd">
                            {{item.equityAmount | isValue}}
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">司法协助信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">执行通知书文号：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.noticeNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">执行裁定书文号：</span>
                            </h4>
                                <p class="item-value"><span>{{judicialAssistDetails.consultationNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">执行法院：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.enforceCourt | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">被执行人：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.excutedPerson | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">持有股权、其它投资权益的数额：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.equityInterestsAmount | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">证照种类：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.lisenceType | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">证照号码：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.lisenceNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">类型/状态：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.typeStatus | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">执行事项：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.excuteItem | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公示日期：</span>
                            </h4>
                            <p class="item-value"><span>{{judicialAssistDetails.publicityDate | isValue}}</span></p>
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
        name: 'judicialAssistInfoList',
        mounted(){
            api.Get('/cloudMap/business/getJudicialAssistInfoList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.judicialAssistInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                judicialAssistInfo:[],
                judicialAssistDetails:{},
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getJudicialAssistInfoList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.judicialAssistInfo =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/business/getJudicialAssistDetails',{
                    "entId": 1,
                    "entName":this.entName,
                }).then((res)=>{
                    this.judicialAssistDetails =res.data;
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
    p.txtIndent{
        line-height:32px;
        text-indent:2em;
        text-align:left;
        margin-bottom:32px;
    }
    .judicialAssistInfo table tr:hover{
        cursor: pointer;
    }
</style>
