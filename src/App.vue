<template>
  <div id="app" class="app">
      <div class="con-wrap">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style scoped>
  .app{
      width: 100%;
      height: 100%;
      background: #13151e url("./../static/img/bg.png") center no-repeat;
      background-size: 100% 100%;
  }
  .con-wrap{
      width: 100%;
      height: 100%;
  }
  </style>
