<template>
    <div class="boot-page business-tabel" >
        <router-link to="/business/baseInfoList">企业基本信息</router-link>
        <router-link to="/business/shareholderInfoList">股东及出资信息</router-link>
        <router-link to="/business/keyPersonnelInfoList">主要人员信息</router-link>
        <router-link to="/business/branchInfoList">分支机构信息</router-link>
        <router-link to="/business/changeInfoList">变更信息</router-link>
        <router-link to="/business/clearingInfoList">清算信息</router-link>
        <router-link to="/business/admPermitInfoList">行政许可信息</router-link>
        <router-link to="/business/abnormalOperateInfoList">经营异常信息</router-link>
        <router-link to="/business/blacklistInfoList">严重违法失信企业名单</router-link>
        <router-link to="/business/spotCheckInfoList">抽查检查信息</router-link>
        <router-link to="/business/judicialAssistInfoList">司法协助信息</router-link>
        <router-link to="/business/movablesMortgageInfoList">司法协助信息</router-link>
        <router-view></router-view>
        <!--<div  class="baseInfo" v-if="willShow">-->
            <!--<h3 class="titleBar clearfix">-->
                <!--<i class="fl"></i>-->
                <!--<span class="titleBarName fl">-->
                <!--企业基本信息-->
            <!--</span>-->
            <!--</h3>-->
            <!--<table>-->
                <!--<tr>-->
                    <!--<td class="tdname">注册号</td>-->
                    <!--<td class="tdcon">{{baseInfo.regNumber}}</td>-->
                    <!--<td class="tdname">注册时间</td>-->
                    <!--<td class="tdcon">{{baseInfo.regDate}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td class="tdname">企业名称</td>-->
                    <!--<td class="tdcon">{{baseInfo.enterName}}</td>-->
                    <!--<td class="tdname">经营期限</td>-->
                    <!--<td class="tdcon">{{baseInfo.operatePeriodStart}} 至 {{baseInfo.operatePeriodNow}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td class="tdname">企业类型</td>-->
                    <!--<td class="tdcon">{{baseInfo.enterType}}</td>-->
                    <!--<td class="tdname">登记机关</td>-->
                    <!--<td class="tdcon">{{baseInfo.regDept}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td class="tdname">法定代表人</td>-->
                    <!--<td class="tdcon">{{baseInfo.representative}}</td>-->
                    <!--<td class="tdname">核准日期</td>-->
                    <!--<td class="tdcon">{{baseInfo.approvalDate}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td class="tdname">注册资本</td>-->
                    <!--<td class="tdcon">{{baseInfo.registeredCapital}}</td>-->
                    <!--<td class="tdname">住所</td>-->
                    <!--<td class="tdcon">{{baseInfo.residence}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td class="tdname">成立日期</td>-->
                    <!--<td class="tdcon">{{baseInfo.establishDate}}</td>-->
                    <!--<td class="tdname">登记状态</td>-->
                    <!--<td class="tdcon">{{baseInfo.regStatus}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td class="tdname" colspan="4">经营范围</td>-->
                <!--</tr>-->
                <!--<tr>-->
                    <!--<td class="tdcon lastTd" colspan="4">{{baseInfo.businessScope}}</td>-->
                <!--</tr>-->
            <!--</table>-->
            <!--<div class="download">-->
                <!--<i></i>-->
                <!--<a href="">下载企业报告</a>-->
            <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash;股东及出资信息&ndash;&gt;-->
        <!--<div class="shareholderInfo" v-if="willShow">-->
            <!--<table  class="shareholderInfoTable">-->
                <!--<tr>-->
                    <!--<th class="firstTh">序号</th>-->
                    <!--<th class="secondTh">股东类型</th>-->
                    <!--<th class="thirdTh">股东</th>-->
                    <!--<th>认缴额</th>-->
                    <!--<th>实缴额</th>-->
                    <!--<th>操作</th>-->
                <!--</tr>-->
                <!--<template v-for="(item,index) in shareholderInfo">-->
                    <!--<tr class="mainTr">-->
                        <!--<td class="firstTd">{{index+1}}</td>-->
                        <!--<td>{{item.shareholderType}}</td>-->
                        <!--<td>{{item.shareholder}}</td>-->
                        <!--<td>{{item.subscription}}</td>-->
                        <!--<td>{{item.paid}}</td>-->
                        <!--<td class="lastTd"  @click="showTr(index)">明细</td>-->
                    <!--</tr>-->
                    <!--&lt;!&ndash;<transition name="fold">&ndash;&gt;-->
                        <!--<tr v-show="seen" class="example subTr" v-if="current==index">-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td></td>-->
                            <!--<td colspan="2" class="subTd">-->
                                <!--<ul class="fl subTdList" v-for="(val,i) in item.details">-->
                                    <!--<li>-->
                                        <!--出资方式：{{val.investmentStyle}}-->
                                    <!--</li>-->
                                    <!--<li>-->
                                        <!--出资额：{{val.investmentAmount}}-->
                                    <!--</li>-->
                                    <!--<li>-->
                                        <!--出资日期：{{val.investmentDate}}-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</td>-->
                            <!--<td class="lastTd"  @click="hideTr(index)">收起</td>-->
                        <!--</tr>-->
                    <!--&lt;!&ndash;</transition>&ndash;&gt;-->
                <!--</template>-->
            <!--</table>-->
        <!--</div>-->
        <!--&lt;!&ndash;主要人员信息&ndash;&gt;-->
        <!--<div class="keyPersonnelInfo" v-if=willShow>-->
            <!--<ul class="keyPersonnelList clearfix">-->
                <!--<li class="listItem fl" v-for="(item,index) in keyPersonnelInfo" :class='{marginRightZero:(index+1)%3==0}'>-->
                    <!--<span class="num">{{index+1}}</span>-->
                    <!--<span class="position">{{item.position}}</span>-->
                    <!--<span class="name borderRightNone">{{item.name}}</span>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--&lt;!&ndash;分支机构信息&ndash;&gt;-->
        <!--<div class="branchInfo" v-if="willShow">-->
            <!--<table>-->
                <!--<tr>-->
                    <!--<th>序号</th>-->
                    <!--<th>注册号</th>-->
                    <!--<th>分支机构</th>-->
                    <!--<th>登记机关</th>-->
                <!--</tr>-->
                <!--<tr v-for="(item,index) in branchInfo">-->
                    <!--<td class="firstTd">{{index+1}}</td>-->
                    <!--<td>{{item.regNumber}}</td>-->
                    <!--<td>{{item.branch}}</td>-->
                    <!--<td class="lastTd">{{item.regAuthority}}</td>-->
                <!--</tr>-->
            <!--</table>-->
        <!--</div>-->
        <!--&lt;!&ndash;变更信息&ndash;&gt;-->
        <!--<div class="changeInfo" v-if="willShow">-->
            <!--<table>-->
                <!--<tr>-->
                    <!--<th class="firstTh">序号</th>-->
                    <!--<th class="secondTh">变更日期</th>-->
                    <!--<th class="thirdTh">变更事项</th>-->
                    <!--<th class="fourthTh">变更前内容</th>-->
                    <!--<th class="fifthTh">变更后内容</th>-->
                <!--</tr>-->
                <!--<tr v-for="(item,index) in changeInfo">-->
                    <!--<td class="firstTd">{{index+1}}</td>-->
                    <!--<td>{{item.changeDate}} </td>-->
                    <!--<td>-->
                        <!--{{item.changeItem}}-->
                    <!--</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.beforeChange}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td class="lastTd">-->
                        <!--<span class="lastSpan">-->
                            <!--{{item.afterChange}}-->
                        <!--</span>-->
                    <!--</td>-->
                <!--</tr>-->
            <!--</table>-->
        <!--</div>-->
        <!--&lt;!&ndash;清算信息&ndash;&gt;-->
        <!--<div class="clearingInfo" v-if="willShow">-->
            <!--<ul class="clearingInfoList clearfix">-->
                <!--<li class="listItem fl" v-for="(item,index) in clearingInfo" :class='{marginRightZero:(index+1)%3==0}'>-->
                    <!--<span class="num">{{index+1}}</span>-->
                    <!--<span class="position">{{item.position}}</span>-->
                    <!--<span class="name borderRightNone">{{item.name}}</span>-->
                <!--</li>-->
            <!--</ul>-->
        <!--</div>-->
        <!--&lt;!&ndash;行政许可信息&ndash;&gt;-->
        <!--<div class="admPermitInfo" v-if="willShow">-->
            <!--<table>-->
                <!--<tr>-->
                    <!--<th class="firstTh">序号</th>-->
                    <!--<th class="secondTh">行政许可编号</th>-->
                    <!--<th class="thirdTh">许可文件</th>-->
                    <!--<th class="fourthTh">有效期</th>-->
                    <!--<th class="fifthTh">许可机关</th>-->
                <!--</tr>-->
                <!--<tr v-for="(item,index) in admPermitInfo">-->
                    <!--<td class="firstTd">{{index+1}}</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.permitNumber}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td>-->
                        <!--<span class="permitFile">-->
                            <!--{{item.permitFile}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.validPeriod}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td class="lastTd">-->
                        <!--<span class="lastSpan">-->
                            <!--{{item.permitAuth}}-->
                        <!--</span>-->
                    <!--</td>-->
                <!--</tr>-->
            <!--</table>-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;经营异常信息&ndash;&gt;-->
        <!--<div class="abnormalOperateInfo" v-if="willShow">-->
            <!--<table>-->
                <!--<tr>-->
                    <!--<th class="firstTh">序号</th>-->
                    <!--<th class="fourthTh">列入原因</th>-->
                    <!--<th class="thirdTh">决定机关/日期</th>-->
                    <!--<th class="fifthTh">移除原因</th>-->
                    <!--<th class="thirdTh">决定机关/日期</th>-->
                <!--</tr>-->
                <!--<tr v-for="(item,index) in abnormalOperateInfo">-->
                    <!--<td class="firstTd">{{index+1}}</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.inReason}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.inDecideDept}}<br/>{{item.inDecideDate}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.outReason}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td  class="lastTd">-->
                         <!--<span class="lastSpan">-->
                            <!--{{item.outDecideDept}}<br/>{{item.outDecideDate}}-->
                        <!--</span>-->
                    <!--</td>-->
                <!--</tr>-->
            <!--</table>-->
        <!--</div>-->
        <!--&lt;!&ndash;严重违法失信企业名单&ndash;&gt;-->
        <!--<div class="blacklistInfo" v-if="false">-->
            <!--<table>-->
                <!--<tr>-->
                    <!--<th class="firstTh">序号</th>-->
                    <!--<th class="firstTh">类别</th>-->
                    <!--<th class="fourthTh">列入原因</th>-->
                    <!--<th class="thirdTh">决定机关/日期</th>-->
                    <!--<th class="fifthTh">移除原因</th>-->
                    <!--<th class="thirdTh">决定机关/日期</th>-->
                <!--</tr>-->
                <!--<tr v-for="(item,index) in blacklistInfo">-->
                    <!--<td class="firstTd">{{index+1}}</td>-->
                    <!--<td>-->
                        <!--{{item.type}}-->
                    <!--</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.inReason}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.inDecideDept}}<br/>{{item.inDecideDate}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td>-->
                        <!--<span>-->
                            <!--{{item.outReason}}-->
                        <!--</span>-->
                    <!--</td>-->
                    <!--<td  class="lastTd">-->
                        <!--<span class="lastSpan">-->
                            <!--{{item.outDecideDept}}<br/>{{item.outDecideDate}}-->
                        <!--</span>-->
                    <!--</td>-->
                <!--</tr>-->
            <!--</table>-->
        <!--</div>-->
        <!--&lt;!&ndash;抽检检查信息&ndash;&gt;-->

    </div>
</template>

<script>
    export default {
        name: 'businessDetails',
        data () {
            return {
                seen:true,
                current:-1,
                willShow:true,
                baseInfo:{
                    "regNumber":"911100006336462000",
                    "regDate":"1997年6月18日",
                    "enterName":"北京同仁堂股份有限公司",
                    "operatePeriodStart":"1997年6月18日",
                    "operatePeriodNow":"2007年6月18日",
                    "enterType":"其他股份有限公司（上市）",
                    "regDept":"北京市工商行政管理局",
                    "representative":"高振坤",
                    "approvalDate":"2016年11月18日",
                    "registeredCapital":"500万",
                    "residence":"北京市北京市经济开发区西环南路8号",
                    "establishDate":"2006年6月18日",
                    "regStatus":"开业",
                    "businessScope":"制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；制造加工中成药、化妆品；"
                },
                shareholderInfo:[
                    {
                        "shareholderType":"自然人股东",
                        "shareholder":"中国北京同仁堂集团公司",
                        "subscription":"15000万人民币",
                        "paid":"5000万人民币",
                        "details":[
                                {
                                "investmentStyle":"货币",
                                "investmentAmount":"5000万人民币",
                                "investmentDate":"2008-12-20"
                                },
                                {
                                    "investmentStyle":"货币",
                                    "investmentAmount":"5000万人民币",
                                    "investmentDate":"2008-12-20"
                                },
                                {
                                    "investmentStyle":"货币",
                                    "investmentAmount":"5000万人民币",
                                    "investmentDate":"2008-12-20"
                                },
                                {
                                    "investmentStyle":"货币",
                                    "investmentAmount":"5000万人民币",
                                    "investmentDate":"2008-12-20"
                                }
                        ]
                    },
                    {
                        "shareholderType":"自然人股东2",
                        "shareholder":"中国北京同仁堂集团公司",
                        "subscription":"15000万人民币",
                        "paid":"5000万人民币",
                        "details":[
                            {
                                "investmentStyle":"货币",
                                "investmentAmount":"5000万人民币",
                                "investmentDate":"2008-12-20"
                            },
                            {
                                "investmentStyle":"货币",
                                "investmentAmount":"5000万人民币",
                                "investmentDate":"2008-12-20"
                            },
                            {
                                "investmentStyle":"货币",
                                "investmentAmount":"5000万人民币",
                                "investmentDate":"2008-12-20"
                            }
                        ]
                    },
                    {
                        "shareholderType":"自然人股东3",
                        "shareholder":"中国北京同仁堂集团公司",
                        "subscription":"15000万人民币",
                        "paid":"5000万人民币",
                        "details":[
                            {
                                "investmentStyle":"货币",
                                "investmentAmount":"5000万人民币",
                                "investmentDate":"2008-12-20"
                            },
                            {
                                "investmentStyle":"货币",
                                "investmentAmount":"5000万人民币",
                                "investmentDate":"2008-12-20"
                            }
                        ]
                    }
                ],
                keyPersonnelInfo:[
                    {
                        "position":"副董事长",
                        "name":"丁永玲"
                    },
                    {
                        "position":"董事",
                        "name":"冯志梅"
                    },
                    {
                        "position":"副董事长",
                        "name":"丁永玲"
                    },
                    {
                        "position":"董事",
                        "name":"冯志梅"
                    },
                    {
                        "position":"副董事长",
                        "name":"丁永玲"
                    },
                    {
                        "position":"董事",
                        "name":"冯志梅"
                    },
                    {
                        "position":"董事",
                        "name":"冯志梅"
                    },
                    {
                        "position":"副董事长",
                        "name":"丁永玲"
                    }
                ],
                branchInfo:[
                    {
                        "regNumber":"11111111111111111",
                        "branch":"北京同仁堂股份有限公司动植物养殖场",
                        "regAuthority":"昌平分局"
                    },
                    {
                        "regNumber":"22222222222222222",
                        "branch":"北京同仁堂股份有限公司动植物养殖场",
                        "regAuthority":"昌平分局"
                    },
                    {
                        "regNumber":"33333333333333333",
                        "branch":"北京同仁堂股份有限公司动植物养殖场",
                        "regAuthority":"昌平分局"
                    }
                ],
                changeInfo:[

                    {
                        "changeDate":"2015-08-01",
                        "changeItem":"注册资本",
                        "beforeChange":" 111111.11111万元",
                        "afterChange":" 66666.11111万元",
                    },
                    {
                        "changeDate":"2015-08-01",
                        "changeItem":"董事（理事）经理，监事",
                        "beforeChange":" (注：标有*为法定代表人)  1.梅群*董事长 2.丁永玲 副董事长 1.梅群*董事长 2.丁永玲 副董事长 1.梅群*董事长 2.丁永玲 副董事长 1.梅群*董事长 2.丁永玲 副董事长1.梅群*董事长 2.丁永玲 副董事长",
                        "afterChange":"列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录",
                    },
                    {
                        "changeDate":"2015-08-01",
                        "changeItem":"董事（理事）经理，监事董事（理事）经理，监事",
                        "beforeChange":" (注：标有*为法定代表人)  1.梅群*董事长 2.丁永玲 副董事长 1.梅群*董事长 2.丁永玲 副董事长 1.梅群*董事长 2.丁永玲 副董事长 1.梅群*董事长 2.丁永玲 副董事长1.梅群*董事长 2.丁永玲 副董事长",
                        "afterChange":"列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录列入经营异常名录",
                    }
                ],
                clearingInfo:[
                    {
                        "position":"清算负责人",
                        "name":"丁永玲"
                    },
                    {
                        "position":"清算组成员",
                        "name":"冯志梅"
                    },
                    {
                        "position":"清算组成员",
                        "name":"丁永玲"
                    },
                    {
                        "position":"清算负责人",
                        "name":"冯志梅"
                    },
                    {
                        "position":"清算组成员",
                        "name":"丁永玲"
                    },
                    {
                        "position":"清算组成员",
                        "name":"冯志梅"
                    },
                    {
                        "position":"清算负责人",
                        "name":"冯志梅"
                    },
                    {
                        "position":"清算组成员",
                        "name":"丁永玲"
                    },
                    {
                        "position":"清算组成员",
                        "name":"丁永玲"
                    }
                ],
                admPermitInfo:[
                    {
                        "permitNumber":"21111111111111",
                        "permitFile":"许可证名称许可证名称许可证名称",
                        "validPeriod":"2015-08-01-2017-08-01",
                        "permitAuth":"昌平分局",
                    },
                    {
                        "permitNumber":"21111111111111",
                        "permitFile":"许可证名称许可证名称许可证名称",
                        "validPeriod":"2015-08-01-2017-08-01",
                        "permitAuth":"昌平分局",
                    },
                ],
                abnormalOperateInfo:[
                    {
                        "inReason":"通过登记无法联系的",
                        "inDecideDept":"工商行政管理局",
                        "inDecideDate":" 2015-08-01",
                        "outReason":"-",
                        "outDecideDept":"工商行政管理局",
                        "outDecideDate":"2015-08-01"
                    },
                    {
                        "inReason":"通过登记的住所或者经营场所无法联系的",
                        "inDecideDept":"工商行政管理局",
                        "inDecideDate":" 2015-08-01",
                        "outReason":"列入经营异常名录 3年内且依照《经营异常名录管理办法》第六条规定被列入经营异常名录的企业，可以在补报未报年报的年度报告公示后",
                        "outDecideDept":"工商行政管理局",
                        "outDecideDate":" 2015-08-01"
                    }
                ],
                blacklistInfo:[
                    {
                        "type":"工商",
                        "inReason":"通过登记无法联系的",
                        "inDecideDept":"工商行政管理局",
                        "inDecideDate":" 2015-08-01",
                        "outReason":"-",
                        "outDecideDept":"工商行政管理局",
                        "outDecideDate":"2015-08-01"
                    },
                    {
                        "type":"工商",
                        "inReason":"通过登记的住所或者经营场所无法联系的",
                        "inDecideDept":"工商行政管理局",
                        "inDecideDate":" 2015-08-01",
                        "outReason":"列入经营异常名录 3年内且依照《经营异常名录管理办法》第六条规定被列入经营异常名录的企业，可以在补报未报年报的年度报告公示后",
                        "outDecideDept":"工商行政管理局",
                        "outDecideDate":" 2015-08-01"
                    }
                ],
            }
        },
        methods:{
            showTr(i){
                this.current=i;
//                this.seen=!this.seen;
                this.seen=true;
            },
            hideTr(i){
                this.current=i;
                this.seen=false;
            }
        },
        components:{

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import 'assets/css/common.css';
    @import 'assets/css/baseInfo.css';
    @import 'assets/css/shareholderInfo.css';
    @import 'assets/css/shareholderInfo.css';
    @import 'assets/css/keyPersonnel.css';
    @import 'assets/css/branch.css';
    @import 'assets/css/changeInfo.css';
    @import 'assets/css/clearingInfo.css';
    @import 'assets/css/admPermitInfo.css';
    @import 'assets/css/abnormalOperateInfo.css';
    @import 'assets/css/blacklistInfo.css';
    .boot-page {
        width: 100%;
        height: 100%;
    }
    a{
        font-size: 20px;
        color: #fff;
        text-align: center;
        margin:0 20px;
    }

</style>
