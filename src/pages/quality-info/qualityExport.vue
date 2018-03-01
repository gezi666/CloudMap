<template>
    <div class="qualityexport">
        <!--进出口食品安全风险预警通告-->
        <div class="overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <table class="export-table">
                <thead class="export-thead">
                    <tr>
                        <th>序号</th>
                        <th>预警原因</th>
                        <th>发布日期</th>
                    </tr>
                </thead>
                <tbody class="export-tbody">
                    <tr v-for="(item,index) in datalist">
                        <td>{{index+1 | isValue}}</td>
                        <td>{{item.warningReason | isValue}}</td>
                        <td >{{item.releaseDate | isValue}}</td>
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
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'qualityExport',
        data () {
            return {
                loading: true,
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                datalist:[]
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.getList({
                    entId:1,
                    entName:this.$router.currentRoute.params.entName,
                    page:val,
                    pageSize:this.pageSize
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/quality/getExportList',params).then((res)=>{
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
    .qualityexport{
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .export-table{
        width: 100%;
        border-collapse:separate;
        border-spacing:0 4px;
    }
    .export-thead th{
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
    .export-thead th:first-child{
        width: 95px;
        text-align: center;
        border-left: 1px solid #284f9d;
    }
    .export-thead th:last-child{
        width:150px;
        border-right: 1px solid #284f9d;
    }
    .export-tbody td{
        height:34px;
        color: #fff;
        font-size: 12px;
        text-align: left;
        vertical-align: top;
        padding:5px 10px;
        background: rgba(88,143,255,0.15);
        border-top:1px solid rgba(99,150,255,0.35);
        border-bottom:1px solid rgba(99,150,255,0.35);
        box-sizing: border-box;
    }
    .export-tbody tr td:first-child{
        text-align: center;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .export-tbody tr td:last-child{
        width: 100px;
        border-right:1px solid rgba(99,150,255,0.35);
    }
    .export-tbody td a{
        color: #00FFFF;
        text-decoration: none;
    }
    .export-tbody tr:hover {
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
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
