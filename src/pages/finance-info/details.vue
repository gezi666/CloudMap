<template>
    <div class="financecbrc">
        <!--银监会行政处罚-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="cbrc-table">
                <thead class="cbrc-thead">
                    <tr>
                        <th>序号</th>
                        <th>决定文书</th>
                        <th>主要违法违规事实（案由）</th>
                        <th>行政处罚决定</th>
                        <th>处罚决定日期</th>
                    </tr>
                </thead>
                <tbody class="cbrc-tbody">
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td>{{index+1 | isValue}}</td>
                        <td class="circ-td-a"><b  @click="showPopup(item.id)">{{item.decDocument | isValue}}</b></td>
                        <td class="cbrc-td">{{item.illegalFacts | isValue}}</td>
                        <td class="cbrc-td">{{item.admPenalDecision | isValue}}</td>
                        <td >{{item.decisionDate | isValue}}</td>
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
            <p class="title">银监会行政处罚详情</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">项目名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">行政决定部门：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.admDecisDepartment | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">行政决定类别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.admDecisCategory | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">设定依据：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.setBasis | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">行政相对人类别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.admCategory | isValue}}</span></p>
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
                        <span class="titleBarName fl">被处罚当事人姓名或名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.bepunishedName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">主要违法违规事实（案由）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.violationFacts | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">行政处罚依据：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.punishmentBasis | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">行政处罚决定：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.penaltyDecision | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                            <span class="titleBarName fl">作出处罚决定的机关名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.organizationName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">作出处罚决定的日期：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.punishDate | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'details',
        data () {
            return {
                loading: true,
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                dialogVisible: false,
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
                api.Get('/cloudMap/finance/getFinanceDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    cbrcPunishId: id
                }).then((res)=>{
                    this.dataDetails =res.data;
                }).catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/finance/getFinanceList',params).then((res)=>{
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
    /*内容*/
    .financecbrc{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .cbrc-table{
        width: 100%;
        border-collapse:separate;
        border-spacing:0 4px;
    }
    .cbrc-thead th{
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
    .cbrc-thead th:first-child{
        width: 95px;
        text-align: center;
        border-left: 1px solid #284f9d;
    }
    .cbrc-thead th:last-child{
        width: 150px;
        border-right: 1px solid #284f9d;
    }
    .cbrc-tbody td{
        font-size: 12px;
        color: #fff;
        text-align: left;
        padding:5px 10px;
        background: rgba(88,143,255,0.15);
        box-sizing: border-box;
        border-top:1px solid rgba(99,150,255,0.35);
        border-bottom:1px solid rgba(99,150,255,0.35);
    }
    .cbrc-tbody td:first-child{
        text-align: center;
    }
    .cbrc-tbody tr td:first-child{
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .cbrc-tbody tr td:last-child{
        border-right:1px solid rgba(99,150,255,0.35);
    }
    .cbrc-tbody td b{
        color: #fff;
        text-decoration: underline;
    }
    .circ-td-a a{
        color: #00FFFF;
    }
    .cbrc-tbody tr:hover {
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        cursor: pointer;
    }
    .cbrc-tbody tr:hover td b{
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
    .cbrc-table th:nth-child(2){
        width:130px;
    }
    .cbrc-table td:nth-child(3),.cbrc-table td:nth-child(4){
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .cbrc-table{
        table-layout: fixed;
    }
</style>
