    <template>
    <div class="boot-page">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                    <tr>
                        <th class="tc w50">序号</th>
                        <th>案号</th>
                        <th>失信被执行人行为具体情形</th>
                        <th>做出执行依据单位</th>
                        <th class="w100">发布时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(list,index) in datalist" @click="showPopup(list.id)">
                        <td class="tc">{{index+1 | isValue}}</td>
                        <td>
                            <a @click="showPopup(list.id)">{{list.caseNo}}</a>
                        </td>
                        <td>{{list.beDescription | isValue}}</td>
                        <td>{{list.unitExecution | isValue}}</td>
                        <td>{{list.releaseDate | isValue}}</td>
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
            <p class="title">{{title | isValue}}</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">被执行人姓名/名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.beName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">性别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.gender | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">年龄：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.age | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">身份证号码/组织机构代码：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.idCard | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">执行法院：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.executionCourt | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">省份：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.province | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">执行依据文号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.enBasisNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">立案时间：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.filingTime | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">案号：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.caseNo | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">做出执行依据单位：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.unitExecution | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">生效法律文书确定的义务：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.takeObligation | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">被执行人的履行情况：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.executeResult | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">失信被执行人行为具体情形：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.beDescription | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">发布时间：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.releaseDate | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'brokenPromisesDetails',
        data () {
            return {
                dialogVisible: false,
                title:'失信被执行人信息',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
                loading: true,
                datalist: [],
                dataDetails:{}
            }
        },
        methods:{
            handleCurrentChange(val) {//分页
                this.getList({
                    entId: 1,
                    entName: this.$router.currentRoute.params.entName,
                    page: val,
                    pageSize: this.pageSize
                })
            },
            showPopup(id){//模态框
                this.dialogVisible = true;
                api.Get('/cloudMap/court/getDishonestyDetails',{
                    "entName": this.$router.currentRoute.params.entName,
                    "id":id
                })
                    .then(res=>{
                        this.dataDetails = res.data;
                    })
                    .catch(err=>{
                    })
            },
            getList(params){//列表
                api.Get('/cloudMap/court/getDishonestyList',params).then((res)=>{
                    this.loading=false;
                    this.datalist = res.data;
                    this.totalRecord=res.totalRecord;
                })
                .catch(err=>{
                })
            }
        },
        mounted(){
            this.getList({//列表
                entId: 1,
                entName: this.$router.currentRoute.params.entName,
                page: 1,
                pageSize: this.pageSize
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
    .court-table{
        table-layout: fixed;
    }
    .court-table td:nth-child(3){
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
