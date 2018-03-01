<template>
    <div class="content-wrap">
        <span class="close-btn" title="关闭" @click="close">&times;</span>
        <info-list :list="businessList" cMenu="工商信息"  :currentTitle="cItem" @getList="chageList"></info-list>
        <div class="table-wrap">
            <router-view></router-view>
        </div>
        <div class="download-wrap">
            <span class="download-icon"></span>
            <span class="download">下载企业报告</span>
        </div>
    </div>
</template>

<script>
    import infoList from '@/components/info-list'
    export default{
        name:'business',
        props:['cItem'],
        data(){
            return{
                entName:'',
                businessList:
                    ['企业基本信息','股东及出资信息','主要人员信息','分支机构信息','变更信息','清算信息','行政许可信息','经营异常信息','严重违法失信企业名单（黑名单）信息','抽查检查信息','司法协助信息','动产抵押信息','股权出质信息','知识产权出质登记信息','行政处罚信息','企业年报信息']
            }
        },
        mounted(){
//            获取企业名称
//            console.log(this.$router.currentRoute.params.entName)
        },
        methods:{
            close(){
                this.$emit('close')
            },
            chageList(txt){
                txt = txt[0]
                switch (txt){
                    case '企业基本信息':
                        this.$router.push({name:'baseInfoList'});
                        break
                    case '股东及出资信息':
                        this.$router.push({name:'shareholderInfoList'});
                        break
                    case '主要人员信息':
                        this.$router.push({name:'keyPersonnelInfoList'});
                        break;
                    case '分支机构信息':
                        this.$router.push({name:'branchInfoList'});
                        break;
                    case '变更信息':
                        this.$router.push({name:'changeInfoList'});
                        break;
                    case '清算信息':
                        this.$router.push({name:'clearingInfoList'});
                        break;
                    case '行政许可信息':
                        this.$router.push({name:'admPermitInfoList'});
                        break;
                    case '经营异常信息':
                        this.$router.push({name:'abnormalOperateInfoList'});
                        break;
                    case '严重违法失信企业名单（黑名单）信息':
                        this.$router.push({name:'blacklistInfoList'});
                        break;
                    case '抽查检查信息':
                        this.$router.push({name:'spotCheckInfoList'});
                        break;
                    case '司法协助信息':
                        this.$router.push({name:'judicialAssistInfoList'});
                        break;
                    case '动产抵押信息':
                        this.$router.push({name:'movablesMortgageInfoList'});
                        break;
                    case '股权出质信息':
                        this.$router.push({name:'equityCapitalInfoList'});
                        break;
                    case '知识产权出质登记信息':
                        this.$router.push({name:'intellectualPropertyInfoList'});
                        break;
                    case '行政处罚信息':
                        this.$router.push({name:'admPunishInfoList'});
                        break;
                    case '企业年报信息':
                        this.$router.push({name:'entAnnualReportInfoList'});
                        break;
                }
            }
        },
        components:{
            infoList
        }
    }

</script>
<style scoped>
    .content-wrap{
        position: absolute;
        top: 120px;
        right: 0;
        bottom:0;
        left: 0;
        margin: auto;
        width: 60%;
        height: 700px;
        padding: 0 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
        background: url("../../../static/img/table-bg.png") center no-repeat;
        background-size: 100% 100%;
    }
    .content-wrap .table-wrap{
        flex: auto;
        padding-top: 20px;
        display: flex;
        justify-content: center;
        align-items: stretch;
        overflow-x: hidden;
    }
    /*.content-wrap .table-wrap:hover::-webkit-scrollbar-thumb{*/
        /*background:rgba(7,100,180,1)*/
    /*}*/
    .content-wrap .close-btn{
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        justify-content: center;
        width: 20px;
        height: 20px;
        line-height: 15px;
        border: none;
        color: #0a6cbb;
        font-size: 40px;
        cursor: pointer;
        transition: all .5s;
    }
    .content-wrap .close-btn:hover{
        color: #1e96f6;
    }
    .content-wrap .download-wrap{
        height: 90px;
        flex: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .content-wrap .download-wrap span{
        color: #fff;
    }
    .download-wrap .download-icon{
        margin-bottom: 5px;
        width: 19px;
        height: 19px;
        background: url("../../../static/img/download-icon.png") center no-repeat;
    }
    .download-wrap .download{
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid #fff;
        cursor: pointer;
    }
    .download-wrap .download:hover{
        color: #068bb0;
        border-bottom-color: #068bb0;
    }
</style>