<template>
    <div class="collection" @click="isActive = !isActive">
            <div :class={up:isActive,down:!isActive}>
                <i class="star"></i>
                <span class="collect-flag">收&nbsp;藏</span>
            </div>
            <div class="active" :class={up:isActive,down:!isActive}>
                <i class="star"></i>
                <span class="collect-flag">已收藏</span>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'collection',
        data(){
            return{
                isActive: false
            }
        }
    }
</script>

<style scoped>
    .collection{
        box-sizing: border-box;
        cursor: pointer;
        width: 106px;
        height: 30px;
        border: 1px solid #0765bf;
        border-image: linear-gradient(to bottom, #0765be,#068ec6) 1 1;
        background: linear-gradient(to bottom, rgba(13,65,127,.5),rgba(12,80,137,.5));
        position:relative;
        overflow:hidden;
    }
    .collection>div{
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 0 8px 0 10px ;
        width:106px;
        height:30px;
        -webkit-animation-duration: .3s;
        animation-duration: .3s;;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        overflow:hidden;
    }

    .collection>div.up{
       animation-name: slideUp;
    }
    .collection>div.down{
       animation-name: slideDown;
    }
    
    .active{
        padding:0 7px 0 7px;
    }
    .collection:hover{
        border-image: linear-gradient(to bottom, #3f7bb3,#2a8eb7) 1 1;
        background: linear-gradient(to bottom, rgba(13,65,127,1),rgba(12,80,137,1));
    }
    .star{
        width: 21px;
        height: 21px;
        background: url("../../static/img/collection.png") center no-repeat;
        background-position: 0 0;
        background-size: 92%;
        display: inline-block;
        margin-top:5px;
        float:left;
    }
    .active .star{
        background-position: 2px -34px;
    }
    .collect-flag{
        color: #fff;
        font-size: 16px;
        font-family: '微软雅黑';
        letter-spacing: 1px;
        width:67px;
        line-height:30px;
        text-align:center;
         float:left;
    }
    @keyframes slideUp {
        0% {
            transform-origin: 0 0;
            transform: translateY(0%);
        }

        100% {
            transform-origin: 0 0;
            transform: translateY(-100%);
        }
    }
    @keyframes slideDown {
        0% {
            transform-origin: 0 0;
            transform: translateY(-100%);
        }

        100% {
            transform-origin: 0 0;
            transform: translateY(0%);
        }
    }
</style>