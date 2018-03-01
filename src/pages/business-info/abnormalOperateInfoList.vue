
<template>
    <div class="boot-page business-tabel" >
        <!--经营异常信息-->
        <div class="abnormalOperateInfo overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">列入原因</th>
                    <th class="thirdTh">决定机关/日期</th>
                    <th class="fourthTh">移出原因</th>
                    <th class="lastTh">决定机关/日期</th>
                </tr>
                <tr v-for="(item,index) in abnormalOperateInfo">
                    <td class="firstTd">{{index+1}}</td>
                    <td class="secondTd">
                            {{item.inputReason | isValue}}
                    </td>
                    <td>
                        <span>
                            {{item.inputOrganization | isValue}}<br/>{{item.inputDate | isValue}}
                        </span>
                    </td>
                    <td class="fourthTd">
                            {{item.outputReason | isValue}}
                    </td>
                    <td  class="lastTd">
                            {{item.outputOrganization | isValue}}<br/>{{item.outputDate | isValue}}
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
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'abnormalOperateInfoList',
        mounted(){
            api.Get('/cloudMap/business/getAbnOpInfoList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.abnormalOperateInfo =res.data;
            })
        },
        data () {
            return {
                pageSize:50,
                totalRecord:0,
                currentPage3:1,
                abnormalOperateInfo:[],
                entName:this.$router.currentRoute.params.entName,
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getAbnOpInfoList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.abnormalOperateInfo =res.data;
                })
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
    /*经营异常信息*/
    .abnormalOperateInfo td{
        vertical-align: top;
        padding:5px 10px;
    }
    .abnormalOperateInfo .firstTd{
        border-left:1px solid #1e417a;
    }
    .abnormalOperateInfo .lastTd{
        border-right:1px solid #1e417a;
    }
    .abnormalOperateInfo .firstTh{
        width:10%;
    }
    .abnormalOperateInfo .secondTh{
        width:30%;
    }
    .abnormalOperateInfo .thirdTh{
        width:15%;
    }
    .abnormalOperateInfo .fourthTh{
        width:30%
    }
    .abnormalOperateInfo .lastTh{
        width:15%;
    }
    .abnormalOperateInfo span{
        vertical-align: top;
        text-align: left;
        float: right;
        width:calc(100% - 15px);
        margin-right:0px;
        padding-right: 15px;
        border-right: 1px solid #214c99;
        display: inline-block;
    }
    .secondTd,.fourthTd{
        padding:5px 10px;
    }
    tr:hover .secondTd,tr:hover .fourthTd{
        padding:5px 10px;
    }

</style>
