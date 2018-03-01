<template>
    <div class="boot-page business-tabel" >
        <!--知识产权出质登记信息-->
        <div class="intellectualPropertyInfo overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">登记编号</th>
                    <th class="thirdTh">知识产权名称</th>
                    <th class="fourthTh">出质人</th>
                    <th class="fifthTh">质权人</th>
                    <th class="lastTh">公示日期</th>
                </tr>
                <tr v-for="(item,index) in intellectualPropertyInfo" @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd">
                            {{item.regNumber | isValue}}
                    </td>
                    <td>
                            {{item.ipName | isValue}}
                    </td>
                    <td>
                            {{item.pledgor | isValue}}
                    </td>
                    <td>
                            {{item.pledgee | isValue}}
                    </td>
                    <td  class="lastTd">
                            {{item.publicityDate | isValue}}
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">知识产权出质登记信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">登记编号：</span>
                            </h4>
                            <p class="item-value"><span>{{intellectualPropertyDetails.regNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">登记日期：</span>
                            </h4>
                            <p class="item-value"><span>{{intellectualPropertyDetails.regDate | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">知识产权名称：</span>
                            </h4>
                            <p class="item-value"><span>{{intellectualPropertyDetails.ipName | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">种类：</span>
                            </h4>
                            <p class="item-value"><span>{{intellectualPropertyDetails.type | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">出质人：</span>
                            </h4>
                            <p class="item-value"><span>{{intellectualPropertyDetails.pledgor | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">质权人：</span>
                            </h4>
                            <p class="item-value"><span>{{intellectualPropertyDetails.pledgee | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">出质状态：</span>
                            </h4>
                            <p class="item-value"><span>{{intellectualPropertyDetails.status | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公示日期：</span>
                            </h4>
                            <p class="item-value"><span>{{intellectualPropertyDetails.publicityDate | isValue}}</span></p>
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
        name: 'intellectualPropertyInfoList',
        mounted(){
            api.Get('/cloudMap/business/getIPList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.intellectualPropertyInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                intellectualPropertyInfo:[],
                intellectualPropertyDetails:{},
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getIPList',{
                    "entId": 1,
                    "entName": this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.intellectualPropertyInfo =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/business/getIPDetails',{
                    "entId": 1,
                    "entName": this.entName
                }).then((res)=>{
                    this.intellectualPropertyDetails =res.data;
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
    .firstTh{
        width:10%
    }
    .secondTh{
        width:12%;
    }
    .lastTh{
        width:12%;
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
    .dialog-item .item-value{
        text-align: left;
    }
    .writtenVerdict{
        padding:4px 15px 30px;
    }
    .intellectualPropertyInfo table tr:hover{
        cursor: pointer;
    }
</style>
