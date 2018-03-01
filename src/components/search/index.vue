<template>
    <div class="search-wrap">
        <div class="open-wrap">
            <span class="close" @click="closeBox"></span>
            <div class="condition-wrap">
                <p class="label-line">筛选</p>
                <div class="condition">
                    <ul>
                        <li  v-for="(item,index) in conditionList">
                            <span class="condition-label">{{item}}：</span>
                            <el-select v-model="selectValue[index]" placeholder="请选择" popper-class="search" @change="filterList">
                                <el-option
                                        v-for="item1 in options"
                                        :key="item1.value"
                                        :label="item1.label"
                                        :value="item1.value">
                                </el-option>
                            </el-select>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="result-wrap" v-loading = "loading" element-loading-text="数据加载中...">
                <div class="result-count">
                    <p class="multiple-wrap">
                        <span class="multiple-label">检索条件</span>
                        <span class="multiple-condition" :title="String(searchKey)">综合条件：<span class="condition-value" v-for="item in searchKey">{{item}}</span></span>
                    </p>
                    <p class="totalRecord">共找到<span class="resultCount">&nbsp;{{totalRecord}}&nbsp;</span>条相关记录</p>
                </div>
                <div class="list-wrap">
                    <ul>
                        <li v-if="resultList.length > 0" v-for="(item,index) in resultList" @click="getEntInfo(index)">
                            <a class="entName" ref="entName">{{item.entName}}</a>
                            <p class="entInfo">
                                <span class="legalPerson">法定代表人：{{item.legalRepresentative | isValue }}</span>
                                <span class="registerTime">成立：{{item.registerTime | isValue }}</span>
                                <span class="regAsset">注册资本：{{item.regAsset | isValue }}</span>
                            </p>
                        </li>
                        <li v-if="!loading && resultList.length === 0" class="noDataLi">暂无数据</li>
                    </ul>
                </div>
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
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'search',
        props:['conditionValue','searchKey','searchFlag','seniorCondition'],
        data(){
            return {
                conditionList:['年报','专利','法律诉讼','分公司','著作权','失信记录','企业网址','商标','行政处罚'],
                selectValue:[2,2,2,2,2,2,2,2,2],
                options:[
                    {
                        value: 2,
                        label: '不限'
                    },{
                        value: 1,
                        label: '有'
                    },{
                        value: 0,
                        label: '无'
                    }
                ],
                totalRecord: '',
                pageSize: 50,
                currentPage: 1,
                resultList:[],
                loading: true
            }
        },
        mounted(){
            if(this.seniorCondition && this.seniorCondition!=''){
                this.seniorSearch(this.seniorCondition)
            } else {
                if(this.conditionValue !== ''){
                    this.getList()
                }
            }
        },
        methods:{
            closeBox(){
                this.$emit('closeBox')
            },
            getList(pageNum){
                this.loading = true
                api.Get('/cloudMap/entSearch/getEntList',{
                    entName: this.conditionValue,
                    annualReport: this.selectValue[0],
                    patent: this.selectValue[1],
                    legalProceedings: this.selectValue[2],
                    branch: this.selectValue[3],
                    copyright: this.selectValue[4],
                    breakRecords: this.selectValue[5],
                    entUrl: this.selectValue[6],
                    trademark: this.selectValue[7],
                    administrativeSanction: this.selectValue[8],
                    page: pageNum ? pageNum : 1,
                    pageSize: this.pageSize
                }).then((res)=>{
                    this.loading = false
                    this.totalRecord = res.totalRecord > 0 ? res.totalRecord : 0
                    this.resultList = res.data;
                })
            },
            seniorSearch(condition,pageNum){
                this.loading = true
                api.Get('/cloudMap/seniorSearch/getEntList',Object.assign(condition,{
                    annualReport: this.selectValue[0],
                    patent: this.selectValue[1],
                    legalProceedings: this.selectValue[2],
                    branch: this.selectValue[3],
                    copyright: this.selectValue[4],
                    breakRecords: this.selectValue[5],
                    entUrl: this.selectValue[6],
                    trademark: this.selectValue[7],
                    administrativeSanction: this.selectValue[8],
                    page: pageNum ? pageNum : 1,
                    pageSize: this.pageSize
                })).then((res)=>{
                    this.loading = false
                    this.totalRecord = res.totalRecord > 0 ? res.totalRecord : 0
                    this.resultList = res.data;
                })
            },
            filterList(){
                if(this.seniorCondition && this.seniorCondition!=''){
                    this.seniorSearch(this.seniorCondition)
                } else {
                    if(this.conditionValue !== ''){
                        this.getList()
                    }
                }
            },
            getEntInfo(index){
                let name = this.$refs.entName[index].innerText
                let entid = 'ent'+ index
                if(top.window.addTab){
                    let base = 'http://'+location.host
//                    top.window.addTab(base + '/entCloudMap/#/entBase/'+ name, '企业星云图-'+name, entid)
                    top.window.addTab(base + '/cloudMap/index.html#/entBase/'+ name, '企业星云图-'+name, entid)
                } else {
                    let base = location.href.substring(0,location.href.indexOf('#')+1)
                    window.open(base+'entBase/'+ name)
//                    this.$emit('getEntInfo',name)
                }
            },
            //分页
            handleCurrentChange(val) {
                if(this.seniorCondition && this.seniorCondition!=''){
                    this.seniorSearch(this.seniorCondition,val)
                } else{
                    if(this.conditionValue !== '') {
                        this.getList(val)
                    }
                }
            }
        },
        filters:{
            isValue(val){
                return val = (val=="") ? "-" : val
            }
        },
        watch:{
            conditionValue(val,oldVal){
                this.getList({
                    entName: val,
                    page: 1,
                    pageSize: this.pageSize
                })
            },
            searchFlag(val,oldVal){
                this.getList({
                    entName: this.conditionValue,
                    page: 1,
                    pageSize: this.pageSize
                })
            }
        }
    }
</script>

<style scoped>
.search-wrap{
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: linear-gradient(to bottom,rgba(8,14,37,.95),rgba(0,45,111,.95));
}
.open-wrap{
    position: absolute;
    box-sizing: border-box;
    top: 0;
    right:0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 1262px;
    height: 740px;
    /*padding: 90px 65px 56px 55px;*/
    padding: 90px 65px 40px 55px;
    background: url("../../../static/img/search-wrap-bg.png") center no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
}
.open-wrap .close{
    position: absolute;
    /*top: 15px;*/
    /*right: 17px;*/
    /*width: 20px;*/
    /*height: 20px;*/
    top: 8px;
    right: 8px;
    width: 44px;
    height: 44px;
    /*line-height: 15px;*/
    /*color: #ebd91e;*/
    /*font-size: 40px;*/
    cursor: pointer;
    display: flex;
    justify-content: center;
    /*transition: all .5s;*/
    /*background: #34b3b5;*/
    /*box-shadow: 0 0 20px 8px #34b3b5;*/
    background: url("../../../static/img/close-icon.png") center no-repeat;
    transition: all .3s;
}
.open-wrap .close:hover{
    background: url("../../../static/img/close-icon-hover.png") center no-repeat;
}
.condition-wrap{
    height: 148px;
    flex: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
}
.condition-wrap .label-line{
    box-sizing: border-box;
    border-left: 3px solid #ffcc00;
    padding-left: 10px;
    color: #ffcc00;
    height: 14px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.condition-wrap .condition{
    margin-top: 10px;
    flex: auto;
    box-sizing: border-box;
    border: 1px solid #00beff;
    display: flex;
    justify-content: center;
    align-items: stretch;
}
.condition-wrap .condition ul{
    flex: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    align-content: space-around;
}
.condition-wrap .condition li{
    flex: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 38px;
}
.condition-wrap .condition li .condition-label{
    width: 75px;
    color: #fff;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.result-wrap{
    margin-top: 16px;
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
}
.result-wrap  .result-label{
    color: #fff;
    font-size: 16px;
    flex: none;
    margin-bottom: 15px;
}
.result-wrap  .list-wrap{
    flex: auto;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    overflow: auto;
    overflow-x: hidden;
    padding-right: 5px;
}
.result-wrap  .list-wrap:hover::-webkit-scrollbar-thumb{
    background:rgba(7,100,180,1)
}
.result-wrap  .result-count .multiple-wrap{
    padding: 0 12px;
    height: 35px;
    flex: none;
    background: rgba(3,76,126,.5);
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.result-wrap  .result-count .multiple-label{
    flex: none;
    width: 86px;
    height: 24px;
    border: 1px solid #00cbff;
    color: #fff;
    font-size: 14px;
    background: linear-gradient(#029ed2,#0178d2);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
}
.result-wrap  .result-count .multiple-condition{
    flex: auto;
    cursor: default;
    color: #e2e2e2;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.result-wrap  .result-count .condition-value{
    color: #fff600;
    margin-left: 10px;
}
.result-wrap  .result-count .totalRecord{
    color: #fff;
    font-size: 12px;
    text-align: right;
    margin: 8px 0;
}
.result-wrap  .result-count .resultCount{
    color: #d5d123;
}
.result-wrap  .list-wrap ul{
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
}
.result-wrap  .list-wrap li{
    cursor: pointer;
    padding-left: 12px;
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
.result-wrap  .list-wrap li.noDataLi{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
}
.result-wrap  .list-wrap li span{
    color: #fff;
    font-size: 12px;
}
.result-wrap  .list-wrap li .entName{
    color: #fff600;
    font-size: 16px;
    cursor: pointer;
}
.result-wrap  .list-wrap li .registerTime{
    margin: 0 22px;
}
.result-wrap  .list-wrap li:hover{
    background: rgba(3,70,123,.8);
}
.pageWrap{
    padding-top: 10px;
}
</style>
