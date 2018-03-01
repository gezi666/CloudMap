<template>
    <div class="boot-page business-tabel" >
        <!--清算信息-->
        <div class="clearingInfo overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <ul class="clearingInfoList clearfix">
                <li class="listItem fl" v-for="(item,index) in clearingInfo" :class='{marginRightZero:(index+1)%3==0}'>
                    <span class="num">{{index+1}}</span>
                    <span class="position">{{item.position | isValue}}</span>
                    <span class="name borderRightNone">{{item.name | isValue}}</span>
                </li>
            </ul>
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
        name: 'clearingInfoList',
        mounted(){
            api.Get('/cloudMap/business/getCleaningList',{
                "entId": 1,
                "entName": this.entName,
                "pageSize":this.pageSize,
                "page":1
            }).then((res)=>{
                this.loading=false;
                this.totalRecord=res.totalRecord;
                this.clearingInfo =res.data;
            })
        },
        data () {
            return {
                entName:this.$router.currentRoute.params.entName,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                clearingInfo:[],
                loading:true
            }
        },
        methods:{
            handleCurrentChange(val) {
                api.Get('/cloudMap/business/getCleaningList',{
                    "entId": 1,
                    "entName":this.entName,
                    "pageSize":this.pageSize,
                    "page":val
                }).then((res)=>{
                    this.totalRecord=res.totalRecord;
                    this.clearingInfo =res.data;
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
    /*清算信息*/
    .clearingInfo{
        width:100%;
    }
    .clearingInfo .listItem{
        box-sizing:border-box;
        margin:2px 4px 2px 0;
        width:calc((100% - 8px) / 3 );
        height:34px;
        /*background:#0d2c58;*/
        /*opacity: 0.8;*/
        background:rgba(88,143,255,0.15);
        color: #ffffff;
        border:1px solid #1e417a;
    }
    .clearingInfo .listItem:hover{
        background: rgba(40,92,198,0.35);
    }
    .clearingInfo .marginRightZero{
        margin:2px 0px 2px 0;
    }
    .clearingInfo .listItem span{
        display: inline-block;
        border-right:1px solid #1e417a;
        height:16px;
        margin-top:8px;
    }
    .clearingInfo .listItem .borderRightNone{
        border-right:none;
    }
    .clearingInfo .listItem .num{
        width:calc(15% - 8px);
        text-align: center;
    }
    .clearingInfo .listItem .position{
        width:calc((85% - 8px) / 2);
        text-align: center;
    }
    .clearingInfo .listItem .name{
        width:calc((85% - 8px) / 2);
        text-align: center;
    }

</style>
