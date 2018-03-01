<template>
    <div class="chartcon" :id='barChartId'></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    //引入柱形图
    require('echarts/lib/chart/bar');
    // 引入提示框
    require('echarts/lib/component/tooltip');
    export default {
        name: 'barChart',
        props:['barChartId','dataList'],
        data(){
            return{
            }
        },
        mounted(){
            this.$nextTick(function() {
                this.initBar(this.barChartId);
            })
        },
        methods:{
            initBar(barChartId) {
                let myChart = echarts.init(document.getElementById(barChartId));
                myChart.setOption({
                    grid: {
                        right: '8%',
                        left: '8%',
                        bottom: '25%',
                        top: '12%',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            shadowStyle: {
                                color: 'rgba(0,46, 115, 0.3)',
                            }
                        },
                        borderColor: '#036ea1',
                        borderWidth:1,
                        backgroundColor:'rgba(255,255,255,0.8)',
                        padding: 14,
                        formatter: function(params, ticket, callback) {
//                            return '<p style="color:#fffd40">' + params[0].name + '</p><span>' + params[0].data.name + ' : ' + params[0].data.value + '</span>';
                        },
                        show:false
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        data:this.dataList.date,
                        axisLine: {
                            lineStyle: {
                                opacity: 0.3,
                                color:'#036ea1',
                                type:'dashed'
                            }
                        },
                        axisLabel:{
                            rotate:45,
                            interval:0,
                            margin:15,
                            textStyle:{
                                color:'#fff'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    }],
                    yAxis: [{
                        name:'单位：万股',
                        nameGap:20,
                        type: 'value',
                        interval:20000,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                opacity: 0.3,
                                color:'#fff',
                                type:'dashed'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                opacity: 0.3,
                                color:'#036ea1',
                                type:'dashed'
                            }
                        }
                    }],
                    series: {
                        type: 'bar',
                        barMaxWidth: 30,
                        barGap: '60%',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 1, [{
                                        offset: 0,
                                        color: '#00ccff'
                                    }, {
                                        offset: 1,
                                        color: '#008aff'
                                    }]
                                ),
                                opacity: 0.6,
                                barBorderRadius: [5, 5, 0, 0],
                                borderColor: '#00c5ff',
                                borderWidth: 2,
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#00ccff'
                                    }, {
                                        offset: 1,
                                        color: '#008aff'
                                    }]
                                ),
                                opacity: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle:{
                                    color:'#fffd40',
                                    fontSize:14
                                }
                            }
                        },
                        data: this.dataList.dataList
                    }
                });
            }
        },
        watch:{
            dataList(){
//                console.log(this.dataList);
                this.initBar(this.barChartId);
            }
        }
    }
</script>

<style scoped>
    .chartcon{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>