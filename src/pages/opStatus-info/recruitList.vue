<template>
    <div class="boot-page recruit-box" >
        <!--招聘信息-->
        <div class="recruit overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">招聘岗位</th>
                    <th class="thirdTh">工作地点</th>
                    <th class="fourthTh">招聘人数</th>
                    <th class="fifthTh">职位月薪</th>
                    <th class="lastTh">发布时间</th>
                </tr>
                <tr v-for="(item,index) in recruit" @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd"  @click="showPopup()">
                            {{item.recruitmentPosition}}
                    </td>
                    <td>
                            {{item.workingPlace}}
                    </td>
                    <td>
                            {{item.recruitmentNumber}}
                    </td>
                    <td>
                            {{item.salary}}
                    </td>
                    <td  class="lastTd">
                        {{item.releaseDate}}
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">招聘信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公司名称：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.entName}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公司规模：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.entSize}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公司性质：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.entProperty}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公司行业：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.entIndustry}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公司主页：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.entHomepage}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公司地址：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.entAddress}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公司介绍：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.entIntro}}</span></p>
                        </div>
                        <div class="wline"></div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招聘岗位：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.recruitmentPosition}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招聘福利：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.entWelfare}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">职位月薪：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.salary}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">工作地点：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.workingPlace}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">发布日期：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.releaseDate}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">工作性质：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.workingNature}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">工作经验：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.experience}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">最低学历：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.minimumEducation}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">招聘人数：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.recruitmentNumber}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">职位类别：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.positionType}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">工作描述：</span>
                            </h4>
                            <p class="item-value"><span>{{recruitDetails.jobDescription}}</span></p>
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
        name: 'recruitList',
        data () {
            return {
                entName: this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                recruit:[],
                recruitDetails:{},
                loading:true
            }
        },
        mounted(){
            api.Get('/cloudMap/opStatus/getRecruitList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.recruit =res.data;
            })
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/opStatus/getRecruitList',{
                    "entId": 1,
                    "entName": this.entName,
                    "pageSize":this.pageSize,
                    "page":1
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.recruit =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/opStatus/getRecruitDetials',{
                    "entId": 1,
                    "entName": this.entName
                }).then((res)=>{
                    this.recruitDetails =res.data;
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
    .wline {
        line-height: 24px;
        border-bottom: 1px dashed #fff;
        margin-bottom: 37px;
    }
    /*招聘信息*/
    .recruit .lastTd{
        border-right:1px solid #1e417a;
    }
    .recruit .firstTh{
        width:10%;
    }
    .recruit .secondTh{
        width:25%;
    }
    .recruit .thirdTh{
        width:15%;
    }
    .recruit .fourthTh{
        width:15%
    }
    .recruit .fifthTh{
        width:15%
    }
    .recruit .lastTh{
        width:20%
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
