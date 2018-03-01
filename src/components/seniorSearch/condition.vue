<template>
    <div class="high-search-wrap">
        <div class="open-wrap">
            <span class="close" @click="closeBox"></span>
            <div class="condition-wrap">
                <div class="label-line">
                    <span class="label">高级搜索</span>
                    <span class="common-conditions saved-conditions" @click="savedFlag = !savedFlag">常用条件</span>
                    <el-select v-model.lazy.trim="revenueValue" placeholder="" popper-class="multiselect saved" @change ="chageCondition(revenueValue)">
                        <el-tooltip popper-class="condition-tip" :key="index" placement="left" effect="light" :visible-arrow = 'false' transition="hide" :open-delay="200" v-for="(item,index) in savedList.length">
                            <div slot="content">
                                <p class="tip-content" v-for="item1 in savedList[index].conditionList" :title="item1.key+'：'+item1.value">{{item1.key}}：{{item1.value}}</p>
                            </div>
                            <el-option
                                    :key="item"
                                    :label="'常用条件'+item"
                                    :value="item">
                                <p class="tip-msg">
                                    <span class="tip-label">常用条件{{item}}</span>
                                    <span class="del-seif" @click.stop="delCondition(savedList[index].id)">&times;</span>
                                </p>
                            </el-option>
                        </el-tooltip>
                    </el-select>
                </div>
                <div class="condition">
                    <ul>
                        <li>
                            <p class="title">基本信息</p>
                            <div class="condition-con">
                                <div class="condition-item">
                                    <span class="condition-label input-label">企业名称/曾用名：</span>
                                    <input class="find-input" type="text" v-model.lazy.trim="conditionList[0].value">
                                </div>
                                <div class="condition-item">
                                    <span class="condition-label input-label">法人/股东/高管：</span>
                                    <input class="find-input" type="text" v-model.lazy.trim="conditionList[1].value">
                                </div>
                                <div class="condition-item">
                                    <span class="condition-label input-label">统一社会信用码：</span>
                                    <input class="find-input" type="text" v-model.lazy.trim="conditionList[2].value">
                                </div>
                                <div class="condition-item time-select">
                                    <span class="condition-label time-label">注册时间：</span>
                                    <div class="time-select-con">
                                        <el-date-picker
                                                class="time star-time"
                                                v-model.lazy.trim="conditionList[3].value"
                                                type="month"
                                                :editable="false"
                                                popper-class="date-picker"
                                                placeholder="请选择">
                                        </el-date-picker>
                                        <span class="slide-line"></span>
                                        <el-date-picker
                                                class="time end-time"
                                                v-model.lazy.trim="conditionList[4].value"
                                                type="month"
                                                :editable="false"
                                                popper-class="date-picker"
                                                placeholder="请选择">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <p class="title">产品行业</p>
                            <div class="condition-con">
                                <div class="condition-item">
                                    <span class="condition-label input-label">行业分类：</span>
                                    <input class="find-input select" type="text" placeholder="请选择" v-model.lazy.trim="conditionList[5].value" @click="selectItem('行业')">
                                </div>
                                <div class="condition-item">
                                    <span class="condition-label input-label">产品及服务：</span>
                                    <input class="find-input" type="text" v-model.lazy.trim="conditionList[6].value">
                                </div>
                            </div>
                        </li>
                        <li>
                            <p class="title">地理位置</p>
                            <div class="condition-con">
                                <div class="condition-item">
                                    <span class="condition-label input-label">所属区域/园区：</span>
                                    <input class="find-input select" type="text" placeholder="请选择" v-model.lazy.trim="conditionList[7].value" @click="selectItem('区域')">
                                </div>
                                <div class="condition-item">
                                    <span class="condition-label input-label">所属街道：</span>
                                    <input class="find-input" type="text" v-model.lazy.trim="conditionList[8].value">
                                </div>
                                <div class="condition-item">
                                    <span class="condition-label input-label">所属写字楼：</span>
                                    <input class="find-input" type="text" v-model.lazy.trim="conditionList[9].value">
                                </div>
                            </div>
                        </li>
                        <li>
                            <p class="title">营收规模</p>
                            <div class="condition-con multi-con">
                                <div class="condition-item bus-income">
                                    <span class="condition-label select-label">营业收入：</span>
                                    <el-select class="select-value" v-model.lazy.trim="conditionList[10].value" placeholder="不限" :multiple="true" popper-class="multiselect">
                                        <el-option
                                                v-for="item in revenueOptions"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                        <p class="custom-wrap">
                                            <input class="custom-input businessIncome" type="text">
                                            <span class="custom-span">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                            <input class="custom-input businessIncome" type="text">
                                            <span class="custom-span">&nbsp;万</span>
                                        </p>
                                        <button class="confirmSecelt" @click="getCustomValue('营业收入')">确&nbsp;&nbsp;定</button>
                                    </el-select>
                                </div>
                                <div class="condition-item asset-size">
                                    <span class="condition-label select-label">资产规模：</span>
                                    <el-select class="select-value" v-model.lazy.trim="conditionList[11].value" placeholder="不限" :multiple="true" popper-class="multiselect">
                                        <el-option
                                                v-for="item in assetsOptions"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                        <p class="custom-wrap">
                                            <input class="custom-input assetSize" type="text">
                                            <span class="custom-span">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                            <input class="custom-input assetSize" type="text">
                                            <span class="custom-span">&nbsp;万</span>
                                        </p>
                                        <button class="confirmSecelt" @click="getCustomValue('资产规模')">确&nbsp;&nbsp;定</button>
                                    </el-select>
                                </div>
                                <div class="condition-item reg-capital">
                                    <span class="condition-label select-label">注册资本：</span>
                                    <el-select class="select-value" v-model.lazy.trim="conditionList[12].value" placeholder="不限" :multiple="true" popper-class="multiselect">
                                        <el-option
                                                v-for="item in registerOptions"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                        <p class="custom-wrap">
                                            <input class="custom-input registeredCapital" type="text">
                                            <span class="custom-span">&nbsp;&nbsp;-&nbsp;&nbsp;</span>
                                            <input class="custom-input registeredCapital" type="text">
                                            <span class="custom-span">&nbsp;万</span>
                                        </p>
                                        <button class="confirmSecelt" @click="getCustomValue('注册资本')">确&nbsp;&nbsp;定</button>
                                    </el-select>
                                </div>
                                <div class="condition-item">
                                    <span class="condition-label select-label">人员规模：</span>
                                    <el-select class="select-value" v-model.lazy.trim="conditionList[13].value" placeholder="不限" :multiple="true" popper-class="multiselect">
                                        <el-option
                                                v-for="item in personnelOptions"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                        <p class="custom-wrap">
                                            <input class="custom-input person" type="text">
                                            <span class="custom-span">-</span>
                                            <input class="custom-input person" type="text">
                                        </p>
                                        <button class="confirmSecelt" @click="getCustomValue('人员规模')">确&nbsp;&nbsp;定</button>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="control-wrap">
                        <span class="common-conditions" @click="saveCondition">保存检索条件</span>
                        <span class="common-conditions clear" @click="clearAllValue">清空</span>
                        <button class="btn retrieval" @click="toRetrieval">检 索</button>
                    </div>
                </div>
            </div>
            <div class="find-wrap">
                <p class="label-line">发现关系</p>
                <div class="find-con">
                    <div class="input-wrap">
                        <el-select
                                v-model.trim="relation1Value[0]"
                                :title="relation1Value[0]"
                                filterable
                                remote
                                placeholder="请输入关键词"
                                :remote-method="remoteMethod"
                                :loading="loading"
                                popper-class="find-relation">
                            <el-option
                                    v-for="item in relationOptions"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <el-select class="center-input"
                                v-model.trim="relation1Value[1]"
                                :title="relation1Value[1]"
                                filterable
                                remote
                                placeholder="请输入关键词"
                                :remote-method="remoteMethod"
                                :loading="loading"
                                popper-class="find-relation">
                            <el-option
                                    v-for="item in relationOptions"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <el-select
                                v-model.trim="relation1Value[2]"
                                :title="relation1Value[2]"
                                filterable
                                remote
                                placeholder="请输入关键词"
                                :remote-method="remoteMethod"
                                :loading="loading"
                                popper-class="find-relation">
                            <el-option
                                    v-for="item in relationOptions"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <button class="btn find" @click="toRelation">发 现</button>
                </div>
            </div>
        </div>

        <!--选择弹框-->
        <el-dialog  :visible.sync="selectDialogVisible" custom-class="select-dialog" :modal-append-to-body="false">
            <p class="title-wrap" slot="title">{{dialogTitle}}</p>
            <div class="select-wrap">
                <ul class="select-type">
                    <li v-for="(item,index) in selectedTypeList" @click="delNext(item,index)" :title="item">
                        <span class="type-name">{{item}}</span>
                        <i class="select-icon"></i>
                    </li>
                </ul>
                <ul class="select-item" v-if="typeFlag">
                    <li :class="{'active': currentItem === index}" v-for="(item,index) in industryList" @click="selectType(item,index)"><span class="stay-con"><span class="stay-item" :title="item.industryName">{{item.industryName}}</span></span></li>
                </ul>
                <div class="select-region" v-if="!typeFlag">
                    <ul class="select-province  stay-item" v-if="provinceFlag">
                        <li v-for="item in regionList" @click="selectProvince(item)"><span class="stay-con"><span class="stay-item">{{item.regionName}}</span></span></li>
                    </ul>
                    <ul class="city-wrap  stay-item" v-if="!provinceFlag">
                        <li :class="{'active': currentCity === index}" v-for="(item,index) in regionList" @click="filterPark(item,index)"><span class="stay-con"><span class="stay-item" :title="item.regionName">{{item.regionName}}</span></span></li>
                    </ul>
                    <ul class="park-wrap  stay-item" v-if="!provinceFlag && parkList.length > 0">
                        <li :class="{'active': currentPark === index}" v-for="(item,index) in parkList" @click="selectPark(item,index)"><span class="stay-con"><span class="stay-item" :title="item">{{item}}</span></span></li>
                    </ul>
                </div>
            </div>
            <div class="btn-line">
                <button class="btn cansole" @click="selectDialogVisible = false">取&nbsp;&nbsp;消</button>
                <button class="btn confirm" @click="saveItem">确&nbsp;&nbsp;定</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'search',
        data(){
            return {
                savedCount: 0,
                savedFlag: false,
                conditionList:[
                    {
                        key: '企业名称/曾用名',
                        name: 'entName',
                        value: ''
                    },
                    {
                        key: '法人/股东/高管',
                        name: 'legalPerson',
                        value: ''
                    },
                    {
                        key: '统一社会信用码',
                        name: 'unifiedSocialCreditCode',
                        value: ''
                    },
                    {
                        key: '注册时间(起)',
                        name: 'regDateStar',
                        value: '',
                    },
                    {
                        key: '注册时间(止)',
                        name: 'regDateEnd',
                        value: '',
                    },
                    {
                        key: '行业分类',
                        name: 'industryClassification',
                        value: ''
                    },
                    {
                        key: '产品及服务',
                        name: 'productsAndServices',
                        value: ''
                    },
                    {
                        key: '所属区域/园区',
                        name: 'park',
                        value: ''
                    },
                    {
                        key: '所属街道',
                        name: 'ownedstreet',
                        value: ''
                    },
                    {
                        key: '所属写字楼',
                        name: 'officeBuilding',
                        value: ''
                    },
                    {
                        key: '营业收入',
                        name: 'income',
                        value: []
                    },
                    {
                        key: '资产规模',
                        name: 'assetSize',
                        value: []
                    },
                    {
                        key: '注册资本',
                        name: 'regAsset',
                        value: []
                    },
                    {
                        key: '人员规模',
                        name: 'personnelScale',
                        value: []
                    }
                ],
                savedList:[],
                revenueValue:'',
                revenueOptions:['<1000万','1000万-3000万','3000万-5000万','5000万-1亿','1亿-3亿','3亿-5亿','5亿-10亿','10亿-50亿','>50亿'],
                assetsOptions:['<1000万','1000万-3000万','3000万-5000万','5000万-1亿','1亿-3亿','3亿-5亿','5亿-10亿','10亿-50亿','>50亿'],
                registerOptions:['<100万','100万-200万','500万-1000万','1000万-5000万','5000万-1亿','>1亿'],
                personnelOptions:['<50','50-100','100-200','200-500','500-1000','>1000'],
                relation1Value:['','',''],
                relationOptions:[],
                loading: false,
                selectDialogVisible: false,
                dialogTitle:'',
                selectedTypeList:[],
                currentType:'',
                currentRegion:'',
                isActive: false,
                currentItem: '',
                currentCity: '',
                currentPark: '',
                selectItemList:[],
                industryList:[],
                industryListArry:[],
                regionList:[],
                regionListArry:[],
                parkList:[],
                parkListArry:[],
                parkFlag: false,
                typeFlag: true,
                provinceFlag: true
            }
        },
        mounted(){
           this.getCondition()
//            let innerInput = document.querySelector('.find-con .el-input__inner')
//            innerInput.onfocus = function () {
//               console.log(2111)
//                innerInput.attributes.placehold = ''
//            }
        },
        methods:{
            closeBox(){
                this.$emit('closeSeniorBox')
            },
            toRetrieval(){
                if((this.conditionList[3].value !== '' && this.conditionList[4].value === '') || (this.conditionList[3].value === '' && this.conditionList[4].value !== '') ){
                    const h = this.$createElement;
                    this.$msgbox({
                        title: '提示',
                        message: h('div', null, [
                            h('p', { style: 'color: #ffcc00; font-size:16px; text-align: center;' }, '请将注册起止时间填写完整 ')
                        ]),
                        customClass:'save-box',
                        lockScroll: false,
                        confirmButtonClass:'tip-confirm',
                        callback: action => {
                            return
                        }
                    });
                } else {
                    let condition = {}
                    let conditionFlag = 0
                    let retrievalList = []
                    this.conditionList.forEach((item)=>{
                        if(Array.isArray(item.value)){
                            if(item.value.length >0){
                                condition[item.name] = String(item.value)
                                retrievalList.push(item.key + "：" + String(item.value))
                                conditionFlag = 1
                            }
                        } else{
                            if(item.value !==''){
                                conditionFlag = 1
                                if(item.name === 'regDateStar'){
                                    condition[item.name] = document.querySelectorAll('.star-time input')[0].value
                                } else if(item.name === 'regDateEnd'){
                                    condition[item.name] = document.querySelectorAll('.end-time input')[0].value
                                } else{
                                    condition[item.name] = item.value
                                    retrievalList.push(item.key + "：" + item.value)
                                }
                            }
                        }
                    })
                    if(this.conditionList[3].value !== '' || this.conditionList[4].value !== ''){
                        retrievalList.push("注册时间：" + document.querySelectorAll('.star-time input')[0].value + "至" + document.querySelectorAll('.end-time input')[0].value)
                    }
                    if(conditionFlag === 1){
                        this.$emit('toRetrieval',[condition,retrievalList])
                    } else {
                        return
                    }
                }
            },
            toRelation(){
                let relation = {}
                let num = 0
                let temp = []
                this.relation1Value.forEach((item)=>{
                    if (item !==''){
                        num ++
                        temp.push(item)
                    }
                })
                if(num === 0 || num === 1){
                    //弹框提示  至少填2个企业
                    const h = this.$createElement;
                    this.$msgbox({
                        title: '提示',
                        message: h('div', null, [
                            h('p', { style: 'color: #ffcc00; font-size:16px; text-align: center;' }, '至少需要选择2个企业 ')
                        ]),
                        customClass:'save-box',
                        lockScroll: false,
                        confirmButtonClass:'tip-confirm',
                        callback: action => {
                            num = 0
                            return
                        }
                    });
                } else if(num === 2){
                    relation = {
                        entName1:temp[0],
                        entName2:temp[1]
                    }
                    this.$emit('toRelation',relation)
                } else if (num === 3){
                    relation = {
                        entName1:temp[0],
                        entName2:temp[1],
                        entName3: temp[2]
                    }
                    this.$emit('toRelation',relation)
                }
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true
                    this.relationOptions = ['数据加载中...']
                    api.Get('/cloudMap/entSearch/getEntList',{
                        entName:query,
                        page: 1,
                        pageSize: 10
                    }).then((res)=>{
                        this.relationOptions = []
                        if(res.code === 1 && res.data.length > 0){
                            res.data.forEach((item)=>{
                                this.relationOptions.push(item.entName)
                            })
                        }
                    })
                    setTimeout(() => {
                        this.loading = false;
                    }, 200);
                } else {
                    this.relationOptions = [];
                }
            },
            getCondition(){
                api.Get('/cloudMap/seniorSearch/getCondition').then((res)=>{
                    this.savedCount = res.totalRecord
                    this.savedList = res.data;
                })
            },
            saveCondition(){
                if(this.savedCount === 10){
                    return
                } else {
                    if((this.conditionList[3].value !== '' && this.conditionList[4].value === '') || (this.conditionList[3].value === '' && this.conditionList[4].value !== '') ){
                        const h = this.$createElement;
                        this.$msgbox({
                            title: '提示',
                            message: h('div', null, [
                                h('p', { style: 'color: #ffcc00; font-size:16px; text-align: center;' }, '请将注册起止时间填写完整 ')
                            ]),
                            customClass:'save-box',
                            lockScroll: false,
                            confirmButtonClass:'tip-confirm',
                            callback: action => {
                                return
                            }
                        });
                    } else {
                        let condition = {}
                        let conditionFlag = 0
                        this.conditionList.forEach((item)=>{
                            if(Array.isArray(item.value)){
                                if(item.value.length >0){
                                    condition[item.name] = String(item.value)
                                    conditionFlag = 1
                                }
                            } else{
                                if(item.value !==''){
                                    conditionFlag = 1
                                    if(item.name === 'regDateStar'){
                                        condition[item.name] = document.querySelectorAll('.star-time input')[0].value
                                    } else if(item.name === 'regDateEnd'){
                                        condition[item.name] = document.querySelectorAll('.end-time input')[0].value
                                    } else{
                                        condition[item.name] = item.value
                                    }
                                }
                            }
                        })
                        if(conditionFlag ===1){
                            api.Post('/cloudMap/seniorSearch/saveCondition',condition).then((res)=>{
                                if(res.code ===1){
                                    const h = this.$createElement;
                                    this.$msgbox({
                                        title: '保存检索条件',
                                        message: h('div', null, [
                                            h('p', { style: 'color: #ffcc00; font-size:16px; text-align: center; margin-bottom:20px' }, '检索条件保存成功！ '),
                                            h('p', { style: 'color: #fff; font-size:14px; text-align: center; font-weight: 100;' }, '您最多可保存最近10条检索条件')
                                        ]),
                                        customClass:'save-box',
                                        lockScroll: false,
                                        confirmButtonClass:'tip-confirm',
                                        callback: action => {
                                            this.getCondition()
                                        }
                                    });
                                }
                            })
                        } else {
                            return
                        }
                    }
                }
            },
            delCondition(index){
                const h = this.$createElement;
                this.$msgbox({
                    title: '提示',
                    message: h('div', null, [
                        h('p', { style: 'color: #ffcc00; font-size:16px; text-align: center;' }, '是否删除该常用条件？ ')
                    ]),
                    showCancelButton: true,
                    lockScroll: false,
                    customClass:'save-box',
                    cancelButtonClass: 'cansole-box',
                    confirmButtonClass:'tip-confirm',
                    callback: action => {
                        if(action === 'confirm'){
                            api.Post('/cloudMap/seniorSearch/delCondition',{
                                id:index
                            }).then((res)=>{
//                                console.log(res)
                                this.getCondition()
                            })
                        }
                    }
                });
            },
            chageCondition(optionIndex){
                if(optionIndex && optionIndex!==''){
                    this.clearAllValue()
                    if(this.savedList[optionIndex-1].conditionList && this.savedList[optionIndex-1].conditionList.length > 0){
                        this.savedList[optionIndex-1].conditionList.forEach((item)=>{
                            if(this.conditionList && this.conditionList.length >0 ){
                                this.conditionList.forEach((item1)=>{
                                    if(item.key === item1.key){
                                        if(item.key === '营业收入' || item.key === '资产规模' || item.key === '注册资本' || item.key === '人员规模' ){
                                            item1.value = item.value.split('、')
                                        }else {
                                            item1.value = item.value
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            },
            clearAllValue(){
                this.revenueValue = ''
                this.conditionList.forEach((item)=>{
                    if(Array.isArray(item.value)){
                        item.value = []
                    } else {
                        item.value = ''
                    }
                })
            },
            selectItem(type){
                this.selectDialogVisible = true
                this.selectedTypeList = []
                this.industryListArry[0] = []
                if(type==='行业'){
                    this.typeFlag = true
                    this.currentItem =  -1
                    this.dialogTitle = '选择行业'
                    this.selectedTypeList[0] = '全部行业'
                    api.Get('/cloudMap/seniorSearch/getIndustryList').then((res)=>{
                        this.industryListArry[0] = this.industryList = res.data;
                    })
                } else if(type==='区域'){
                    this.typeFlag = false
                    this.provinceFlag = true
                    this.parkFlag = false
                    this.dialogTitle = '选择区域/园区'
                    this.selectedTypeList[0] = '全国'
                    api.Get('/cloudMap/seniorSearch/getRegionList').then((res)=>{
                        this.regionListArry[0] = this.regionList = res.data.regionList
                    })
                }
            },
            selectType(item,index){
                if(this.selectedTypeList.length < 5){
                    api.Get('/cloudMap/seniorSearch/getIndustryList',{
                        industryCode: item.industryCode,
                        industryLevel: item.industryLevel + 1
                    }).then((res)=>{
                        this.currentType = item.industryName
                        if(res.data.length > 0){
                            this.industryListArry[res.data[0].industryLevel] = []
                            this.industryListArry[res.data[0].industryLevel] = this.industryList = res.data;
                            this.selectedTypeList.push(item.industryName)
                            this.currentItem =  -1
                        } else {
                            this.currentItem = index
                        }
                    })
                }
            },
            selectProvince(item){
                this.provinceFlag = false
                this.selectedTypeList.push(item.regionName)
                this.currentRegion = item.regionName
                api.Get('/cloudMap/seniorSearch/getRegionList',{
                    regionCode: item.regionCode
                }).then((res)=>{
                    this.currentPark = -1
                    this.regionList = res.data.regionList
                    this.parkList = res.data.parkList
                    this.regionListArry[this.selectedTypeList.length - 1] =[]
                    this.regionListArry[this.selectedTypeList.length - 1] = res.data
                })
            },
            filterPark(item,index){
                this.currentRegion = item.regionName
                api.Get('/cloudMap/seniorSearch/getRegionList',{
                    regionCode: item.regionCode
                }).then((res)=>{
                    if(res.data.regionList.length > 0){
                        if(this.selectedTypeList.length < 5) {
                            this.currentCity = -1
                            this.currentPark = -1
                            this.selectedTypeList.push(item.regionName)
                            this.regionList = res.data.regionList
                            this.parkList = res.data.parkList
                            this.regionListArry[this.selectedTypeList.length - 1] =[]
                            this.regionListArry[this.selectedTypeList.length - 1] = res.data
                        }
                    } else {
                        this.currentCity = index
                    }
                })
            },
            selectPark(parkName,index){
                this.currentPark = index
                this.currentRegion = parkName
            },
            saveItem(){
                this.selectDialogVisible = false
                if(this.typeFlag){
                    this.conditionList[5].value = this.currentType
                } else {
                    this.conditionList[7].value = this.currentRegion
                }
            },
            delNext(item,index){
                this.selectedTypeList.splice(index+1,this.selectedTypeList.length)
                this.currentItem = this.currentCity = this.currentPark = -1
                if(!this.typeFlag){
                    this.provinceFlag = true
                    this.currentCity = item
                    if(index > 0){
                        this.currentPark = -1
                        this.regionList = this.regionListArry[index].regionList
                        this.parkList = this.regionListArry[index].parkList
                        this.regionListArry.splice(index + 1,this.selectedTypeList.length - 1)
                    } else if(index === 0){
                        this.regionList = this.regionListArry[0]
                    }
                } else{
                    this.currentType = item
                    this.industryList = this.industryListArry[index]
                }
            },
            getCustomValue(typeName){
                if(typeName ==='人员规模'){
                    let i = document.getElementsByClassName('person')
                    if(i[0].value && (/^[0-9]*$/).test(i[0].value) && i[1].value &&  (/^[0-9]*$/).test(i[1].value)){
                        this.conditionList[13].value.push(i[0].value + '-' +i[1].value)
                    }
                } else if (typeName ==='注册资本') {
                    let i = document.getElementsByClassName('registeredCapital')
                    if(i[0].value && (/^[0-9]*$/).test(i[0].value) && i[1].value &&  (/^[0-9]*$/).test(i[1].value)){
                        this.conditionList[12].value.push(i[0].value + '万-' +i[1].value + '万')
                    }
                } else if (typeName ==='资产规模') {
                    let i = document.getElementsByClassName('assetSize')
                    if(i[0].value && (/^[0-9]*$/).test(i[0].value) && i[1].value &&  (/^[0-9]*$/).test(i[1].value)){
                        this.conditionList[11].value.push(i[0].value + '万-' +i[1].value + '万')
                    }
                } else if (typeName ==='营业收入') {
                    let i = document.getElementsByClassName('businessIncome')
                    if(i[0].value && (/^[0-9]*$/).test(i[0].value) && i[1].value &&  (/^[0-9]*$/).test(i[1].value)){
                        this.conditionList[10].value.push(i[0].value + '万-' +i[1].value + '万')
                    }
                }
                document.querySelector('.el-input__icon.el-icon-caret-top.is-reverse').classList.remove('is-reverse');
                event.path[4].style.display = 'none'
            }
        }
    }
</script>

<style scoped>
    .select{
        cursor: pointer;
    }
    .btn{
        box-sizing: border-box;
        flex: none;
        width: 99px;
        height: 34px;
        color: #fff;
        font-size: 14px;
        border-radius: 3px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        outline: none;
    }
    .cansole,.confirm{
        width: 80px;
        height: 30px;
    }
    .cansole{
        margin-right: 10px;
        border: 1px solid #0193d1;
        border-radius: 5px;
        background: linear-gradient(to bottom, #025aa7,#0262a8);
    }
    .cansole:hover{
        background: linear-gradient(to bottom, #055297,#065691);
    }
    .confirm{
        border: 1px solid #ffc233;
        border-radius: 5px;
        background: linear-gradient(to bottom, #a79e57,#a78d47);
    }
    .confirm:hover{
        background: linear-gradient(to bottom, #a79a3e,#a78732);
    }
    .slide-line{
        width: 20px;
        height: 1px;
        background: #026eb1;
    }
    .high-search-wrap{
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
    .condition-wrap .label-line{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .condition-wrap .label-line .label{
        border-left: 3px solid #ffcc00;
        padding-left: 10px;
        color: #ffcc00;
        height: 14px;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .common-conditions{
        color: #ff9c00;
        font-size: 14px;
        cursor: pointer;
    }
    .common-conditions:hover{
        color:#fdb100
    }
    .saved-conditions{
        position: relative;
        padding-right: 30px;
    }
    .clear{
        margin: 0 13px;
    }
    .condition-wrap .condition{
        box-sizing: border-box;
        flex: none;
        height: 540px;
        margin-top: 10px;
        padding: 0 18px 9px;
        border: 1px solid #00beff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }
    .condition-wrap .condition .control-wrap{
        flex: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .control-wrap .retrieval{
        border: 1px solid #ff9734;
        background: linear-gradient(to bottom , #a77446,#a74c36);
    }
    .control-wrap  .retrieval:hover{
        background: linear-gradient(to bottom , #a4652c,#a7371c);
    }
    .condition-wrap .condition ul{
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: stretch;
    }
    .condition-wrap .condition li{
        flex: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: stretch;
        border-bottom: 1px dashed #035786;
    }
    .condition-wrap .condition li:last-child{
        border: none;
    }
    .condition-wrap .condition li .title{
        color: #ffcc00;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .condition-wrap .condition li .condition-con{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: space-between;
    }
    .condition-wrap .condition li .condition-item{
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .condition-wrap .condition .multi-con .condition-item{
        align-items: flex-start;
    }
    .condition-wrap .condition .multi-con .condition-item .select-label{
        padding-top: 9px;
    }
    .condition-wrap .condition li .time-select-con{
        width: 240px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .condition-wrap .condition li .condition-item:nth-child(2){
        margin: 0 38px;
    }
    .condition-wrap .condition li  .condition-label{
        width: 102px;
        color: #fff;
        font-size: 12px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .find-wrap{
        flex: none;
        margin-top: 15px;
    }
    .find-wrap .label-line{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-left: 3px solid #ffcc00;
        padding-left: 10px;
        color: #ffcc00;
        height: 14px;
        font-size: 14px;
    }
    .find-con{
        box-sizing: border-box;
        padding: 0 17px 0 24px;
        height: 69px;
        margin-top: 10px;
        border: 1px solid #00beff;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .find-con .input-wrap{
        flex: auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .find-input{
        box-sizing: border-box;
        padding-left: 10px;
        width: 240px;
        /*height: 30px;*/
        height: 36px;
        color: #fff;
        font-size: 12px;
        border: 1px solid #0166c0;
        background: rgba(2,75,137,.5);
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .center-input{
        margin: 0 60px;
    }
    .find-con .find{
        border: 1px solid #ffc234;
        background: linear-gradient(to bottom , #a79649,#a78538);
    }
    .find-con .find:hover{
        background: linear-gradient(to bottom , #a79133,#a67d23);
    }
    .select-wrap li{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        /*cursor: default;*/
    }
    .select-wrap li .stay-item{
        padding: 2px 8px;
        border-radius: 17px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .select-wrap li .stay-con{
        cursor: pointer;
        padding: 1px;
        border-radius: 18px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
    }
    .select-wrap li.active .stay-con{
        background: linear-gradient(to bottom, #c7a23e,#d57c21);
    }
    .select-wrap li.active .stay-item{
        background: linear-gradient(to bottom, #979050,#977f3f);
    }
    .select-dialog .title-wrap{
        height: 40px;
        color: #fff;
        font-size: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .select-dialog .select-type{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .select-dialog .select-type li{
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
        height: 40px;
        padding: 0 15px;
        overflow: inherit;
        border: 1px solid #00beff;
        border-bottom: none;
        border-left: none;
        background: #02457f;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .select-dialog .select-type li:last-child::after{
        position: absolute;
        bottom: -1px;
        content: '';
        width: 100%;
        height: 1px;
        border: none;
        background: #02457f;
    }
    .select-dialog .select-type li:first-child{
        border-left: 1px solid #00beff;
    }
    .select-dialog .select-type li .type-name{
        color: #f4da4b;
        font-size: 14px;
        max-width: 95px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .select-dialog .select-type .select-icon{
        margin-left: 7px;
        width: 16px;
        height: 16px;
        background: url("../../../static/img/select-icon.png") center no-repeat;
    }
    .select-dialog .select-item{
        box-sizing: border-box;
        /*height: 280px;*/
        height: 350px;
        border: 1px solid #00beff;
        background: #02457f;
        /*padding: 18px 24px;*/
        padding: 18px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
        overflow: auto;
        overflow-x: hidden;
    }
    .select-dialog .select-item:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .select-dialog .select-item li{
        flex: none;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        width: 32%;
        margin: 0 5px 20px 0;
    }
    .select-dialog .select-item li:last-child{
        margin-bottom: 0;
    }
    .select-dialog .select-region{
        box-sizing: border-box;
        /*height: 280px;*/
        height: 350px;
        border: 1px solid #00beff;
        background: #02457f;
        /*padding: 18px 24px;*/
        padding: 18px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
    }
    .select-dialog .select-region ul{
        overflow: auto;
        overflow-x: hidden;
        flex: auto;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        align-content: flex-start;
    }
    .select-dialog .select-region ul:hover::-webkit-scrollbar-thumb{
        background:rgba(7,100,180,1)
    }
    .select-dialog .select-region li{
        flex: none;
        margin: 0 5px 20px 0;
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .select-dialog .select-region .select-province li{
        width: 15%;
    }
    .select-dialog .select-region .city-wrap{
        flex: auto;
        height: 128px;
    }
    .select-dialog .city-wrap li{
        width: 15%;
    }
    .select-dialog .select-region .park-wrap{
        border-top: 1px dashed #768eaf;
        padding-top: 18px;
    }
    .select-dialog .park-wrap li{
        width: 24%;
    }
    .select-dialog .btn-line{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .del-seif{
        cursor: pointer;
        color: #fff;
        width: 15px;
        height: 15px;
        line-height: 12px !important;
        text-align: center;
        border-radius: 100%;
        font-size: 19px;
    }
    .del-seif:hover{
        background-color: #20a0ff;
    }
    .multi-con .el-input{
        height: 30px;
        box-sizing: border-box;
    }
    .multi-con .el-input .el-input__inner{
        height: 100%;
    }

</style>
