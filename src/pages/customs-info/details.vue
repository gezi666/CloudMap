<template>
    <div class="customsimported">
        <!--海关进出口信息-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="imported-table">
                <thead class="imported-thead">
                    <tr>
                        <th>序号</th>
                        <th>海关编码</th>
                        <th>月度</th>
                        <th>商品名称</th>
                        <th>收发货地</th>
                        <th>金额(USD)</th>
                    </tr>
                </thead>
                <tbody class="imported-tbody">
                    <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
                        <td>{{index+1 | isValue}}</td>
                        <td>{{item.customCode | isValue}}</td>
                        <td>{{item.monthly | isValue}}</td>
                        <td><b @click="showPopup(item.id)">{{item.commodityName | isValue}}</b></td>
                        <td>{{item.deliveryPlace | isValue}}</td>
                        <td>{{item.usdAmount | isValue}}</td>
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
            <p class="title">海关进出品详情</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">海关编码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.customCode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">商品名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.commodityName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">月度：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.monthly | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业编码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entCode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">收发货地：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.deliveryPlace | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">金额（USD）：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.usdAmount | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">出口最终国或进口原产国：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.countryOrigin | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">贸易方式：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.tradeMode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">运输方式：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.shippingType | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">中转国：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.transitCountry | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">数量单位：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.quantityUnit | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业电话：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entTel | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业邮编：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entPostcode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业传真：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entFax | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">电子邮件：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.email | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">联系人：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.contacts | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业性质：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entType | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">企业详细地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entAddress | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">省市：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.proCities | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">年份：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.particularYear | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'customsDetails',
        data () {
            return {
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                dialogVisible: false,
                loading: true,
                commodityName:'',
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
            showPopup(id ){
                this.dialogVisible = true;
                api.Get('/cloudMap/customs/getCustomsDetails',{//模态框
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    exporDetailsId:id
                }).then((res)=>{
                    this.dataDetails =res.data;
                })
                .catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/customs/getCustomsList',params).then((res)=>{
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
    .customsimported{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .imported-table{
        width: 100%;
        border-collapse:separate;
        border-spacing:0 4px;
    }
    .imported-thead th{
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
    .imported-thead th:first-child{
        width: 95px;
        text-align: center;
        border-left: 1px solid #284f9d;
    }
    .imported-thead th:last-child{
        border-right: 1px solid #284f9d;
    }
    .imported-tbody td{
        height:34px;
        color: #fff;
        font-size: 12px;
        text-align: left;
        padding:0 10px;
        vertical-align: middle;
        background: rgba(88,143,255,0.15);
        border-top:1px solid rgba(99,150,255,0.35);
        border-bottom:1px solid rgba(99,150,255,0.35);
        box-sizing: border-box;
    }
    .imported-tbody td:first-child{
        text-align: center;
    }
    .imported-tbody tr td:first-child{
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .imported-tbody tr td:last-child{
        border-right:1px solid rgba(99,150,255,0.35);
    }
    .imported-tbody td b{
        color: #fff;
        text-decoration: underline;
    }
    .imported-tbody tr:hover {
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        cursor: pointer;
    }
    .imported-tbody tr:hover td b{
        color: #33b0ff;
    }
    .imported-table th:nth-child(2){
        width: 170px;
    }
    .imported-table th:last-child{
        width: 145px;
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
