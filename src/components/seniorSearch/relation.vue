<template>
    <div class="relation-wrap">
        <div class="open-wrap">
            <span class="close" @click="closeRelationBox"></span>
            <ul class="label-line">
                <li :class="['menu',{'active':(currentNum == index)}]" v-for="(item,index) in menuList" @click="changeList(index)">
                    <span>{{item}}</span>
                </li>
            </ul>
            <ul v-show="firmFlag" class="list-wrap" v-loading = "loading" element-loading-text="数据加载中...">
                <li v-for="(item,index) in firmList" v-show="firmList.length > 0" @click="getEntInfoR(index)">
                    <a class="entName" ref="entName">{{item.entName}}</a>
                    <p class="entInfo">
                        <span class="legalPerson">法定代表人：{{item.legalRepresentative | isValue }}</span>
                        <span class="registerTime">成立：{{item.registerTime | isValue }}</span>
                        <span class="regAsset">注册资本：{{item.regAsset | isValue }}</span>
                    </p>
                </li>
                <li v-show="!loading && firmList.length ===0" class="noDataLi">暂无数据</li>
            </ul>
            <ul v-show="shareholderFlag" class="list-wrap" v-loading = "loading" element-loading-text="数据加载中...">
                <li v-for="(item,index) in shareholderList" v-show="shareholderList.length > 0" @click="getEntInfoR(index)">
                    <a class="entName" ref="entName">{{item.entName}}</a>
                    <p class="entInfo">
                        <span class="legalPerson">法定代表人：{{item.legalRepresentative | isValue }}</span>
                        <span class="registerTime">成立：{{item.registerTime | isValue }}</span>
                        <span class="regAsset">注册资本：{{item.regAsset | isValue }}</span>
                    </p>
                </li>
                <li v-show="!loading && shareholderList.length ===0" class="noDataLi">暂无数据</li>
            </ul>
            <ul v-show="seniorFlag" class="list-wrap" v-loading = "loading" element-loading-text="数据加载中...">
                <li v-for="item in seniorList" v-show="seniorList.length > 0" class="executive" @click="lookEnterprise(item.executiveName)">
                    <div class="enterprise-logo"><img src="../../../static/img/enterpriseLogo.png" alt="logo"></div>
                    <div class="executive-info">
                        <div class="left-con">
                            <p class="executive-name">{{item.executiveName | isValue }}</p>
                            <p class="enterprise-list" v-for="item1 in item.enterpriseList">{{item1.enterpriseName | isValue }}：{{item1.executivePost | isValue }}</p>
                        </div>
                        <a class="right-con">查看任职企业</a>
                    </div>
                </li>
                <li v-show="!loading && seniorList.length ===0" class="noDataLi">暂无数据</li>
            </ul>
            <!--分页-->
            <div class="pageWrap"  v-if="totalRecord > pageSize">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="prev, pager, next, jumper"
                        :total="totalRecord">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'relation',
        props:['relationEntNames'],
        data(){
            return {
                currentNum: 0,
                totalRecord: 0,
                pageSize: 50,
                currentPage: 1,
                firmFlag: true,
                shareholderFlag: false,
                seniorFlag: false,
                menuList:['共同投资企业','共同法人股东','共同高管'],
                firmList:[],
                shareholderList:[],
                seniorList:[],
                loading: true
            }
        },
        mounted(){
            this.getList({
                page: 1,
                pageSize: this.pageSize,
                relationName: 0
            })
        },
        methods:{
            closeRelationBox(){
                this.$emit('closeRelationBox')
            },
            getList(params){
                if(this.currentNum === 2 && this.seniorList.length === 0){
                    this.loading = true
                } else if(this.currentNum === 1 && this.shareholderList.length === 0){
                    this.loading = true
                } else if(this.firmList.length === 0){
                    this.loading = true
                }
                api.Get('/cloudMap/entSearch/findRelationList',Object.assign(params,this.relationEntNames)).then((res)=>{
                    this.loading = false
                    this.totalRecord = res.totalRecord
                    if(this.currentNum === 2){
                        this.seniorList = res.data
                    } else if(this.currentNum === 1){
                        this.shareholderList = res.data
                    } else{
                        this.firmList = res.data
                    }
                })
            },
            changeList(i){
                this.currentNum = i
                if(i===0){
                    this.firmFlag = true
                    this.shareholderFlag = false
                    this.seniorFlag = false
                } else if(i===1){
                    this.firmFlag = false
                    this.shareholderFlag = true
                    this.seniorFlag = false
                } else{
                    this.firmFlag = false
                    this.shareholderFlag = false
                    this.seniorFlag = true
                }
                this.getList({
                    page: 1,
                    pageSize: this.pageSize,
                    relationName: i
                })
            },
            getEntInfoR(index){
                let name = this.$refs.entName[index].innerText
                let entid = 'relation'+ index
                if(top.window.addTab){
                    let base = 'http://'+location.host
//                    top.window.addTab(base+'/entCloudMap/#/entBase/'+ name, '企业星云图-'+name, entid)
                    top.window.addTab(base+'/cloudMap/index.html#/entBase/'+ name, '企业星云图-'+name, entid)
                } else {
                    let base = location.href.substring(0,location.href.indexOf('#')+1)
                    window.open(base+'entBase/'+ name)
//                    this.$emit('getEntInfoR',name)
                }
            },
            lookEnterprise(name){
                this.$emit('lookEnterprise',name)
            },
            //分页
            handleCurrentChange(val) {
                this.getList(this.firmList,{
                    page: val,
                    pageSize: this.pageSize,
                    relationName: this.currentNum
                })
            }
        },
        filters:{
            isValue(val){
                return val = (val=="") ? "-" : val
            }
        }
    }
</script>

<style scoped>
    .relation-wrap{
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: linear-gradient(to bottom,rgba(8,14,37,.95),rgba(0,45,111,.95));
    }
    .open-wrap{
        position: absolute;
        box-sizing: border-box;
        top: 55px;
        right:0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 1262px;
        height: 828px;
        padding: 90px 65px 56px 55px;
        background: url("../../../static/img/search-wrap-bg.png") center no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }
    .open-wrap .close{
        position: absolute;
        top: 8px;
        right: 8px;
        width: 44px;
        height: 44px;
        cursor: pointer;
        background: url("../../../static/img/close-icon.png") center no-repeat;
        transition: all .3s;
    }
    .open-wrap .close:hover{
        background: url("../../../static/img/close-icon-hover.png") center no-repeat;
    }
    .condition-wrap{
        flex: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }
    .label-line{
        padding-left: 20px;
        margin-bottom: 5px;
        flex: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .label-line .menu{
        width: 220px;
        height: 36px;
        transform: skew(-40deg);
        box-sizing: border-box;
        border: 1px solid #0389a7;
        background: linear-gradient(to bottom, rgba(3,90,136,.5),rgba(3,72,137,.5));
        display: flex;
        justify-content: center;
        align-items: stretch;
        cursor: pointer;
    }
    .label-line .menu.active,
    .label-line .menu:hover{
        border: 1px solid #00edff;
        background: linear-gradient(to bottom, rgba(2,143,193,.5),rgba(2,106,194,.5));
        box-shadow: 0 0 20px 0 #39688c;
    }
    .label-line .menu:nth-child(2){
        margin: 10px;
    }
    .label-line .menu span{
        width: 100%;
        height: 100%;
        transform: skew(40deg);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .list-wrap{
        padding-right: 5px;
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        overflow: auto;
        overflow-x: hidden;
    }
    .list-wrap:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .list-wrap li{
        cursor: pointer;
        box-sizing: border-box;
        padding: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        height: 80px;
        margin-bottom: 6px;
        flex: none;
        border: 5px solid transparent;
        border-left: 1px solid transparent;
        border-right:1px solid transparent;
        border-image: url("../../../static/img/result-list-bg.png") 5 1 5 1 round;
        background: rgba(3,70,123,.5);
    }
    .list-wrap li.noDataLi{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 18px;
    }
    .list-wrap li span{
        color: #fff;
        font-size: 12px;
    }
    .list-wrap li .entName{
        color: #fff600;
        font-size: 16px;
        cursor: pointer;
    }
    .list-wrap li .registerTime{
        margin: 0 22px;
    }
    .list-wrap li.executive{
        min-height: 128px;
        padding: 20px 20px 17px 38px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: stretch;
    }
    .list-wrap li .enterprise-logo{
        margin-right: 40px;
        flex: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .list-wrap .enterprise-logo img{
        width: 68px;
        height: 68px;
        /*border: 1px solid #01d6ea;*/
        border-radius: 100%;
        overflow: hidden;
        object-fit: cover;
    }
    .list-wrap li .executive-info{
        flex: auto;
        display: flex;
        justify-content: space-between;
        align-items: stretch;
    }
    .list-wrap .executive-info .left-con{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
    }
    .list-wrap .left-con .executive-name{
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        width: 108px;
        height: 24px;
        color: #fff;
        font-size: 16px;
        border: 1px solid #00eeff;
        background: linear-gradient(to bottom, #019ccf,#0174cf);
    }
    .list-wrap .left-con .enterprise-list{
        color: #fff;
        font-size: 16px;
    }
    .list-wrap .executive-info .right-con{
        color: #ff9c00;
        font-size: 14px;
        cursor: pointer;
    }
    .list-wrap li:hover{
        background: rgba(3,70,123,.8);
    }
    .pageWrap{
        margin-top: 10px;
    }
</style>
