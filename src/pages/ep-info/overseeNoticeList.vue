    <template>
    <div class="boot-page">
        <!--环境问题督办通知-->
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <table class="court-table">
                <thead>
                <tr>
                    <th class="tc w50">序号</th>
                    <th>情况简述</th>
                    <th class="w100">通报时间</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(list,index) in datalist" @click="showPopup(list.noticeId)">
                    <td class="tc">{{index+1 | isValue}}</td>
                    <td class="noticeTd">
                        <a @click="showPopup(list.noticeId)">{{list.brIntroductd | isValue}}</a></td>
                    <td>{{list.notificationTime | isValue}}</td>
                </tr>
                </tbody>
            </table>
        </div>

        <!--分页-->
        <div class="pageWrap" v-if="this.totalRecord>this.pageSize">
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
                        <span class="titleBarName fl">企业名称：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.entName | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">通报时间：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.notificationTime | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">情况简述：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.brIntroductd | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">所属行政区：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.admArea | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">督办级别：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.supervisionLevel | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">督办单位：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.supervisionOrgan | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">解决措施要点：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.majorSolution | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">解决时限：</span>
                    </h4>
                    <p class="item-value"><span>{{dataDetails.solutionDeadline | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'overseeNoticeList',
        data () {
            return {
                dialogVisible: false,
                loading: true,
                title:'环境问题督办通知',
                pageSize:50,
                currentPage:1,
                totalRecord:'',
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
                api.Get('/cloudMap/ep/getOverseeNoticeDetails',{
                    "entName": this.$router.currentRoute.params.entName,
                    "envId":id
                })
                .then(res=>{
                    this.dataDetails = res.data;
                })
                .catch(err=>{
                })
            },
            getList(params){//列表
                api.Get('/cloudMap/ep/getOverseeNoticeList',params).then((res)=>{
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
    .noticeTd{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
    .court-table{
        table-layout: fixed;
    }
</style>
