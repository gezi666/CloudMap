<template>
    <div class="boot-page" >
        <!--专利-->
        <div class="patent overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table id="tb_data">
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">申请号</th>
                    <th class="thirdTh">专利类型</th>
                    <th class="fourthTh">公开（公告）日</th>
                    <th class="fifthTh">摘要</th>
                </tr>
                <tr v-for="(item,index) in patent" @click="showPopup(item.id)">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd">
                            {{item.applyNumber | isValue}}
                    </td>
                    <td>
                            {{item.patentType | isValue}}
                    </td>
                    <td>
                            {{item.publicityDate | isValue}}
                    </td>
                    <td  class="lastTd">
                            <i>{{item.abstractTit | isValue}} </i><br/>
                            {{item.abstract | isValue}}
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
            <p class="title">专利详情</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">名称：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.patent | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">专利类型：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.patentType | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">申请号：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.appNumber | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">申请日：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.appDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公开（公告）号：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.publicNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公开（公告）日：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.publicityDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分类号：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.classificationNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">优先权：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.priority | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">申请（专利权）人：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.applicant | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">发明（设计）人：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.inventor | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">专利代理机构：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.agency | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">代理人：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.agent | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">地址：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.entAddress | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">最新法律状态：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.legalStatus | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">国际申请：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.intApplication | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">国际公布：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.intPublication | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">摘要：</span>
                    </h4>
                    <p class="item-value"><span>{{abstractList.abstract | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'patentList',
        data () {
            return {
                dialogVisible: false,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                patent:[],
                abstractList:{},
                loading: true
            }
        },
        mounted(){
            api.Get('/cloudMap/inAssetsInfo/getPatentList',{
                "page":1,
                "pageSize":this.pageSize,
                "entId":1,
                "entName":this.$router.currentRoute.params.entName
            }).then(res=>{
                this.loading=false;
                this.patent=res.data;
                this.totalRecord=res.totalRecord;
            });
        },
        methods:{
            showPopup(id){
                this.dialogVisible = true
                api.Get('/cloudMap/inAssetsInfo/getPatentInfo',
                    {
                        "id":id,
                        "entId":1,
                        "entName":this.$router.currentRoute.params.entName
                    }).then(res=>{
                    this.abstractList=res.data;
                });
            },
            handleCurrentChange(val) {
                api.Get('/cloudMap/inAssetsInfo/getPatentList', {
                    "entId":1,
                    "entName":this.$router.currentRoute.params.entName,
                    "page":val,
                    "pageSize":this.pageSize
                    }).then(res=>{
                    this.patent=res.data;
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
    .patent .firstTh{
        width:10%;
    }
    .patent .secondTh{
        width:15%;
    }
    .patent .thirdTh{
        width:15%;
    }
    .patent .fourthTh{
        width:17%
    }
    .patent .fifthTh{
        width:43%
    }
    .patent i{
        text-decoration: underline;
        cursor: pointer;
        display: inline-block;
        margin-bottom: 4px;
    }
    tr:hover i{
        color:#33b0ff;
        font-weight: bold;
    }
</style>
