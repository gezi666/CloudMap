<template>
    <div class="boot-page trademark-wrap" >
        <!--商标-->
        <div class="trademark overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">商标</th>
                    <th class="thirdTh">商品名称</th>
                    <th class="fourthTh">注册号</th>
                    <th class="fifthTh">分别</th>
                    <th class="sixthTh">状态</th>
                    <th class="seventhTh">申请时间</th>
                </tr>
                <tr v-for="(item,index) in trademark" @click="showPopup(item.id)">
                    <td class="firstTd">{{index+1}}</td>
                    <td>
                        <img  alt="商标" src="../../../static/img/trademark.png" /><!--:src="item.trademark"-->
                    </td>
                    <td>
                            {{item.brandName}}
                    </td>
                    <td class="fourthTd">
                            {{item.regNumber | isValue}}
                    </td>
                    <td>
                            {{item.trademarkType | isValue}}
                    </td>
                    <td>
                            {{item.trademarkState | isValue}}
                    </td>
                    <td  class="lastTd">
                            {{item.applicationDate | isValue}}
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
            <p class="title">商标详情</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialogImg">
                    <img src="../../../static/img/patent.png" alt="">
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">商标名称：</span>
                    </h4>
                    <p class="item-value"><span>{{tradeList.brandName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">注册号：</span>
                    </h4>
                    <p class="item-value"><span>{{tradeList.regNumber | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">商标分类：</span>
                    </h4>
                    <p class="item-value"><span>{{tradeList.trademarkType | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">商标状态：</span>
                    </h4>
                    <p class="item-value"><span>{{tradeList.trademarkState | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">申请人：</span>
                    </h4>
                    <p class="item-value"><span>{{tradeList.applicant | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">申请日期：</span>
                    </h4>
                    <p class="item-value"><span>{{tradeList.applicationDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">商品/服务列表：</span>
                    </h4>
                    <p class="item-value"><span>{{tradeList.commodityList | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'trademarkList',
        data () {
            return {
                dialogVisible: false,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                trademark:[],
                tradeList:{},
                loading: true,
            }
        },
        mounted(){
            api.Get('/cloudMap/inAssetsInfo/getTrademarkList',{
                "page":1,
                "pageSize":this.pageSize,
                "entId":1,
                "entName":this.$router.currentRoute.params.entName
            }).then(res=>{
                this.loading=false;
                this.trademark=res.data;
                this.totalRecord=res.totalRecord;
            });
        },
        methods:{
            showPopup(id){
                this.dialogVisible = true;
                api.Get('/cloudMap/inAssetsInfo/getTrademarkInfo',{
                    "id":id,
                    "entId":1,
                    "entName":this.$router.currentRoute.params.entName
                }).then(res=>{
                    this.tradeList=res.data;
                });
            },
            handleCurrentChange(val) {
                api.Get('/cloudMap/inAssetsInfo/getTrademarkList',{
                    "entId":1,
                    "entName":this.$router.currentRoute.params.entName,
                    "page":val,
                    "pageSize":this.pageSize
                }).then(res=>{
                    this.trademark=res.data;
                    this.totalRecord=res.totalRecord;
                });
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
    .trademark-wrap tr td{
        vertical-align: middle;
    }
    .trademark .firstTh{
        width:13%;
    }
    .trademark .secondTh{
        width:15%;
    }
    .trademark .thirdTh{
        width:15%;
    }
    .trademark .fourthTh{
        width:15%
    }
    .trademark .fifthTh{
        width:15%
    }
    .trademark .sixthTh{
        width:15%
    }
    .trademark .seventhTh{
        width:15%
    }
    .trademark .fourthTd{
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
    }
    .trademark tr:hover .fourthTd{
        color:#33b0ff;
        font-weight: bold;
    }
    .trademark img{
        display: inline-block;
        width: 104px;
        height: 53px;
        /*margin: 4px;*/
        line-height:53px;
        border:none;
    }
</style>
