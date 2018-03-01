<template>
    <div class="boot-page">
        <div class="overflowAuto" v-loading="loading" element-loading-text="数据加载中...">
            <!--<div class="text">-->
                <!--<p>{{datalist.articleCon | isValue }}</p>-->
            <!--</div>-->
          <table class="court-table fic">
            <thead>
            <tr>
              <th class="tc w50">序号</th>
              <th>检验项目</th>
              <th>机构类别</th>
              <th>联系人</th>
              <th class="w150">联系地址</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in datalist" @click="showPopup(item.id)">
              <td class="tc">{{index+1 | isValue}}</td>
              <td>
                <!--<a @click="showPopup(item.id)">{{item.approvalNo | isValue }}</a>-->
                {{item.inspectionItem | isValue }}
              </td>
              <td>{{item.institutionalCategory | isValue }}</td>
              <td>{{item.contacts | isValue }}</td>
              <td>{{item.address | isValue }}</td>
            </tr>
            </tbody>
          </table>
        </div>

    </div>
</template>

<script type="es6">
    import * as api from '@/assets/js/api'
    import { Loading } from 'element-ui';
    export default {
        name: 'nonSpecificRecord',
        data () {
            return {
                loading: true,
                datalist:{}
            }
        },
        methods:{
            getList(params){//列表
                api.Get('/cloudMap/fda/getNonSpecificRecordDetails',params).then((res)=>{
                    this.loading=false;
                    this.datalist =res.data;
                })
                .catch(err=>{
                })
            }
        },
        mounted(){
            this.getList({//列表
                entId:1,
                entName:this.$router.currentRoute.params.entName,
            })
        },
        filters:{
            isValue(val){
                return val = (val=="") ? "-" : val
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .boot-page{
        width:100%;
        height:100%;
        /*background:rgba(88,143,255,0.15);*/
        /*border:1px solid rgba(99,150,255,0.35);*/
    }
    /*.text{*/
        /*color:#fff;*/
        /*margin:20px 40px;*/
        /*line-height:32px;*/
    /*}*/
    /*.text p{*/
        /*text-indent:2em;*/
        /*margin-bottom:30px;*/
    /*}*/
  .fic td{
    cursor: default;
  }
</style>
