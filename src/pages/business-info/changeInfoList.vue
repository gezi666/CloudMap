<template>
    <div class="boot-page business-tabel">
        <!--变更信息-->
        <div class="changeInfo overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">变更日期</th>
                    <th class="thirdTh">变更事项</th>
                    <th class="fourthTh">变更前内容</th>
                    <th class="lastTh">变更后内容</th>
                </tr>
                <tr v-for="(item,index) in changeInfo">
                    <td class="firstTd">{{index+1}}</td>
                    <td>{{item.changeDate | isValue}} </td>
                    <td>
                        {{item.changeItem | isValue}}
                    </td>
                    <td>
                        <span>
                            {{item.changeBefore | isValue}}
                        </span>
                    </td>
                    <td class="lastTd">
                        <span class="lastSpan">
                            {{item.changeAfter | isValue}}
                        </span>
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
        name: 'changeInfoList',
        mounted(){
            api.Get('/cloudMap/business/getChangeInfoList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.changeInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                changeInfo:[],
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getChangeInfoList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.changeInfo =res.data;
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
    /*变更信息*/
    .changeInfo th{
        padding: 0 10px;
    }
    .changeInfo .firstTd{
        border-left:1px solid #1e417a;
    }
    .changeInfo .lastTd{
        border-right:1px solid #1e417a;
    }
    .changeInfo .firstTh{
        width:8%;
    }
    .changeInfo .secondTh{
        width:10%;
    }
    .changeInfo .thirdTh{
        width:10%;
    }
    .changeInfo .fourthTh,.changeInfo .lastTh{
        width:36%
    }
    .changeInfo td{
        vertical-align: top;
        padding:5px 0 10px 5px;
    }
    .changeInfo .firstTd{

    }
    .changeInfo span{
        text-align: left;
        float: right;
        width:calc(100% - 15px);
        margin-right:0px;
        padding-right: 10px;
        border-right: 1px solid #214c99;
        display: inline-block;
    }
    .changeInfo .lastSpan{
        border-right: none;
    }

</style>
