<template>
    <div class="boot-page business-tabel">
        <!--企业基本信息-->
        <div class="baseInfo overflowAuto"  v-loading="loading" element-loading-text="数据加载中...">
            <h3 class="titleBar clearfix">
                <i class="fl"></i>
                <span class="titleBarName fl">
                企业基本信息
            </span>
            </h3>
            <table>
                <tr>
                    <td class="tdname">注册号</td>
                    <td class="tdcon borderRightNone">{{baseInfo.regNumber | isValue}}</td>
                    <td class="tdname">注册时间</td>
                    <td class="tdcon">{{baseInfo.regDate | isValue}}</td>
                </tr>
                <tr>
                    <td class="tdname">企业名称</td>
                    <td class="tdcon borderRightNone">{{baseInfo.enterName | isValue}}</td>
                    <td class="tdname">经营期限</td>
                    <td class="tdcon">{{baseInfo.operateStart | isValue}} 至 {{baseInfo.operateEnd | isValue}}</td>
                </tr>
                <tr>
                    <td class="tdname">企业类型</td>
                    <td class="tdcon borderRightNone">{{baseInfo.enterType | isValue}}</td>
                    <td class="tdname">登记机关</td>
                    <td class="tdcon">{{baseInfo.registerOrganization | isValue}}</td>
                </tr>
                <tr>
                    <td class="tdname">法定代表人</td>
                    <td class="tdcon borderRightNone">{{baseInfo.legalRepresentative | isValue}}</td>
                    <td class="tdname">核准日期</td>
                    <td class="tdcon">{{baseInfo.approvalDate | isValue}}</td>
                </tr>
                <tr>
                    <td class="tdname">注册资本</td>
                    <td class="tdcon borderRightNone">{{baseInfo.regAsset | isValue}}</td>
                    <td class="tdname">住所</td>
                    <td class="tdcon">{{baseInfo.residence | isValue}}</td>
                </tr>
                <tr>
                    <td class="tdname">成立日期</td>
                    <td class="tdcon borderRightNone">{{baseInfo.registerDate | isValue}}</td>
                    <td class="tdname">登记状态</td>
                    <td class="tdcon">{{baseInfo.regStatus | isValue}}</td>
                </tr>
                <tr>
                    <td class="tdname" colspan="4">经营范围</td>
                </tr>
                <tr>
                    <td class="tdcon lastTd" colspan="4">{{baseInfo.businessScope | isValue}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'baseInfoList',
        mounted(){
            api.Get('/cloudMap/business/getBaseInfo',{
                "entId": 1,
                "entName": this.$router.currentRoute.params.entName
            }).then((res)=>{
                this.loading=false;
                this.baseInfo =res.data;
            })
        },
        data () {
            return {
                baseInfo:{},
                loading: true
            }
        },
        methods:{

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
    .baseInfo td.tdname{
        height:34px;
        border:1px solid rgba(42,86,175,0.75);
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        padding-left:18px;
        text-align: left;
    }
    .baseInfo td.tdname:hover{
        height:34px;
        border:1px solid #2751a2;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        text-align: left;
    }
    .baseInfo td.tdcon{
        height:34px;
        border:1px solid rgba(99,150,255,0.35);
        border-left:none;
        background:rgba(88,143,255,0.15);
        color:#fff;
        line-height:28px;
        text-align: left;
        padding-left:38px;
        box-sizing: border-box;
    }
    .baseInfo td.tdcon:hover{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        border-left:none;
        box-sizing: border-box;
        text-align: left;
        padding-left:38px;
    }
    .baseInfo td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .baseInfo tr:hover td.lastTd{
        padding:13px 23px;
        vertical-align: top;
        text-indent:2em;
        border-left:1px solid rgba(99,150,255,0.35);
    }
    .baseInfo td.borderRightNone{
        border-right:none;
    }
    .baseInfo td.borderRightNone:hover{
        border-right:none;
    }

</style>
