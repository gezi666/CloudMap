<template>
    <div class="boot-page" >
        <!--著作权合同备案-->
        <div class="contractRecord overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
          <table>
            <tr>
                <th class="firstTh">序号</th>
                <th class="secondTh">版权作品标题</th>
                <th class="thirdTh">版本号</th>
                <th class="fourthTh">作品分类</th>
                <th class="fifthTh">登记日期</th>
            </tr>
            <tr v-for="(item,index) in contractRecord" @click="showPopup(item.id)">
                <td class="firstTd">{{index+1}}</td>
                <td  class="secondTd" @click="showPopup(item.id)">
                        {{item.worksTitle | isValue}}
                </td>
                <td>
                        {{item.versionNum | isValue}}
                </td>
                <td>
                        {{item.worksType | isValue}}
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
            <p class="title">著作权合同备案</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">作品标题：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.worksTitle | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">作品分类：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.worksType | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">版本号：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.versionNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">权利人：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.obligee | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">地域范围：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.palceRange | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">合同开始时间：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.startDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">合同到期时间：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.expirationDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">永久转让或授权：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.authorization | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">所属类：</span>
                    </h4>
                    <p class="item-value"><span>{{contractList.genericClass | isValue}} </span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui'
    export default {
        name: 'contractRecordList',
        data () {
            return {
                dialogVisible: false,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                contractRecord:[],
                contractList:{},
                loading: true
            }
        },
        mounted(){
            api.Get('/cloudMap/inAssetsInfo/getContractRecordList',{
                "entId": 1,
                "entName":this.$router.currentRoute.params.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then(res=>{
                this.loading=false;
                this.contractRecord=res.data;
                this.totalRecord=res.totalRecord;
            });
        },
        methods:{
            showPopup(id){
                this.dialogVisible = true;
                   api.Get('/cloudMap/inAssetsInfo/getContractRecordInfo', {
                       "page":1,
                       "pageSize":this.pageSize,
                       "entId":1,
                       "entName":this.$router.currentRoute.params.entName
                   }).then(res => {
                       this.contractList = res.data;
                   });
            },
            handleCurrentChange(val) {
                api.Get('/cloudMap/inAssetsInfo/getContractRecordList',{
                    "entId":1,
                    "entName":this.$router.currentRoute.params.entName,
                    "page":val,
                    "pageSize":this.pageSize
                }).then(res=>{
                    this.contractRecord=res.data;
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
    .contractRecord .firstTh{
        width:10%;
    }
    .contractRecord .secondTh{
        width:40%;
    }
    .contractRecord .thirdTh{
        width:15%;
    }
    .contractRecord .fourthTh{
        width:20%;
    }
    .contractRecord .fifthTh{
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
