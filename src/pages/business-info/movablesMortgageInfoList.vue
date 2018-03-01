<template>
    <div class="boot-page business-tabel" >
        <!--动产抵押信息-->
        <div class="movablesMortgageInfo overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">登记编号</th>
                    <th class="thirdTh">登记机关</th>
                    <th class="fourthTh">被担保债权数额</th>
                    <th class="lastTh">公示日期</th>
                </tr>
                <tr v-for="(item,index) in movablesMortgageInfo"  @click="showPopup()">
                    <td class="firstTd">{{index+1}}</td>
                    <td  class="secondTd" >
                            {{item.regNumber | isValue}}
                    </td>
                    <td>
                            {{item.regAuthority | isValue}}
                    </td>
                    <td>
                            {{item.securedBondsAmount | isValue}}
                    </td>
                    <td  class="lastTd">
                         <span class="lastSpan">
                            {{item.publicityDate | isValue}}
                        </span>
                    </td>
                </tr>
            </table>
            <!--弹框-->
            <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
                <p class="title">动产抵押信息</p>
                <!--这里写自己的内容-->
                <div class="dialog-con">
                    <div class="writtenVerdict">
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">登记编号：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.regNumber | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">登记机关：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.regAuthority | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">登记日期：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.regDate | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">被担保债权数额：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.guranteeDebtAmount | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">抵押状态：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.mortageStatus | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">公示日期：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.publicityDate | isValue}}</span></p>
                        </div>
                        <div class="wline"></div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">抵押权人名称：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.mortgageeName | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">证照/证件类型：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.lisenceType | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">动产抵押住所地：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.mortgageResidence | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">动产抵押数额：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.mortgageAmount | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">担保的范围：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.guaranteeScope | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">履行债务期限：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.debtTerm | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">所有权或使用权归属：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.ownership | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">数量、质量、状况、所在地等情况：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.quantityQualityStatusLocation | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">注销原因：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.withdrawReason | isValue}}</span></p>
                        </div>
                        <div class="dialog-item">
                            <h4 class="clearfix item-name">
                                <i class="fl"></i>
                                <span class="titleBarName fl">注销日期：</span>
                            </h4>
                            <p class="item-value"><span>{{movablesMortgageDetails.withdrawDate | isValue}}</span></p>
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
        name: 'movablesMortgageInfoList',
        mounted(){
            api.Get('/cloudMap/business/getMoveMortgageInfoList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.movablesMortgageInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                dialogVisible: false,
                movablesMortgageInfo:[],
                movablesMortgageDetails:{},
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getMoveMortgageInfoList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.movablesMortgageInfo =res.data;
                })
            },
            showPopup( ){
                this.dialogVisible = true;
                api.Get('/cloudMap/business/getMoveMortgageDetails',{
                    "entId": 1,
                    "entName":this.entName,
                }).then((res)=>{
                    this.movablesMortgageDetails =res.data;
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
    .wline{
        line-height:24px;
        border-bottom:1px dashed #fff;
        margin-bottom:37px;
    }
    p.txtIndent{
        line-height:32px;
        text-indent:2em;
        text-align:left;
        margin-bottom:32px;
    }
    .movablesMortgageInfo table tr:hover{
        cursor: pointer;
    }
</style>
