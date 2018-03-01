<template>
    <div class="boot-page">
        <!--法院公告-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>公告类型</th>
                        <th>公告人</th>
                        <th>当事人</th>
                        <th class="w100">发布时间</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list,index) in datalist" @click="showPopup(list.anId)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(list.anId)">{{list.noticeType | isValue}}</a>
                        </td>
                        <td>{{list.noticePeople | isValue}}</td>
                        <td>{{list.litigant | isValue}}</td>
                        <td>{{list.releaseDate | isValue}}</td>
                        <td>
                            <a @click="showPopup(list.anId)">详情</a>
                        </td>
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
            <p class="title">{{title | isValue}}</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公告类型：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.noticeType | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公告人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.noticePeople | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">当事人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.litigant | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公告时间：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.announceDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">正文：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.mainText | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'courtAnnouncement',
        data () {
            return {
                dialogVisible: false,
                title:'法院公告信息',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                loading: true,
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
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
                api.Get('/cloudMap/court/getCourtAnnouncementDetails',{
                    "entName": this.$router.currentRoute.params.entName,
                    "anId":id
                })
                .then(res=>{
                    this.dataDetails = res.data;
                })
                .catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/court/getCourtAnnouncementList',params).then((res)=>{
                    this.loading=false;
                    this.datalist = res.data;
                    this.totalRecord=res.totalRecord;
                })
                .catch(err=>{
                })
            },
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
    @import "./assets/css/tableCon.css";
    @import "./assets/css/dialog.css";
    .court-table th:last-child{
        width:60px;
    }
</style>
