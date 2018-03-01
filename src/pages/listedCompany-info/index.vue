<template>
    <div class="content-wrap">
        <span class="close-btn" title="关闭" @click="close">&times;</span>
        <info-list :list="listedCompanyList" cMenu="上市公司信息"  :currentTitle="cItem" @getList="chageList"></info-list>
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
        name:'listedCompany',
        props:['cItem'],
        data(){
            return{
                listedCompanyList:
                    ['公司资料','股东股本','财务分析','主营业务','主力持仓','公司大事','分红发行','行业分析','价值预测'],
            }
        },
        mounted(){
        },
        methods:{
            close(){
                this.$emit('close')
            },
            chageList(txt){
                txt = txt[0]
                switch (txt){
                    case '公司资料':
                        this.$router.push({name:'companyFileList'});
                        break
                    case '股东股本':
                        this.$router.push({name:'shareholderList'});
                        break
                    case '财务分析':
                    this.$router.push({name:'financeAnalysisList'});
                    break;
                    case '主营业务':
                        this.$router.push({name:'mainBusinessList'});
                        break;
                    case '主力持仓':
                        this.$router.push({name:'mainPositionList'});
                        break;
                    case '公司大事':
                        this.$router.push({name:'companyEventList'});
                        break;
                    case '分红发行':
                        this.$router.push({name:'bonusIssueList'});
                        break;
                    case '行业分析':
                        this.$router.push({name:'industryAnalysisList'});
                        break;
                    case '价值预测':
                        this.$router.push({name:'valuePredictList'});
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
        box-sizing: border-box;
        flex: auto;
        overflow: auto;
        padding-top: 20px;
        display: flex;
        justify-content: center;
        align-items: stretch;
        overflow-x: hidden;
        padding-right: 5px;
    }
    .content-wrap .table-wrap:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
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