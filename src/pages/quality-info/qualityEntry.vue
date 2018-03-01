<template>
    <div class="qualityentry">
        <!--进境食品风险预警-->
        <div class="overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <table class="entry-table">
                <thead class="entry-thead">
                    <tr>
                        <th>序号</th>
                        <th>HS编码</th>
                        <th>报检单号</th>
                        <th>产品名称</th>
                        <th>未予准入的事实</th>
                    </tr>
                </thead>
                <tbody class="entry-tbody">
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td>{{index+1 | isValue}}</td>
                        <td>{{item.hsCode | isValue}}</td>
                        <td class="entry-td"><b @click="showPopup(item.id)">{{item.inspectionNum | isValue}}</b></td>
                        <td>{{item.productName | isValue}}</td>
                        <td>{{item.notpermittedFacts | isValue}}</td>
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
            <p class="title">进境食品风险预警详情</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">HS编码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.hsCode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">报检单号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.inspectionNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产品名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">产地：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.originPlace | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">制造商名称及注册编号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.manufacturerNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">进口商名称及注册编号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.importerNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">重量（千克）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.weight | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">未予准入的事实：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.notpermittedFacts | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">处理措施分类：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.measuresIfication | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">进境口岸：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entryPort | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'qualityEntry',
        data () {
            return {
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                dialogVisible: false,
                loading: true,
                datalist: [],
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
            showPopup(id){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/quality/getEntryDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    warningId:id
                }).then((res)=>{
                    this.dataDetails =res.data;
                }).catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/quality/getEntryList',params).then((res)=>{
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
    .qualityentry{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .entry-table{
        width: 100%;
        border-collapse:separate;
        border-spacing:0 4px;
        table-layout: fixed;
    }
    .entry-thead th{
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
    .entry-thead th:first-child{
        width: 95px;
        text-align: center;
        border-left: 1px solid #284f9d;
    }
    .entry-thead th:last-child{
        border-right: 1px solid #284f9d;
    }
    .entry-tbody td{
        height:34px;
        color: #fff;
        font-size: 12px;
        text-align: left;
        padding:0 10px;
        background: rgba(88,143,255,0.15);
        border-top:1px solid rgba(99,150,255,0.35);
        border-bottom:1px solid rgba(99,150,255,0.35);
        box-sizing: border-box;
    }
    .entry-tbody td:first-child{
        text-align: center;
    }
    .entry-tbody tr td:first-child{
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .entry-tbody tr td:last-child{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-right:1px solid rgba(99,150,255,0.35);
    }
    .entry-tbody td b{
        color: #fff;
        text-decoration:underline;
    }
    .entry-tbody tr:hover {
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        cursor: pointer;
    }
    .entry-tbody tr:hover td b{
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
</style>
