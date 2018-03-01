<template>
    <div class="boot-page">
        <!--虚假广告通告信息-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>总局通告号</th>
                        <th>广告中标识产品名称</th>
                        <th>违法内容简述</th>
                        <th class="w150">总局通告时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(item.id)">{{item.admNoticeNum | isValue }}</a>
                        </td>
                        <td>{{item.adProductName | isValue }}</td>
                        <td>{{item.illegalCon | isValue }}</td>
                        <td>{{item.admNoticeDate | isValue }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!--分页-->
        <div class="pageWrap"  v-if="this.totalRecord>this.pageSize">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page.sync="this.currentPage"
                    :page-size="this.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="this.totalRecord">
            </el-pagination>
        </div>

        <!--弹框-->
        <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
            <p class="title">{{title}}</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品类别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proCategory | isValue }}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">广告中标识产品名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.adProductName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产企业名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.maEnterpriseName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产企业所在地：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.maEpLocation | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品批准文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proApprovalNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">违法内容简述：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.illegalCon | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">总局通告号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.admNoticeNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">总局通告时间：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.admNoticeDate | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'falseAdNotice',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'虚假广告通告信息',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getFalseAdNoticeList',params).then((res)=>{
                    this.loading=false;
                    this.datalist =res.data;
                    this.totalRecord=res.totalRecord;
                })
                .catch(err=>{
                })
            },
            handleCurrentChange(val) {//分页
                this.getList({
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    page:val,
                    pageSize:this.pageSize
                })
            },
            showPopup(id){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/fda/getFalseAdNoticeDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    adNoticeId: id
                }).then((res)=>{
                    this.dataDetails =res.data;
                })
                .catch(err=>{
                })
            }
        },
        mounted(){
            this.getList({//列表
                entId:1,
                entName:this.$router.currentRoute.params.entName,
                page:1,
                pageSize:this.pageSize
            })
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
    @import "../assets/css/tableCon.css";
    @import "../assets/css/dialog.css";
    .court-table{
        table-layout: fixed;
    }
    .court-table td:nth-child(3),.court-table td:nth-child(4){
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .boot-page{
        display: flex;
        flex-direction: column;
    }
</style>
