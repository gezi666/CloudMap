<template>
    <div class="boot-page" >
        <!--ICP备案-->
        <div class="icpRecordList overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
          <table>
            <tr>
                <th class="firstTh">序号</th>
                <th class="secondTh">网址</th>
                <th class="thirdTh">网站名称</th>
                <th class="fourthTh">网站备案号</th>
                <th class="fifthTh">审核时间</th>
            </tr>
            <tr v-for="(item,index) in icpRecord" @click="showPopup( )">
                <td class="firstTd">{{index+1}}</td>
                <td>
                        {{item.siteAdd | isValue}}
                </td>
                <td class="thirdTd">
                        {{item.entName | isValue}}
                </td>
                <td>
                        {{item.websiteRecordNum | isValue}}
                </td>
                <td  class="lastTd">
                        {{item.auditDate | isValue}}
                </td>
            </tr>
          </table>
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
        <!--弹框-->
        <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
            <p class="title">ICP备案</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">单位名称：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.entName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">主体编号：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.subjectNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">单位性质：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.unitProperty | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">主体备案号：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.recordNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">网站编号：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.siteNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">网站名称：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.siteName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">

                        <i class="fl"></i>
                        <span class="titleBarName fl">网站负责人：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.siteManager | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">网站地址：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.siteAdd | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">域名：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.domainName}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">网站备案号：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.websiteRecordNum | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">审核时间：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.auditTime | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">内容类型：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.contentType | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">证件类型：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.documentType | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">证件号码：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.identificationNumber | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">省：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.province | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">市：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.city | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">县：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.county | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">详细地址：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.detailedAdd | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">域名编号：</span>
                    </h4>
                    <p class="item-value"><span>{{recordList.domainnameNum | isValue}} </span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'icpRecordList',
        data () {
            return {
                dialogVisible: false,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                icpRecord:[],
                recordList:{},
                loading: true
            }
        },
        mounted(){
            api.Get('/cloudMap/inAssetsInfo/getIcpRecordList',{
                "page":1,
                "pageSize":this.pageSize,
                "entId":1,
                "entName":this.$router.currentRoute.params.entName
            }).then(res=>{
                this.loading=false;
                this.icpRecord=res.data;
                this.totalRecord=res.totalRecord;
            });
        },
        methods:{
            showPopup(id){
                this.dialogVisible = true;
                api.Get('/cloudMap/inAssetsInfo/getIcpRecordInfo', {
                    "id": id,
                    "entId": 1,
                    "entName":this.$router.currentRoute.params.entName
                }).then(res => {
                    this.recordList = res.data;
                });
            },
            handleCurrentChange(val) {
                api.Get('/cloudMap/inAssetsInfo/getIcpRecordList',{
                    "entId":1,
                    "entName":this.$router.currentRoute.params.entName,
                    "page":val,
                    "pageSize":this.pageSize
                }).then(res=>{
                    this.icpRecord=res.data;
                    this.totalRecord=res.totalRecord;
                });
            },
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
    .thirdTd{
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
    }
    tr:hover .thirdTd{
        color:#33b0ff;
        font-weight: bold;
    }
    .icpRecordList .firstTh{
        width:10%;
    }
    .icpRecordList .secondTh{
        width:25%;
    }
    .icpRecordList .thirdTh{
        width:25%;
    }
    .icpRecordList .fourthTh{
        width:25%;
    }
    .icpRecordList .fifthTh{
        width:15%;
    }
    .icpRecordList span{
        text-align: center;
        float: right;
        width:calc(100% - 40px);
        margin: 10px 0;
        margin-right:0px;
        padding: 0 15px;
        border-right: 1px solid #214c99;
        display: inline-block;
    }
    .icpRecordList .lastSpan{
        border-right: none;
        text-align: left;
    }
</style>
