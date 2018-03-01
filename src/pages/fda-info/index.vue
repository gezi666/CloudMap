<template>
    <div class="content-wrap">
        <span class="close-btn" title="关闭" @click="close">&times;</span>
        <info-list :list="foodList" cMenu="食药监信息"  :currentTitle="cItem" @getList="chageList"></info-list>
        <div class="table-wrap">
            <router-view></router-view>
        </div>
        <div class="download-wrap">
            <span class="download-icon"></span>
            <span class="download">下载企业报告</span>
        </div>
    </div>
</template>

<script type="es6">
    import infoList from '@/components/info-list'
    export default{
        name:'food',
        props:['cItem'],
        data(){
            return{
                foodList:['食品、药品抽检信息','食品、食品添加剂许可证','保健食品注册信息','药品注册、备案信息','药品生产、经营及认证信息','医疗器械注册、备案信息','化妆品注册、备案信息','广告监管信息','互联网药品信息、交易服务']
            }
        },
        methods:{
            close(){
                this.$emit('close')
            },
            chageList(txt){
                txt = txt[0];
                switch (txt){
                    case '食品、药品抽检信息':
                        this.$router.push({name:'foodDetails'});
                        break;
                    case '食品、食品添加剂许可证':
                        this.$router.push({name:'foodLcence'});
                        break;
                    case '保健食品注册信息':
                        this.$router.push({name:'healthFoodLogin'});
                        break;
                    case '药品注册、备案信息':
                        this.$router.push({name:'drugRegRecord'});
                        break;
                    case '药品生产、经营及认证信息':
                        this.$router.push({name:'drugProduction'});
                        break;
                    case '医疗器械注册、备案信息':
                        this.$router.push({name:'medicalInstrument'});
                        break;
                    case '化妆品注册、备案信息':
                        this.$router.push({name:'cosmeticsRegRecord'});
                        break;
                    case '广告监管信息':
                        this.$router.push({name:'adManagement'});
                        break;
                    case '互联网药品信息、交易服务':
                        this.$router.push({name:'internetDrug'});
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
        padding-top: 20px;
        display: flex;
        justify-content: center;
        align-items: stretch;
        overflow-x: hidden;
        padding-right: 5px;
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