<template>
    <div class="boot-page">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>保护品种编号</th>
                        <th>药品名称</th>
                        <th>保护级别</th>
                        <th class="w150">保护期限</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list,index) in datalist" @click="showPopup(list.id)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(list.id)">{{list.proVarietieNum | isValue}}</a>
                        </td>
                        <td>{{list.drugName | isValue}}</td>
                        <td>{{list.proLevel | isValue}}</td>
                        <td>{{list.proTerm | isValue}}</td>
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
                        <span class="titleBarName fl">保护品种编号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proVarietieNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">药品名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.drugName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公告号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.noticeNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">药品批准文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.approvalNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">保护级别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proLevel | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">规格：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.specifications | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">保护起始日：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proTermStart | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">保护终止日：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proTermEnd | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产企业：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productionEnt | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">剂型：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.dosageForm | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">保护期限：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proTerm | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui'
    export default {
        name: 'cnProtectionVarieties',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'中药保护品种',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist: [],
                dataDetails: {}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getProtectionVarietiesList',params).then((res)=>{
                    this.loading=false;
                    this.datalist=res.data;
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
                api.Get('/cloudMap/fda/getProtectionVarietiesDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    pvId: id
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
    .boot-page{
        display: flex;
        flex-direction: column;
    }
</style>
