<template>
    <div class="boot-page business-tabel" >
        <!--股东及出资信息-->
        <div class="shareholderInfo overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <table  class="shareholderInfoTable">
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">股东类型</th>
                    <th class="thirdTh">股东</th>
                    <th class="fourthTh">认缴额</th>
                    <th class="fifthTh">实缴额</th>
                    <th class="lastTh">操作</th>
                </tr>
                <template v-for="(item,index) in shareholderInfo">
                    <tr class="mainTr" @click="showTr(index,item)" :class="{'active':index==current}" ref="tr">
                        <td class="firstTd">{{index+1}}</td>
                        <td>{{item.shareholderType | isValue}}</td>
                        <td>{{item.shareholder}}</td>
                        <td>{{item.subcribeAmount}}</td>
                        <td>{{item.paidAmount}}</td>
                        <td class="lastTd" ref="lastTd" :class="{'active':index==current}">{{item.mx?item.mx:''}}</td>
                    </tr>
                    <!--<transition name="fold">-->
                    <tr class="example subTr" :class="{'current':index==current}" >
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="subTd">
                            <ul class="subTdList" v-for="(val,i) in item.subcribeDetail">
                                <li>
                                    出资方式：{{val.paid_type}}
                                </li>
                                <li>
                                    出资额：{{val.paid_amount}}
                                </li>
                                <li>
                                    出资日期：{{val.paid_date}}
                                </li>
                            </ul>
                        </td>
                        <td class="subTd">
                            <ul class="subTdList" v-for="(val,i) in item.paidDetail">
                                <li>
                                    出资方式：{{val.paid_type}}
                                </li>
                                <li>
                                    出资额：{{val.paid_amount}}
                                </li>
                                <li>
                                    出资日期：{{val.paid_date}}
                                </li>
                            </ul>
                        </td>
                        <td></td>
                    </tr>
                    <!--</transition>-->
                </template>
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
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'shareholderInfoList',
        mounted(){
            api.Get('/cloudMap/business/getShareholderInfoList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.shareholderInfo =res.data;
                 this.shareholderInfo.forEach(v=>{
                    v.mx="明细"
                })
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                seen:false,
                html:'明细',
                current:-1,
                shareholderInfo:[],
                loading: true,
                flag:false
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getShareholderInfoList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.shareholderInfo =res.data;
                })
            },
            showTr(i,item){
                if (i!=this.current) {
                      this.shareholderInfo.forEach(v=>{
                            v.mx="明细"
                       })
                       this.current=i;
                        item.mx='收起'
                    }else{
                         this.shareholderInfo.forEach(v=>{
                                v.mx="明细"
                         })
                         this.current=-1;
                    }


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
    /*股东及出资信息*/
    tr th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
        padding:0 10px;
        text-align: left;
    }
    tr td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
        padding:0 10px;
    }
    tr .firstTd{
        border-left:1px solid #1e417a;
        text-align: center;
        padding:0 10px;
    }
    tr:hover .firstTd{
        border-left:1px solid #1e417a;
        padding:0 10px;
    }
    tr .lastTd{
        border-right:1px solid #1e417a;
        font-weight: bold;
    }
    tr:hover .lastTd{
        border-right:1px solid #1e417a;
        color:#33b0ff;
        font-weight: bold;
    }
    tr .lastTd.active{
        color: #ffdc01;
    }
    tr:hover{
        cursor: pointer;
    }
    .shareholderInfoTable .firstTh{
        width:10%;
        text-align: center;
    }
    .shareholderInfoTable .secondTh{
        width:15%;
    }
    .shareholderInfoTable .thirdTh{
        width:21%;
    }
    .shareholderInfoTable .fourthTh,.shareholderInfoTable .fifthTh{
        width:22%;
    }
    .shareholderInfoTable .lastTh{
        width:10%;
    }
    .shareholderInfoTable tr .lastTd{
        text-decoration: underline;
    }
    .shareholderInfoTable .mainTr:hover td{
        background: rgba(40,92,198,0.35);
    }
    .shareholderInfoTable .subTr{
        display: none;
        transition: all .3s;
        background: #123168;
    }
    .shareholderInfoTable .subTr.current{
        display: table-row;
    }
    .shareholderInfoTable .show{
        display: block;
    }
    .subTr .subTd{
        color:#fff;
        vertical-align: top;
    }
    .mainTr .lastTd{
        text-decoration: underline;
        cursor: pointer;
    }
    .subTr .lastTd{
        width:10%;
        color:#d6b92a;
        border-right:1px solid #213c6c;
        text-decoration: underline;
        vertical-align: top;
        cursor: pointer;
        text-align: left;
        padding-top:6px;
    }
    .subTdList{
        padding-bottom: 6px;
        border-bottom:1px solid #1d4897;
    }
    .subTdList li{
        text-align: left;
        line-height:22px;
    }
</style>
