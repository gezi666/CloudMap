<template>
    <div class="ball-wrap">
        <ul v-if="list">
            <li v-for="(item,index) in list" @click="toList(item,index)" @mouseover="mouseoverItem(item,index)" @mouseout="clearTimer">{{item}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'ball',
        props: ['list'],
        data(){
            return {
                timer: 0,
                mouseOverTimer:''
            }
        },
        mounted(){
        },
        methods: {
            toList(listItemName,i){
                this.$emit('toList',[listItemName,i])
            },
            mouseoverItem(listItemName,i){
                let that = this
                that.mouseOverTimer = setInterval(function () {
                    that.timer ++
                    if(that.timer === 3){
                        that.timer = 0
                        clearInterval(that.mouseOverTimer)
                        that.toList(listItemName,i)
                    }
                },1000)
            },
            clearTimer(){
                this.timer = 0
                clearInterval(this.mouseOverTimer)
            }
        }
    }
</script>

<style scoped>
    .ball-wrap{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: url("../../static/img/ball.png") center no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ball-wrap ul{
        width: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap
    }
    .ball-wrap li{
      box-sizing: border-box;
      flex: none;
      width: 210px;
      padding: 20px;
      height: 60px;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 1px solid #67d1fa;
      border-radius: 28px;
      margin-right: 20px;
      margin-bottom: 30px;
      background: rgba(14, 57, 102, .7);
    }
    .ball-wrap li:hover{
        color: #fff;
        background: rgba(0,0,0,.5);
    }
</style>
