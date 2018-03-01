<template>
    <div class="qualityvehicle">
        <!--车辆召回信息-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="vehicle-table">
                <thead class="vehicle-thead">
                    <tr>
                        <th>序号</th>
                        <th>车型系列</th>
                        <th>车型名称</th>
                        <th>年款</th>
                        <th>缺陷描述</th>
                    </tr>
                </thead>
                <tbody class="vehicle-tbody">
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td>{{index+1 | isValue}}</td>
                        <td class="vehicle-td vehicle-td-model"><b @click="showPopup(item.id)">{{item.modelSeries | isValue}}</b></td>
                        <td>{{item.vehicleName | isValue}}</td>
                        <td>{{item.modelYear | isValue}}</td>
                        <td>{{item.defectDescription | isValue}}</td>
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
            <p class="title">失信被执行人信息</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产者名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.producerName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">召回总数量：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.recalTotal | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">车型系列：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.modelSeries | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">车型名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.vehicleName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">年款：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.modelYear | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">召回数量：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.recallQuantity | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产日期范围：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.productionDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">VIN码范围（不连续）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.range | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">缺陷描述：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.defectDescription | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">缺陷补救措施：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.remedialMeasures | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">应急处置方法：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.disposalMethod | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">召回日程安排：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.schedule | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">通知用户方案：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.userScheme | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">其他信息：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.otherInformation | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'qualityVehicle',
        data () {
            return {
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                dialogVisible: false,
                loading: true,
                datalist:[],
                dataDetails:{}
            }
        },
        methods:{
            handleCurrentChange(val) { //分页
                this.getList({
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    page:val,
                    pageSize:this.pageSize
                })
            },
            showPopup(id){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/quality/getVehicleDetails',{
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    vehicleListId:id
                }).then((res)=>{
                    this.dataDetails =res.data;
                }).catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/quality/getVehicleList',params).then((res)=>{
                    this.loading=false;
                    this.datalist =res.data;
                    this.totalRecord=res.totalRecord;
                }).catch(err=>{
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
    .qualityvehicle{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .vehicle-table{
        width: 100%;
        border-collapse:separate;
        border-spacing:0 4px;
        table-layout: fixed;
    }
    .vehicle-thead th{
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
    .vehicle-thead th:first-child{
        width: 95px;
        text-align: center;
        border-left: 1px solid #284f9d;
    }
    .vehicle-thead th:last-child{
        width:350px;
        border-right: 1px solid #284f9d;
    }
    .vehicle-tbody td{
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
    .vehicle-tbody td:first-child{
        text-align: center;
    }
    .vehicle-tbody tr td:first-child{
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .vehicle-tbody tr td:last-child{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        border-right:1px solid rgba(99,150,255,0.35);
    }
    .vehicle-tbody td b{
        color: #fff;
        text-decoration: underline;
    }
    .vehicle-td-model{
        min-width: 13%;
    }
    .vehicle-tbody tr:hover {
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        cursor: pointer;
    }
    .vehicle-tbody tr:hover td b{
        color: #33b0ff;
    }
    .overflowAuto{
        box-sizing: border-box;
        flex: auto;
        overflow: auto;
        overflow-x: hidden;
        height:424px;
        padding-right: 5px;
    }
    .overflowAuto:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .pageWrap{
        margin-top:10px;
    }
</style>
