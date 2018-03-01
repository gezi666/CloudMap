<template>
    <div>
    <header>
        <h1 class="title-wrap" :title="entName">{{entName.length >= 44 ? (entName.substring(0,40) + '...') : entName}}</h1>
    </header>
    <div class="search-wrap">
        <div class="inner-wrap">
            <div class="search-con">
                <input type="text" class="search-input" v-model.trim="searchName" placeholder="请输入公司名称" @keyup.13="search" onfocus="this.placeholder=''"  onblur="this.placeholder='请输入公司名称'">
                <div class="btn search-btn">
                    <i class="icon"></i>
                    <span class="text" @click="search">搜索</span>
                </div>
                <div class="btn senior-btn">
                    <span class="text" @click="highSearch">高级</span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'search',
        props: ['title'],
        data(){
            return {
                entName: '',
                searchName:''
            }
        },
        mounted(){
            this.entName = this.title
            if(this.entName === ''){
                this.entName = this.$route.params.entName
            }
            this.changeFontSize(this.entName)
            let that = this
            window.onresize = function () {
                that.changeFontSize(that.entName)
            }
        },
        methods: {
            search(){
                this.$emit('search',this.searchName)
            },
            highSearch(){
                this.$emit('highSearch')
            },
            changeFontSize(txt){
                let screenTimes = document.body.offsetWidth / 1920
                let fontTimes = 10/txt.length
                let fontSize = (46 * screenTimes * fontTimes > 46) ? 46 : (46 * screenTimes * fontTimes < 14 ? 14 : 46 * screenTimes * fontTimes)
                document.querySelector('.title-wrap').style.fontSize = fontSize + "px"
            }
        },
        watch:{
            title(val,oldVal){
                this.entName = val
                this.changeFontSize(val)
            }
        }
    }
</script>

<style scoped>
    header{
        position: absolute;
        width: 100%;
        min-width: 1280px;
        height: 138px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        background: url("../../static/img/header-bg.png") center no-repeat;
        background-size: 100% 100%;
        background-position: 0 0;
        z-index: 2;
    }
    .title-wrap{
        max-width: 25%;
        height: 46px;
        font-size: 46px;
        font-weight: bold;
        text-align: center;
        background-image: radial-gradient(circle, #ffcb00 40%, #ecc815 60%, #c0d243 80%,#64e1d5 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-wrap{
        position: absolute;
        left: 0;
        right: 0;
        z-index: 1000;
        width: 100%;
        min-width: 1280px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-wrap .inner-wrap{
        width: 47%;
        height: 70px;
        background: url("../../static/img/search-bg.png") center no-repeat;
        background-size: 100% 73px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    .search-wrap .search-con{
        margin: 10px 0 0 10px;
        width: 60%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-wrap .search-input{
        box-sizing: border-box;
        width: 60%;
        height: 35px;
        line-height: 35px;
        color: #fff;
        font-size: 16px;
        text-align: left;
        border: none;
        border-bottom: 1px solid #00bbff;
        background: transparent;
        outline: none;
    }
    .search-wrap .btn{
        box-sizing: border-box;
        height: 35px;
        color: #fff;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transform: skew(-40deg);
        text-decoration: none;
    }
    .search-wrap .btn .text{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        transform: skew(40deg);
    }
    .search-wrap .search-btn{
        position: relative;
        width: 100px;
        padding-left: 30px;
        margin: 0 6px 0 10px;
        background: linear-gradient(to top, #0597c8 , #056ec7);
    }
    .search-wrap .search-btn:hover{
        background: linear-gradient(to top, #08b9f7 , #087ee3);
    }
    .search-wrap .senior-btn{
        width: 65px;
        background: linear-gradient(to top, #cbb231 , #cf6350);
        border: 1px solid #f9d124;
    }
    .search-wrap .senior-btn:hover{
        background: linear-gradient(to top, #f9db3e , #f87963);
    }
    .search-wrap .icon{
        position: absolute;
        display:inline-block;
        top: 8px;
        left: 20px;
        width: 19px;
        height: 19px;
        transform: skew(40deg);
        background: url("../../static/img/search-icon.png") center no-repeat;
    }
    ::-webkit-input-placeholder {
        color: #fff;
    }
</style>
