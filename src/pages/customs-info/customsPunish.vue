<template>
    <div class="customspunish">
        <!--海关行政处罚-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="punish-table">
                <thead class="punish-thead">
                    <tr>
                        <th>序号</th>
                        <th>决定书文号</th>
                        <th>海关名称</th>
                        <th>作出处罚决定的海关名称</th>
                        <th class="w100">处罚日期</th>
                    </tr>
                </thead>
                <tbody class="punish-tbody">
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td>{{index+1 | isValue}}</td>
                        <td class="punish-td"><b @click="showPopup(item.id)">{{item.wrDecisionNo | isValue}}</b></td>
                        <td>{{item.customsName | isValue}}</td>
                        <td>{{item.puCustomsName | isValue}}</td>
                        <td>{{item.penaltyDate | isValue}}</td>
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
            <p class="title">海关行政处罚详情</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">海关名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.customsName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">海关注册编号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.cusRegistrationNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">证件类型：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.documentType | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">证件号码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.identificationNumber | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">行政处罚决定书文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.penaltyNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">作出处罚决定的海关名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.puCustomsName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">行政处罚作出日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.penaltyDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处罚决定书全文：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.penaltyText | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'customsPunish',
        data () {
            return {
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                dialogVisible: false,
                loading: true,
                datalist:[],
                dataDetails:{},

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
                api.Get('/cloudMap/customs/getPunishDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    punishDetailsId: id
                }).then((res)=>{
                    this.dataDetails =res.data;
                })
                .catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/customs/getPunishList',params).then((res)=>{
                    this.loading=false;
                    this.datalist =res.data;
                    this.totalRecord=res.totalRecord;
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
    /* 弹窗样式 */
    .dialog-con{
        max-height:600px;
        overflow:auto;
        overflow-x:hidden;
    }
    .dialog-con:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1);
    }
    .dialog-item{
        color:#fff;
        margin-left:26px;
        margin-bottom:28px;
        margin-right: 30px;
    }
    .dialog-item .item-name{
        margin-bottom:8px;
    }
    .dialog-item .item-name span{
        height:15px;
        line-height:15px;
        font-size: 12px;
    }
    .dialog-item .item-name i{
        margin-left:1px;
        margin-right:6px;
        height:15px;
        width:2px;
        background:#00c2ff;
    }
    .dialog-item .item-value{
        display:block;
        word-wrap: break-word;
    }
    /*内容区域*/
    .customspunish{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .punish-table{
        flex: auto;
        width: 100%;
        border-collapse:separate;
        border-spacing:0 4px;
    }
    .punish-thead th{
        height:34px;
        font-size: 12px;
        font-weight: bold;
        text-align: left;
        padding:0 10px;
        background: rgba(40,92,198,0.35);
        color: #cdd2de;
        box-sizing: border-box;
        border-top: 1px solid #284f9d;
        border-bottom: 1px solid #284f9d;
    }
    .punish-thead th:first-child{
        width: 95px;
        text-align: center;
        border-left: 1px solid #284f9d;
    }
    .punish-thead th:last-child{
        width: 150px;
        border-right: 1px solid #284f9d;
    }
    .punish-tbody td{
        height:34px;
        color: #fff;
        font-size: 12px;
        text-align: left;
        padding:0 10px;
        vertical-align: middle;
        background: rgba(88,143,255,0.15);
        border-top:1px solid rgba(99,150,255,0.35);
        border-bottom:1px solid rgba(99,150,255,0.35);
        box-sizing: border-box;
    }
    .punish-tbody td:first-child{
        text-align: center;
    }
    .punish-tbody tr td:first-child{
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .punish-tbody tr td:last-child{
        border-right:1px solid rgba(99,150,255,0.35);
    }
    .punish-tbody td b{
        color: #fff;
        text-decoration: underline;
    }
    .punish-tbody tr:hover {
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        cursor: pointer;
    }
    .punish-tbody tr:hover td b{
        color: #33b0ff;
    }
    .overflowAuto{
        box-sizing: border-box;
        height:424px;
        flex: auto;
        overflow: auto;
        overflow-x: hidden;
        padding-right: 5px;
    }
    .overflowAuto:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .pageWrap{
        margin-top:10px;
    }
    .w100{
        width: 100px;
    }
</style>
