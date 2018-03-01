<template>
    <div class="internetdata">
        <!--互联网信息-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <div class="internetdata-info" v-for="item in datalist"  @click="showPopup(item.titleName,item.id)">
                <!--左侧图片-->
                <div class="info-left">
                    <img src="../../../static/img/internetLeft.png" alt="">
                    <!--<img :src="item.infoImg"/>-->
                </div>
                <!--右侧文字信息-->
                <div class="info-right">
                    <h2><span @click="showPopup(item.titleName,item.id)">{{item.titleName | isValue}}</span></h2>
                    <p>{{item.articleCon | isValue}}</p>
                    <p class="right-details">
                        <span>{{item.articleSource | isValue}}</span>
                        <span>{{item.articleTime | isValue}}</span>
                    </p>
                </div>
            </div>
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
            <p class="title">{{title | isValue}}</p>
                <!--这里写自己的内容-->
                <div class="con" >
                    <p>{{dataDetails.articleCon | isValue}}</p>
                    <p class="boxLine"></p>
                    <p class="lastText">
                        <span>{{dataDetails.articleSource | isValue}}</span>
                        <span>{{dataDetails.articleTime | isValue}}</span>
                    </p>
                </div>
        </el-dialog>


    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'internetDetails',
        data () {
            return {
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                dialogVisible: false,
                loading: true,
                title:'',
                datalist:[],
                dataDetails:{}
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
            showPopup(txt,id){
                this.dialogVisible = true;
                this.title = txt;
                api.Get('/cloudMap/inAssetsInfo/getInternetDetails',{//模态框
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    contentId:id
                }).then((res)=>{
                    this.dataDetails =res.data;
                })
                .catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/internet/getInternetList',params).then((res)=>{
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
    /*模态框*/
    .con{
        height: 600px;
        overflow: auto;
        overflow-x: hidden;
        padding:0 20px;
    }
    .con:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .con p{
        text-indent: 30px;
        line-height: 30px;
        margin-bottom: 30px;
        color: #fff;
        letter-spacing: 1px;
    }
    .boxLine{
        width: 100%;
        border:1px dashed #ffffff;
        margin-top: 50px;
        margin-bottom: 10px!important;
    }
    .lastText{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 15px;
        margin-bottom: 15px!important;
    }
    .lastText span:first-child{
        text-indent: 0;
    }
    /*内容区域*/
    .internetdata{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .internetdata-info{
        width: 100%;
        height: 120px;
        display: flex;
        align-items: center;
        margin-bottom:5px;
        background: rgba(88,143,255,0.15);
        border:1px solid rgba(99,150,255,0.35);;
    }
    /*左侧图片*/
    .internetdata-info .info-left{
        width: 160px;
        height:100px;
        margin:0 10px;
    }
    .internetdata-info .info-left img{
        width: 100%;
        height: 100%;
    }
    .info-right{
        flex: 1;
        padding-right:10px;
    }
    .info-right h2{
        text-align: left;
        margin-bottom:5px;
    }
    .info-right h2 span{
        font-size: 14px;
        font-weight: 700;
        text-decoration:underline;
        color: #fff;
    }
    .info-right p{
        font-size: 12px;
        color: #d5d7db;
        text-align: left;
    }
    .right-details{
        margin-top:10px;
        padding-right:10px;
        display: flex;
        justify-content:space-between;
    }
    .internetdata-info:hover {
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        cursor: pointer;
    }
    .internetdata-info:hover .info-right h2 span{
        color: #33b0ff;
    }
    .overflowAuto{
        box-sizing: border-box;
        height:424px;
        flex: auto;
        overflow: auto;
        overflow-x: hidden;
        padding-right: 8px;
    }
    .overflowAuto:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .pageWrap{
        margin-top:10px;
    }
</style>
