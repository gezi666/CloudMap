<template>
    <div class="boot-page business-tabel" >
        <!--抽查检查信息-->
        <div class="spotCheckInfo overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table>
                <tr>
                    <th class="firstTh">序号</th>
                    <th class="secondTh">抽查检查日期</th>
                    <th class="thirdTh">抽查检查类型</th>
                    <th class="fourthTh">抽查检查机关</th>
                    <th class="lastTh">抽查检查结果</th>
                </tr>
                <tr v-for="(item,index) in spotCheckInfo">
                    <td class="firstTd">{{index+1}}</td>
                    <td>
                            {{item. spotCheckDate | isValue}}
                    </td>
                    <td>
                            {{item.spotCheckType | isValue}}
                    </td>
                    <td>
                            {{item.spotCheckAuth | isValue}}
                    </td>
                    <td  class="lastTd">
                            {{item.spotCheckResult | isValue}}
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
        name: 'spotCheckInfoList',
        mounted(){
            api.Get('/cloudMap/business/getSpotCheckList',{
                "entId": 1,
                "entName":this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.spotCheckInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                spotCheckInfo:[],
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getSpotCheckList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.spotCheckInfo =res.data;
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
    .spotCheckInfo .firstTh{
        width:10%;
    }
    .spotCheckInfo .secondTh{
        width:15%;
    }
    .spotCheckInfo .thirdTh{
        width:20%;
    }
    .spotCheckInfo .fourthTh{
        width:20%
    }
    .spotCheckInfo .lastTh{
        width:35%
    }
    /*.spotCheckInfo span{*/
        /*text-align: left;*/
        /*float: right;*/
        /*width:calc(100% - 15px);*/
        /*margin: 10px 0;*/
        /*margin-right:0px;*/
        /*padding-right: 15px;*/
        /*border-right: 1px solid #214c99;*/
        /*display: inline-block;*/
    /*}*/

</style>
