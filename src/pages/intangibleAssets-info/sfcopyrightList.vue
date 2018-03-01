<template>
    <div class="boot-page">
        <!--软件著作权-->
        <div class="sfcopyright overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">软件名称</th>
                    <th class="thirdTh">版本号</th>
                    <th class="fourthTh">登记号</th>
                    <th class="fifthTh">分类号</th>
                    <th class="sixthTh">登记日期</th>
                </tr>
                <tr v-for="(item,index) in sfcopyright" @click="showPopup(item.id)">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd">
                            {{item.sfName | isValue}}
                    </td>
                    <td>
                            {{item.versionNum | isValue}}
                    </td>
                    <td>
                            {{item.regNumber | isValue}}
                    </td>
                    <td>
                        {{item.classificNum | isValue}}
                    </td>
                    <td  class="lastTd">
                            {{item.regDate | isValue}}
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
            <p class="title">软件著作权详情</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">软件全称：</span>
                    </h4>
                    <p class="item-value"><span>{{softwareList.sfName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">软件简称 ：</span>
                    </h4>
                    <p class="item-value"><span>{{softwareList.abbreviation | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">登记号：</span>
                    </h4>
                    <p class="item-value"><span>{{softwareList.regNumber | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分类号：</span>
                    </h4>
                    <p class="item-value"><span>{{softwareList.classificNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">版本号：</span>
                    </h4>
                    <p class="item-value"><span>{{softwareList.versionNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">著作权人（国籍）：</span>
                    </h4>
                    <p class="item-value"><span>{{softwareList.copyrightUser | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">首次发表日期：</span>
                    </h4>
                    <p class="item-value"><span>{{softwareList.publicationDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">登记日期：</span>
                    </h4>
                    <p class="item-value"><span>{{softwareList.regDate | isValue}} </span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'sfcopyrightList',
        data () {
            return {
                dialogVisible: false,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                sfcopyright:[],
                softwareList:{},
                loading: true
            }
        },
        mounted(){
            api.Get('/cloudMap/inAssetsInfo/getsfCopyrightList',{
                "page":1,
                "pageSize":this.pageSize,
                "entId":1,
                "entName":this.$router.currentRoute.params.entName
            }).then(res=>{
                this.loading=false;
                this.sfcopyright=res.data;
                this.totalRecord=res.totalRecord;
            });
        },
        methods:{
            showPopup(id){
                this.dialogVisible = true;
                api.Get('/cloudMap/inAssetsInfo/getsfCopyrightInfo', {
                    "id": id,
                    "entId": 1,
                    "entName":this.$router.currentRoute.params.entName
                }).then(res => {
                    this.softwareList = res.data;
                });
            },
            handleCurrentChange(val) {
                api.Get('/cloudMap/inAssetsInfo/getsfCopyrightList',{
                    "entId":1,
                    "entName":this.$router.currentRoute.params.entName,
                    "page":val,
                    "pageSize":this.pageSize
                }).then(res=>{
                    this.sfcopyright=res.data;
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
    .sfcopyright .firstTh{
        width:10%;
    }
    .sfcopyright .secondTh{
        width:35%;
    }
    .sfcopyright .thirdTh{
        width:10%;
    }
    .sfcopyright .fourthTh{
        width:15%;
    }
    .sfcopyright .fifthTh{
        width:15%;
    }
    .sfcopyright .sixthTh{
        width:15%;
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

</style>
