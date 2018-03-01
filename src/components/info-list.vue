<template>
    <div id="nav" class="nav" ref="nav">
        <h3 class="textShadow">{{title}}</h3>
        <div class="nav-list" ref='wrap'>
            <span class="move-ico aleft" @click="animT(1)"></span>
            <ul ref="ul">
                <li class="list-title" v-for="(item,index) in list" key='index' @click='liClick(cMenu,item,index)' ref="index">
                    {{item}}
                </li>
            </ul>
            <span class="move-ico aright" @click="animT(-1)"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'infoList',
        props: ['cMenu','list','currentTitle'],
        data(){
            return {
                title: '',
                currentIndex: 0,
                activeIndex: 0,
                marginLeft: 0,
                timer: '',
                flag: true
            }
        },
        mounted(){
            this.$refs.ul.style.marginLeft = this.$refs.nav.clientWidth/2 - (this.$refs.index[0].clientWidth + 40)/2 +'px'

            this.setClass(this.currentTitle.itemIndex)

            this.liClick(this.cMenu,this.currentTitle.itemTitle,this.currentTitle.itemIndex)

            let that = this
            window.addEventListener("resize", function(){
                that.marginLeft = that.$refs.ul.style.marginLeft = that.calculateLeftWidth(that.currentIndex)
            });
        },
        methods: {
            animT(i){
                this.flag = !this.flag
                if(i=== 1 && this.currentIndex === (this.list.length -1)) return
                if(i=== -1 && this.currentIndex === 0) return
                this.currentIndex += i
                this.currentIndex = this.currentIndex < 0 ? 0 : (this.currentIndex > this.list.length ? (this.list.length - 1) : this.currentIndex)
                this.setClass2(this.currentIndex)
                this.marginLeft = this.$refs.ul.style.marginLeft = this.calculateLeftWidth(this.currentIndex)
            },
            setClass(i){
                for (let k = 0; k < this.list.length; k++) {
                    this.$refs.index[k].className = ''
                }
                this.$refs.index[i].className = 'active'
                if (i + 1 <= this.list.length-1) {
                    this.$refs.index[i + 1].className = 'size1'
                }
                if (i - 1 >= 0) {
                    this.$refs.index[i - 1].className = 'size1'
                }
                if (i - 2 >= 0) {
                    this.$refs.index[i - 2].className = 'size2'
                }
                if (i + 2 <= this.list.length-1) {
                    this.$refs.index[i + 2].className = 'size2'
                }
                if (i - 3 >= 0) {
                    this.$refs.index[i - 3].className = 'size3'
                }
                if (i + 3 <= this.list.length-1) {
                    this.$refs.index[i + 3].className = 'size3'
                }
                if (i - 4 >= 0) {
                    this.$refs.index[i - 4].className = 'size4'
                }
                if (i + 4 <= this.list.length-1) {
                    this.$refs.index[i + 4].className = 'size4'
                }
                if (i - 5 >= 0) {
                    this.$refs.index[i - 5].className = 'size5'
                }
                if (i + 5 <= this.list.length-1) {
                    this.$refs.index[i + 5].className = 'size5'
                }
            },
            setClass2(i){
                for (let k = 0; k < this.list.length; k++) {
                    this.$refs.index[k].className = this.$refs.index[k].classList.contains('active')? 'active' : ''
                }
                this.$refs.index[i].className = this.$refs.index[i].classList.contains('active')? 'active' : 'active2'
                if (i + 1 <= this.list.length-1) {
                    this.$refs.index[i + 1].classList.add( 'size1')
                }
                if (i - 1 >= 0) {
                    this.$refs.index[i - 1].classList.add( 'size1')
                }
                if (i - 2 >= 0) {
                    this.$refs.index[i - 2].classList.add( 'size2')
                }
                if (i + 2 <= this.list.length-1) {
                    this.$refs.index[i + 2].classList.add( 'size2')
                }
                if (i - 3 >= 0) {
                    this.$refs.index[i - 3].classList.add( 'size3')
                }
                if (i + 3 <= this.list.length-1) {
                    this.$refs.index[i + 3].classList.add( 'size3')
                }
                if (i - 4 >= 0) {
                    this.$refs.index[i - 4].classList.add( 'size4')
                }
                if (i + 4 <= this.list.length-1) {
                    this.$refs.index[i + 4].classList.add( 'size4')
                }
                if (i - 5 >= 0) {
                    this.$refs.index[i - 5].classList.add( 'size5')
                }
                if (i + 5 <= this.list.length-1) {
                    this.$refs.index[i + 5].classList.add( 'size5')
                }
            },
            liClick(menu,item, i){
                this.title = item
                this.activeIndex = this.currentIndex = i
                this.setClass(i)
                this.marginLeft = this.$refs.ul.style.marginLeft = this.calculateLeftWidth(i)
                this.$emit('getList',[item])
            },
            calculateLeftWidth(index){
                let leftWidth = 0
                for (let n = 0 ; n <= index ; n++)
                {
                    if(n < index){
                        leftWidth += this.$refs.index[n].clientWidth + 40
                    } else {
                        leftWidth += (this.$refs.index[n].clientWidth + 40) /2
                    }
                }
                leftWidth = this.$refs.nav.clientWidth/2 - leftWidth + 'px'
                return leftWidth
            }
        },
        watch:{
            flag(val,oldVal){
                clearTimeout(this.timer)
                if(this.calculateLeftWidth(this.currentIndex) !== this.calculateLeftWidth(this.activeIndex)){
                    this.timer = setTimeout(()=>{
                        this.$refs.ul.style.marginLeft = this.calculateLeftWidth(this.activeIndex)
                        this.setClass(this.activeIndex)
                        this.currentIndex = this.activeIndex
                    },10000)
                }
            }
        },
        beforeDestroy(){
            clearTimeout(this.timer)
        }
    }
</script>

<style scoped>
    h3 {
        text-align: center;
        font-size: 26px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-weight: bold;
        text-shadow: 0 0 30px #0066ff, 0 0 20px #0066ff,0 0 10px #0066ff
    }
    .nav{
        box-sizing: border-box;
        position: relative;
        width: 100%;
        height: 124px;
        padding: 15px 0;
        flex: none;
        background: url("../../static/img/info-list-bg.png") no-repeat;
        background-size: contain;
        background-position: center bottom;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
    }
    .move-ico{
        position: absolute;
        bottom: 0;
        top:0;
        display: inline-block;
        cursor: pointer;
        width: 50px;
        z-index: 2;
        background-color: transparent;
    }
    .move-ico:hover{
        color: #1095ed;
    }
    .nav-list .aleft {
        left: 0;
        background: url("../../static/img/leftArrow.png") left no-repeat;
    }
    .nav-list .aleft:hover{
        background:url("../../static/img/leftArrow2.png") left no-repeat;
    }
    .nav-list .aright {
        right: 0;
        background:url("../../static/img/rightArrow.png") right no-repeat;
    }
    .nav-list .aright:hover{
        background:url("../../static/img/rightArrow2.png") right no-repeat;
    }
    .nav-list {
        position: relative;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        width: 100%;
        overflow: hidden;
    }
    .nav-list::before{
        box-sizing: border-box;
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 50px;
        height: 100%;
        background: linear-gradient(to right,rgba(18,25,48,1),rgba(18,25,48,0));
        z-index: 1;
    }
    .nav-list::after{
        box-sizing: border-box;
        position: absolute;
        content: '';
        top: 0;
        right: 0;
        width: 50px;
        height: 100%;
        background: linear-gradient(to left,rgba(18,25,48,1),rgba(18,25,48,0));
        z-index: 1;
    }
    .nav-list ul {
        transition: all 1s;
        display: block;
        overflow: hidden;
        height: 40px;
        width: 10000px;
    }
    .nav-list li {
        transition: all 1s;
        display: inline-block;
        color: #b7bcc5;
        font-weight: 600;
        height: 100%;
        width: auto;
        margin: 0 20px;
        float: left;
        text-align: center;
        box-sizing: border-box;
        font-size: 16px;
        cursor: pointer;
    }
    .nav-list li.size1 {
        color: #b7bcc5;
        transform: scale(1) translate3D(0, 0, 0);
    }
    .nav-list li.size2 {
        color: #787e8e;
        transform: scale(.9) translate3D(0, 0, 0);
    }
    .nav-list li.size3 {
        color: #3e465b;
        transform: scale(.8) translate3D(0, 0, 0);
    }
    .nav-list li.size4 {
         color: #3f4555;
         transform: scale(.7) translate3D(0, 0, 0);
     }
    .nav-list li.size5 {
        color: #3f4555;
        transform: scale(.6) translate3D(0, 0, 0);
    }
    .nav-list li.active {
        color: #3c4e71 !important;
        transform: scale(.98) translate3D(0, 0, 0) !important;
    }
    .nav-list li.active2 {
        transform: scale(.9) translate3D(0, 0, 0);
    }
    .nav-list li:hover{
        transform: scale(1.1) translate3D(0, 0, 0);
    }
</style>
