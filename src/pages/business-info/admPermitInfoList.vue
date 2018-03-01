<template>
    <div class="boot-page business-tabel" >
        <!--行政许可信息-->
        <div class="admPermitInfo overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">行政许可编号</th>
                    <th class="thirdTh">许可文件</th>
                    <th class="fourthTh">有效期</th>
                    <th class="lastTh">许可机关</th>
                </tr>
                <tr v-for="(item,index) in admPermitInfo"  @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td>
                            {{item.permitNumber | isValue}}
                    </td>
                    <td class="thirdTd">
                            {{item.permitFile | isValue}}
                    </td>
                    <td>
                        {{item.termOfValidityStart | isValue}} - {{item.termOfValidityEnd | isValue}}
                    </td>
                    <td class="lastTd">
                            {{item.licensingAuthority | isValue}}
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
            <p class="title">行政许可信息</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="writtenVerdict">
                    <div class="dialog-item">
                        <h4 class="clearfix item-name">
                            <i class="fl"></i>
                            <span class="titleBarName fl">行政许可证号：</span>
                        </h4>
                        <p class="item-value"><span>{{admPermitDetails.permitNumber | isValue}}</span></p>
                    </div>
                    <div class="dialog-item">
                        <h4 class="clearfix item-name">
                            <i class="fl"></i>
                            <span class="titleBarName fl">文件名称：</span>
                        </h4>
                        <p class="item-value"><span>{{admPermitDetails.permitFile | isValue}}</span></p>
                    </div>
                    <div class="dialog-item">
                        <h4 class="clearfix item-name">
                            <i class="fl"></i>
                            <span class="titleBarName fl">许可机关：</span>
                        </h4>
                        <p class="item-value"><span>{{admPermitDetails.licensingAuthority | isValue}}</span></p>
                    </div>
                    <div class="dialog-item">
                        <h4 class="clearfix item-name">
                            <i class="fl"></i>
                            <span class="titleBarName fl">有效期：</span>
                        </h4>
                        <p class="item-value"><span>{{admPermitDetails.termOfValidityStart | isValue}} - {{admPermitDetails.termOfValidityEnd | isValue}}</span></p>
                    </div>
                    <div class="wline"></div>
                    <div class="dialog-item">
                        <h4 class="clearfix item-name">
                            <i class="fl"></i>
                            <span class="titleBarName fl">许可内容：</span>
                        </h4>
                        <p class="item-value"><span>{{admPermitDetails.permitContent | isValue}}</span></p>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'admPermitInfoList',
        mounted(){
            api.Get('/cloudMap/business/getAdmPermitInfoList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.admPermitInfo =res.data;
            })
        },
        data () {
            return {
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                admPermitInfo:[],
                admPermitDetails:{ },
                entName:this.$router.currentRoute.params.entName,
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getAdmPermitInfoList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.admPermitInfo =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/business/getAdmPermitDetails',{
                    "id": 1,
                    "entName":this.entName
                }).then((res)=>{
                    this.admPermitDetails =res.data;
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
    tr td{
        vertical-align: middle;
    }
    .thirdTd{
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
    }
    tr:hover .thirdTd{
        color:#33b0ff;
        font-weight: bold;
    }
    .dialog-item .item-value{
        text-align: left;
    }
    .writtenVerdict{
        padding:4px 15px 30px;
    }
    .wline{
        line-height:24px;
        border-bottom:1px dashed #fff;
        margin-bottom:37px;
    }
    .admPermitInfo table tr:hover{
        cursor: pointer;
    }
</style>
