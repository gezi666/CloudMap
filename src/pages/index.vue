<template>
    <div class="content-wrap">
        <header-search :title="headerTitle" @search="toSearch" @highSearch="toHighSearch"></header-search>

        <div class="main-wrap">

            <search-info v-if="showSearchFlag" :searchFlag="toSearchFlag" :conditionValue="searchName" :searchKey="conditionKey" :seniorCondition="conditions" @closeBox="showSearchFlag = false" @getEntInfo="getEntBaseInfo"></search-info>
            <senior-search v-if="showHighSearch" @closeSeniorBox="showHighSearch = false" @toRetrieval="starRetrieval" @toRelation="showRelationList"></senior-search>
            <relation-list v-if="showRelation" :relationEntNames="relationEnt"  @closeRelationBox="showRelation = false" @lookEnterprise="filterEnterprise" @getEntInfoR="getEntBaseInfo"></relation-list>

            <ball></ball>

            <div class="initial"></div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    import headerSearch from '@/components/header-search'
    import ball from '@/components/ball'
    import searchInfo from '@/components/search/index'
    import seniorSearch from '@/components/seniorSearch/condition'
    import relationList from '@/components/seniorSearch/relation'
    export default {
        name: 'index',
        data(){
            return {
                searchName:'',
                conditionKey:[],
                toSearchFlag: true,
                conditions:'',
                headerTitle:'企业星云图',
                showSearchFlag: false,
                showHighSearch: false,
                showRelation: false,
                relationEnt: {}
            }
        },
        mounted(){
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
                let path = '/entBase/'+name
                this.$router.push(path)
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

    .main-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background: url("../../static/img/bottom-bg1.png") bottom no-repeat;
        background-size: cover;
    }
    .initial{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url("../../static/img/initial-bg.png") center no-repeat;
        background-size: 100% auto;
    }
</style>
