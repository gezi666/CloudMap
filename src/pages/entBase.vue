<template>
    <div class="content-wrap ent-info">

        <header-search :title="headerTitle" @search="toSearch" @highSearch="toHighSearch"></header-search>
        <div class="collection-wrap">
            <collection></collection>
        </div>
        <div :class="['main-wrap',{'bottom-bg':!detailsFlag}]">

            <search-info v-if="showSearchFlag" :searchFlag="toSearchFlag" :conditionValue="searchName" :searchKey="conditionKey" :seniorCondition="conditions" @closeBox="showSearchFlag = false" @getEntInfo="getEntBaseInfo"></search-info>
            <senior-search v-if="showHighSearch" @closeSeniorBox="showHighSearch = false" @toRetrieval="starRetrieval" @toRelation="showRelationList"></senior-search>
            <relation-list v-if="showRelation" :relationEntNames="relationEnt" @closeRelationBox="showRelation = false" @lookEnterprise="filterEnterprise" @getEntInfoR="getEntBaseInfo"></relation-list>

            <transition name="ball">
                <ball  v-show="!detailsFlag" :list="itemList" @toList="getDetails"></ball>
            </transition>

            <ul class="menu left-menu">
                <li :class="[(leftCurrentIndex == index1) ? 'active' : '',{nodata:!item1.hasData}]" v-for="(item1,index1) in leftMenu" @click="tabLeft(index1,item1)" @mouseover="mouseoverMenu(0,index1,item1)" @mouseout="clearTimer"><div class="menu-label">{{item1.modularName}}</div></li>
            </ul>
            <ul class="menu right-menu">
                <li :class="[(rightCurrentIndex == index) ? 'active' : '',{nodata:!item2.hasData}]" v-for="(item2,index) in rightMenu" @click="tabRight(index,item2)" @mouseover="mouseoverMenu(1,index,item2)" @mouseout="clearTimer"><div class="menu-label">{{item2.modularName}}</div></li>
            </ul>

            <transition name="table">
                <router-view  v-if="detailsFlag" :cItem="currentItem" @close="closeTable"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import headerSearch from '@/components/header-search'
    import collection from '@/components/collection'
    import ball from '@/components/ball'
    import searchInfo from '@/components/search/index'
    import seniorSearch from '@/components/seniorSearch/condition'
    import relationList from '@/components/seniorSearch/relation'
    export default {
        name: 'entBase',
        data(){
            return {
                timer: 0,
                searchName:'',
                conditionKey:[],
                toSearchFlag: true,
                conditions:'',
                relationEnt: {},
                headerTitle:'',
                showSearchFlag: false,
                showHighSearch: false,
                showRelation: false,
                leftMenu:[],
                rightMenu:[],
                leftCurrentIndex: '-1',
                rightCurrentIndex: '-1',
                hasNoData: false,
                detailsFlag: false,
                itemList:'',
                businessList:["企业基本信息","股东及出资信息","主要人员信息","分支机构信息","变更信息","清算信息","行政许可信息","经营异常信息","严重违法失信企业名单（黑名单）信息","抽查检查信息","司法协助信息","动产抵押信息","股权出质信息","知识产权出质登记信息","行政处罚信息","企业年报信息"],
                qualityList:["消费品产品质量国家监督抽查结果","进境食品风险预警","进出口食品安全风险预警通告","车辆召回信息"],
                taxList:["A级纳税人名单","税收违法案件","欠税信息","非正常户认定","税务行政处罚"],
                financeList:["银监会行政处罚","证监会行政处罚","保监会行政处罚"],
                foodList:["食品、药品抽检信息","食品、食品添加剂许可证","保健食品注册信息","药品注册、备案信息","药品生产、经营及认证信息","医疗器械注册、备案信息","化妆品注册、备案信息","广告监管信息","互联网药品信息、交易服务"],
                internetList:['互联网数据'],
                customsList:['海关注册信息','海关进出口信息','海关行政处罚'],
                inCapitalList:['专利','商标','著作权','软件著作权','著作权合同备案','ICP备案'],
                opStatusList:['投资信息','并购信息','中标信息','投标信息','招聘信息'],
                courtList:['被执行人信息','失信被执行人信息','裁判文书','法院公告'],
                environmentalList:['环保行政处罚','国家重点监控企业名单','环境问题督办通知','“12369”环保举报热线案件情况','重点环境案件处理情况'],
                listedCompanyList:['公司资料','股东股本','财务分析','主营业务','主力持仓','公司大事','分红发行','行业分析','价值预测'],
                currentMenu: '工商信息',
                currentItem:{
                    itemTitle:'',
                    itemIndex: 0
                }
            }
        },
        mounted(){
            this.headerTitle = this.$route.params.entName
            if (this.$router.currentRoute.name !== 'entBase'){
                this.detailsFlag = true
            } else {
                this.detailsFlag = false
            }
//            获取菜单信息
            api.Get('/cloudMap/entInfo/getEntInfo',{
                entName: this.headerTitle
            }).then((res)=>{
              res.data.modularList  = [ { "modularCode": 1, "modularName": "工商信息", "hasData": true },{ "modularCode": 2, "modularName": "质检信息", "hasData": true },{ "modularCode": 3, "modularName": "税务信息", "hasData": true },{ "modularCode": 4, "modularName": "金融监管信息", "hasData": true },{ "modularCode": 5, "modularName": "食药监信息", "hasData": true },{ "modularCode": 6, "modularName": "互联网数据", "hasData": true },{ "modularCode": 7, "modularName": "海关信息", "hasData": true },{ "modularCode": 8, "modularName": "无形资产", "hasData": true },{ "modularCode": 9, "modularName": "经营状况", "hasData": true },{ "modularCode": 10, "modularName": "法院信息", "hasData": true },{ "modularCode": 11, "modularName": "环保信息", "hasData": true },{ "modularCode": 12, "modularName": "上市公司信息", "hasData": true } ]
              this.leftMenu=res.data.modularList.slice(0,6);
              this.rightMenu =res.data.modularList.slice(6);
            })
        },
        methods:{
            toSearch(entName){
                if(entName && entName!==''){
                    this.showSearchFlag = true
                    this.showHighSearch = false
                    this.showRelation = false
                    this.toSearchFlag = !this.toSearchFlag
                    this.searchName  = entName
                    this.conditionKey = [entName]
                } else {
                    const h = this.$createElement;
                    this.$msgbox({
                        title: '提示',
                        message: h('div', null, [
                            h('p', { style: 'color: #ffcc00; font-size:16px; text-align: center;' }, '请输入要查询的公司名称 ')
                        ]),
                        customClass:'save-box',
                        lockScroll: false,
                        confirmButtonClass:'tip-confirm',
                        callback: action => {
                            return false
                        }
                    });
                }
            },
            toHighSearch(){
                this.showHighSearch = true
                this.showSearchFlag = false
                this.showRelation = false
            },
            getEntBaseInfo(name){
                if(name){
                    this.headerTitle = name
                    let path = '/entBase/'+name
                    this.$router.push(path)
                    this.detailsFlag = false
                    this.leftCurrentIndex = '-1'
                    this.rightCurrentIndex =  '-1'
                    this.itemList = ''
                }
                this.showSearchFlag = false
                this.showRelation = false
            },
            clearTimer(){
                this.timer = 0
                clearInterval(this.mouseOverTimer)
            },
            mouseoverMenu(flag,index,item){
                let that = this
                that.mouseOverTimer = setInterval(function () {
                    that.timer ++
                    if(that.timer === 3){
                        that.timer = 0
                        clearInterval(that.mouseOverTimer)
                        if(flag === 0){
                            that.tabLeft(index,item)
                        } else if (flag === 1) {
                            that.tabRight(index,item)
                        }
                    }
                },1000)
            },
            tabLeft(index,item){
                if(item.hasData){
                    this.detailsFlag = false
                    this.leftCurrentIndex = index
                    this.rightCurrentIndex = -1
                    this.currentMenu = item.modularName

//                    请求接口
//                    api.Get('/cloudMap/entInfo/getModularInfo',{
//                        modularCode: item.modularCode
//                    }).then((res)=>{
//                        this.itemList = res.data
//                    })

//                    本地数据
                    switch (item.modularName)
                    {
                        case '工商信息':
                            this.itemList = this.businessList
                            break
                        case '质检信息':
                            this.itemList = this.qualityList
                            break
                        case '税务信息':
                            this.itemList = this.taxList
                            break
                        case '金融监管信息':
                            this.itemList = this.financeList
                            break
                        case '食药监信息':
                            this.itemList = this.foodList
                            break
                        case '互联网数据':
                            this.itemList = this.internetList
                            break
                        default :
                            this.itemList = this.businessList
                            break
                    }
                } else {
                    return
                }
            },
            tabRight(index,item){
                if(item.hasData) {
                    this.detailsFlag = false
                    this.rightCurrentIndex = index
                    this.leftCurrentIndex = -1
                    this.currentMenu = item.modularName
//                    请求接口
//                    api.Get('/cloudMap/entInfo/getModularInfo',{
//                        modularCode: item.modularCode
//                    }).then((res)=>{
//                        this.itemList = res.data
//                    })
//                    本地数据
                    switch (item.modularName)
                    {
                        case '海关信息':
                            this.itemList = this.customsList
                            break
                        case '无形资产':
                            this.itemList = this.inCapitalList
                            break
                        case '经营状况':
                            this.itemList = this.opStatusList
                            break
                        case '法院信息':
                            this.itemList = this.courtList
                            break
                        case '环保信息':
                            this.itemList = this.environmentalList
                            break
                        case '上市公司信息':
                            this.itemList = this.listedCompanyList
                            break
                        default :
                            this.itemList = this.businessList
                            break
                    }
                }
            },
            closeTable(){
                this.detailsFlag = false
            },
            getDetails(p){
                this.detailsFlag = true
                this.currentItem.itemTitle = p[0]
                this.currentItem.itemIndex = p[1]
                switch (this.currentMenu)
                {
                    case '工商信息':
                        this.$router.push({name:'business'})
                        break
                    case '质检信息':
                        this.$router.push({name:'quality'})
                        break
                    case '税务信息':
                        this.$router.push({name:'tax'})
                        break
                    case '金融监管信息':
                        this.$router.push({name:'finance'})
                        break
                    case '食药监信息':
                        this.$router.push({name:'food'})
                        break
                    case '互联网数据':
                        this.$router.push({name:'internet'})
                        break
                    case '海关信息':
                        this.$router.push({name:'customs'})
                        break
                    case '无形资产':
                        this.$router.push({name:'inCapital'})
                        break
                    case '经营状况':
                        this.$router.push({name:'opStatus'})
                        break
                    case '法院信息':
                        this.$router.push({name:'court'})
                        break
                    case '环保信息':
                        this.$router.push({name:'environmental'})
                        break
                    case '上市公司信息':
                        this.$router.push({name:'listedCompany'})
                        break
                    default :
                        break
                }
            },
            starRetrieval(result){
                this.showSearchFlag = true
                this.showHighSearch = false
                this.showRelation = false
                this.conditions = result[0]
                this.conditionKey = result[1]
            },
            showRelationList(relationTxt){
                this.showSearchFlag = false
                this.showHighSearch = false
                this.showRelation = true
                this.relationEnt = relationTxt
            },
            filterEnterprise(name){
                this.showSearchFlag = true
                this.showHighSearch = false
                this.showRelation = false
                this.conditions = {legalPerson:name}
            }
        },
        components:{
            headerSearch,
            collection,
            ball,
            searchInfo,
            seniorSearch,
            relationList
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .content-wrap{
        width: 100%;
        height: 100%;
    }
    .collection-wrap{
        min-width: 1280px;
        z-index: 2;
        position: absolute;
        left: 0;
        right: 0;
        top: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ball-enter {
        transform: translate3d(0,50%,0) scale(0);
        opacity: 0
    }
    .ball-enter-active {
        transition: all .8s
    }
    .ball-leave-active {
        transform: translate3d(0,-40%,0) scale(0);
        opacity: 0;
        transition: all .8s
    }
    .table-enter-active, .table-leave-active {
        transition: all .8s
    }
    .table-enter, .table-leave-to {
        transform: scale(0);
        opacity: 0
    }
    .main-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../../static/img/bottom-bg2.png") bottom no-repeat;
        background-size: contain;
    }
    .main-wrap.bottom-bg{
        background: url("../../static/img/bottom-bg1.png") center no-repeat;
        background-size: cover;
    }
    .initial{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url("../../static/img/initial-bg.png") center no-repeat;
    }
    .menu li{
        position: relative;
        box-sizing: border-box;
        width: 221px;
        height: 50px;
        margin-bottom: 40px;
        cursor: pointer;
        background: rgba(16,45,68,.8);
        transition: all .3s;
    }
    .menu li .menu-label{
        box-sizing: border-box;
        position: absolute;
        top: -9px;
        height: 68px;
        width: 224px;
        color: #fff;
        font-size: 26px;
        font-weight: bold;
        transition: all .3s;
    }
    .left-menu{
        position: absolute;
        left: 0;
        top: 310px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .left-menu li{
        border-top-right-radius: 19px;
        border-bottom-right-radius: 10px;
    }
    .left-menu li .menu-label{
        left: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 46px;
        background: url('../../static/img/left-menu-bg.png') center no-repeat;
        background-size: 100% 100%;
    }
    .left-menu li.active,
    .left-menu li:hover {
        width: 255px;
        color: #ffc000;
        background: rgba(56,45,35,.8);
        box-shadow: -10px 0 20px 14px #63351f;
    }
    .left-menu li.active .menu-label,
    .left-menu li:hover .menu-label{
        width: 261px;
        color: #ffc000;
        background: url('../../static/img/left-menu-bg-ac.png') center no-repeat;
        background-size: 100% 100%;
    }
    .right-menu{
        position: absolute;
        right: 0;
        top: 310px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .right-menu li{
        border-top-left-radius: 19px;
        border-bottom-left-radius: 10px;
    }
    .right-menu li .menu-label{
        right: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 46px;
        background: url('../../static/img/right-menu-bg.png') center no-repeat;
        background-size: 100% 100%;
    }
    .right-menu li.active,
    .right-menu li:hover {
        width: 255px;
        color: #ffc000;
        background: rgba(56,45,35,.8);
        box-shadow: 10px 0 20px 14px #63351f;
    }
    .right-menu li.active .menu-label,
    .right-menu li:hover .menu-label{
        width: 261px;
        color: #ffc000;
        background: url('../../static/img/right-menu-bg-ac.png') center no-repeat;
        background-size: 100% 100%;
    }
    .menu li.nodata,
    .menu li.nodata:hover{
        box-shadow: none;
        background: none;
    }
    .menu li.nodata .menu-label{
        width: 224px;
        color: #fff;
        cursor: default;
        background-size: 100% auto;
    }
    .right-menu li.nodata .menu-label{
        background: url('../../static/img/right-menu-bg-no.png') center no-repeat;
    }
    .left-menu li.nodata .menu-label{
        background: url('../../static/img/left-menu-bg-no.png') center no-repeat;
    }
</style>
