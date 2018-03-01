<template>
    <div class="boot-fad">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                <tr>
                    <th class="tc w50">序号</th>
                    <th>公告号</th>
                    <th>标称生产企业名称/标称产品名称</th>
                    <th>抽检类型</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(list,index) in datalist" @click="showPopup(list.id)">
                    <td class="tc">{{index+1 | isValue}}</td>
                    <td>
                        <a @click="showPopup(list.id)">{{list.noticeNo | isValue}}</a>
                    </td>
                    <td>{{list.nominalName | isValue}}</td>
                    <td>{{list.samplingType | isValue}}</td>
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
            <p class="title">{{title}}</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">标称生产企业名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.nominalName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">标称生产企业地址：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.nominalAddress | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">被抽样单位名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.unitName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">被抽样单位所在省份：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.province | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">食品名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.foodName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">规格型号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.specifications | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生产日期/批号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.manufactureDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">分类：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.type | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">公告号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.noticeNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">备注：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.remarks | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">抽检项目：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.sampledPrj | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui'
    export default {
        name: 'foodDetails',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'国家食品安全监督抽检（合格产品）',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist:[],
                dataDetails:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getFoodList',params).then((res)=>{
                    this.loading=false;
                    this.datalist =res.data;
                    this.totalRecord=res.totalRecord;
                })
                .catch(err=>{
                })
            },
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
                api.Get('/cloudMap/fda/getFoodDetails',{
                    entName:this.$router.currentRoute.params.entName,
                    foodId: id
                }).then((res)=>{
                    this.dataDetails =res.data;
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
    @import "./assets/css/tableCon.css";
    @import "./assets/css/dialog.css";
</style>
