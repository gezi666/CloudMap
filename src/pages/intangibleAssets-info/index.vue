<template>
    <div class="content-wrap">
        <span class="close-btn" title="关闭" @click="close">&times;</span>
        <info-list :list="inCapitalList" cMenu="无形资产"  :currentTitle="cItem" @getList="chageList"></info-list>
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
        name:'inCapital',
        props:['cItem'],
        data(){
            return{
                inCapitalList:
                    ['专利','商标','著作权','软件著作权','著作权合同备案','ICP备案','']
            }
        },
        mounted(){
        },
        methods:{
            close(){
                this.$emit('close')
            },
            chageList(txt){
                txt = txt[0];
                switch (txt){
                    case '专利':
                        this.$router.push({name:'patentList'});
                        break;
                    case '商标':
                        this.$router.push({name:'trademarkList'});
                        break;
                    case '著作权':
                        this.$router.push({name:'copyrightList'});
                        break;
                    case '软件著作权':
                        this.$router.push({name:'sfcopyrightList'});
                        break;
                    case '著作权合同备案':
                        this.$router.push({name:'contractRecordList'});
                        break;
                    case 'ICP备案':
                        this.$router.push({name:'icpRecordList'});
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
        overflow: auto;
        padding-top: 20px;
        display: flex;
        justify-content: center;
        align-items: stretch;
        overflow: auto;
        overflow-x: hidden;
        /*overflow-y: hidden;*/
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