<template>
    <div class="boot-page" >
        <!--著作权-->
        <div class="copyright overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
        <table>
            <tr>
                <th class="firstTh">序号</th>
                <th class="secondTh">作品标题</th>
                <th class="thirdTh">作品分类</th>
                <th class="fourthTh">版本号</th>
                <th class="fifthTh">登记日期</th>
            </tr>
            <tr v-for="(item,index) in copyright"  @click="showPopup(item.id)">
                <td class="firstTd">{{index+1}}</td>
                <td  class="secondTd">
                        {{item.worksTitle | isValue}}
                </td>
                <td>
                        {{item.classificationWork | isValue}}
                </td>
                <td>
                        {{item.versionNum | isValue}}
                </td>
                <td  class="lastTd">
                        {{item.regDate | isValue}}
                </td>
            </tr>
        </table>
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
        <!--弹框-->
        <el-dialog  :visible.sync="dialogVisible" :lock-scroll="false">
            <p class="title">著作权详情</p>
            <!--这里写自己的内容-->
            <div class="dialog-con">
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">作品标题：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.worksTitle | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">作品分类 ：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.classificationWork | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">版本号：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.versionNum | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">权利人：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.obligee | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">创作性质：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.creativeNature | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">登记日期：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.regDate | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">作者：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.author | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">创作完成时间：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.completionTime | isValue}} </span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">权利归属方式：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.ownershipMode | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">首次发表地点：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.publicationPlace | isValue}}</span></p>
                </div>
                <div class="dialog-item">
                    <h4 class="clearfix item-name">
                        <i class="fl"></i>
                        <span class="titleBarName fl">首次发表日期：</span>
                    </h4>
                    <p class="item-value"><span>{{copyrightList.publicationDate | isValue}}</span></p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api.js'
    import { Loading } from 'element-ui';
    export default {
        name: 'copyrightList',
        data () {
            return {
                dialogVisible: false,
                totalRecord:0,
                pageSize:50,
                currentPage3:1,
                copyright:[],
                copyrightList:{},
                loading: true
            }
        },
        mounted(){
            api.Get('/cloudMap/inAssetsInfo/getCopyrightList',{
                "page":1,
                "pageSize":this.pageSize,
                "entId":1,
                "entName":this.$router.currentRoute.params.entName
            }).then(res=>{
                this.loading=false;
                this.copyright=res.data;
                this.totalRecord=res.totalRecord;
            });
        },
        methods:{
            showPopup(id){
                this.dialogVisible = true;
                api.Get('/cloudMap/inAssetsInfo/getCopyrightInfo', {
                    "id": id,
                    "entId":1,
                    "entName":this.$router.currentRoute.params.entName
                }).then(res => {
                    this.copyrightList = res.data;
                });
            },
            handleCurrentChange(val) {
                api.Get('/cloudMap/inAssetsInfo/getCopyrightList',{
                    "entId":1,
                    "entName":this.$router.currentRoute.params.entName,
                    "page":val,
                    "pageSize":this.pageSize
                }).then(res=>{
                    this.copyright=res.data;
                    this.totalRecord=res.totalRecord;
                });
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
    @import 'assets/css/tableStyle.css';
    .copyright .firstTh{
        width:10%;
    }
    .copyright .secondTh{
        width:40%;
    }
    .copyright .thirdTh{
        width:15%;
    }
    .copyright .fourthTh{
        width:20%
    }
    .copyright .fifthTh{
        width:15%
    }
    .secondTd{
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
    }
    tr:hover .secondTd{
        color:#33b0ff;
        font-weight: bold;
    }

</style>
