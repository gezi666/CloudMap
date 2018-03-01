<template>
    <div class="boot-page"  v-loading="loading" element-loading-text="数据加载中...">
        <div class="financeAnalysis">
            <!--资产负债表-->
            <div class="balanceSheet">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        资产负债表
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current==0 ? 'active' : '']" @click="tab(0)">按报告期</li>
                    <li class="fl" :class="[current==1 ? 'active' : '']" @click="tab(1)">按年度</li>
                    <li class="fl" :class="[current==2 ? 'active' : '']" @click="tab(2)">按单季度</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">科目\年度</th>
                        <th class="lastTh" v-for="(item,index) in balanceSheet.date">{{item | isValue}}</th>
                    </tr>
                    <tr >
                        <td class="firstTd">货币资金（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.monetaryFund">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">交易性金融资产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.tradeCapital">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应收票据（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.receiveBills">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应收账款（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.receiveAccounts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">预付账款（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.advancePayment">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应收利息（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.receiveInterest">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应收股利（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.receiveDividend">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">存货（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.stock">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">一年内到期的非流动资产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.noCurrentAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">其他流动资产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.currentAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">流动资产合计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.totalCurrentAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">可供出售金融资产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.saleAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">持有至到期投资（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.heldToMaturityInvest">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">投资性房地产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.investRealEstate">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">固定资产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.fixedAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">在建工程（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.constructInProgress">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">工程物资（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.engineerMaterial">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">固定资产清理（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.fixedAssetsClean">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">无形资产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.intangibleAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">商誉（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.goodwill">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">长期待摊费用（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.longTermExpense">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">递延所得税资产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.deferredTaxAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">非流动资产合计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.totalNoCurrentAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">资产总计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.totalAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应付票据（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.billPayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应付账款（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.accountPayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">预收账款（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.advanceRecieve">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应付职工薪酬（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.staffSalary">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应交税费（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.taxFeePayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应付利息（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.interestPayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应付股利（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.dividendsPayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">其他应付款（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.othersPayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">一年内到期的非流动负债（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.dueNoCurrentDebts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">其他流动负债（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.otherCurrentDebts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">流动负债合计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.totalCurrentDebts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">长期借款（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.longTermBorrow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">应付债券（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.debtsPayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">长期应付款（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.longTermPayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">专项应付款（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.specialPayable">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">预计负债（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.expectDebts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">递延所得税负债（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.deferredTaxDebts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">其他非流动负债（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.otherNoCurrentDebts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">非流动负债合计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.totalNoCurrentDebts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">负债合计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.totalDebts">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">股本（股）</td>
                        <td class="lastTd" v-for="(items,index) in details.equity">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">资本公积金（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.capitalReserve">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">盈余公积金（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.surplusReserve">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">未分配利润（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.unDistributedProfit">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">外币报表折算差额（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.foreignCurrencyDifference">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">归属于母公司股权合计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.parentCompanyTotalStock">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">少数股东权益（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.minorityShareholderInterests">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">股东权益合计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.totalShareholderInterests">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">负债和股东权益总计（元）</td>
                        <td class="lastTd" v-for="(items,index) in details.totalDebtsShareholderInterests">{{items | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--资产负债构成-->
            <div class="balanceComposition clearfix">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        资产负债构成
                    </span>
                </h3>
                <table class="halfTable fl">
                    <tr>
                        <th class="firstTh lastTh" colspan="2">资产</th>
                    </tr>
                    <tr>
                        <th class="firstTh">科目</th>
                        <th class="lastTh">金额</th>
                    </tr>
                    <tr>
                        <td class="firstTd">流动资产</td>
                        <td class="lastTd">{{balanceComposition.currentAssets | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">长期投资</td>
                        <td class="lastTd">{{balanceComposition.longTermInvest | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">固定资产</td>
                        <td class="lastTd">{{balanceComposition.fixedAssets | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">无形资产</td>
                        <td class="lastTd">{{balanceComposition.invisibleAssets | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">其他</td>
                        <td class="lastTd">{{balanceComposition.otherAssets | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">资产总计</td>
                        <td class="lastTd">{{balanceComposition.totalAssets | isValue}}</td>
                    </tr>
                </table>
                <table class="halfTable fr">
                    <tr>
                        <th class="firstTh lastTh" colspan="2">资产</th>
                    </tr>
                    <tr>
                        <th class="firstTh">科目</th>
                        <th class="lastTh">金额</th>
                    </tr>
                    <tr>
                        <td class="firstTd">流动负债</td>
                        <td class="lastTd">{{balanceComposition.currentDebts | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">长期借款</td>
                        <td class="lastTd">{{balanceComposition.longTermDebts | isValue}}</td>
                    </tr>
                    <tr>
                        <td class="firstTd">其他</td>
                        <td class="lastTd">{{balanceComposition.otherDebts | isValue}}</td>
                    </tr>
                    <tr class="lastTr">
                        <td class="firstTd">负债总计</td>
                        <td class="lastTd">{{balanceComposition.totalDebts | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--利润表-->
            <div class="profitSheet">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        利润表
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current2==0 ? 'active' : '']" @click="tab2(0)">按报告期</li>
                    <li class="fl" :class="[current2==1 ? 'active' : '']" @click="tab2(1)">按年度</li>
                    <li class="fl" :class="[current2==2 ? 'active' : '']" @click="tab2(2)">按单季度</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">科目\年度</th>
                        <th class="lastTh" v-for="(item,index) in profitSheet.date">{{item}}</th>
                    </tr>
                    <tr >
                        <td class="firstTd">净利润（元）</td>
                        <td class="lastTd" v-for="(items,index) in details2.netProfit">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">扣非净利润(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.netProfitDeduct">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业总收入(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.grossRevenue">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业收入(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.operatingRevenue">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业总成本(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.totalOperatingCost">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业成本(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.operatingCost">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业利润(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.operatingProfit">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">投资收益(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.investInterest">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">资产减值损失(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.assetsImpairLoss">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">其他流动资产（元）</td>
                        <td class="lastTd" v-for="(items,index) in details2.otherCurrentAssets">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">管理费用(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.manageFee">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">销售费用(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.saleFee">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">财务费用(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.financeFee">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业外收入(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.nonOperatingIncome">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业外支出(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.nonOperatingExpense">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业税金及附加(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.operatingTaxSurcharge">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">利润总额(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.totalProfit">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">所得税(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.incomeTax">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">其他综合收益(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.otherComprehensiveIncome">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">综合收益总额(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.totalComprehensiveIncome">{{items}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">归属于母公司股东的综合收益总额(元)</td>
                        <td class="lastTd" v-for="(items,index) in details2.parentTotalComprehensiveIncome">{{items}}</td>
                    </tr>
                </table>
            </div>
            <!--现金流量表-->
            <div class="cashCirculateSheet">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        现金流量表
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current3==0 ? 'active' : '']" @click="tab3(0)">按报告期</li>
                    <li class="fl" :class="[current3==1 ? 'active' : '']" @click="tab3(1)">按年度</li>
                    <li class="fl" :class="[current3==2 ? 'active' : '']" @click="tab3(2)">按单季度</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">科目\年度</th>
                        <th class="lastTh" v-for="(item,index) in cashCirculateSheet.date">{{item | isValue}}</th>
                    </tr>
                    <tr >
                        <td class="firstTd">销售商品、提供劳务收到的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.cashReceived">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">收到的税费与返还(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.taxReturn">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">支付的各项税费(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.allTypeTax">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">支付给职工以及为职工支付的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.cashPaid">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">经营现金流入(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.operateCashInflow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">经营现金流出(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.operateCashOutflow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">经营现金流量净额(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.operateNetCashFlow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">处置固定资产、无形资产的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.fixedInAssetsCash">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">购建固定资产和其他支付的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.fixedAssetsOtherPaymentCash">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">投资支付的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.investCash">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">取得子公司现金净额(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.sonNetCashAmount">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">支付其他与投资的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.otherInvestCash">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">投资现金流入(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.investCashInflow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">投资现金流出(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.investCashOutflow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">投资现金流量净额(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.investNetCashFlow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">吸收投资收到现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.investCashReceived">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">取得借款的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.borrowCashReceived">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">收到其他与筹资的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.otherFinanceCashReceived">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">偿还债务支付现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.payDebtCash">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">分配股利、利润或偿付利息支付的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.dividendProfitInterestCash">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">支付其他与筹资的现金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.otherFinanceCashPaid">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">筹资现金流入(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.financeCashInflow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">筹资现金流出(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.financeCashOutflow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">筹资现金流量净额(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.financeNetCashFlow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">汇率变动对现金的影响(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.exchangeRateChangeEffect">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">现金及现金等价物净增加额(元)</td>
                        <td class="lastTd" v-for="(items,index) in details3.cashNetIncrease">{{items | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--主要指标-->
            <div class="balanceSheet">
                <h3>
                    <div class="listedComponeySelect">
                        <el-select placeholder="主要指标" v-model="value" @change="changeCon(value)" popper-class="listedSelect">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current4==0 ? 'active' : '']" @click="tab4(0)">按报告期</li>
                    <li class="fl" :class="[current4==1 ? 'active' : '']" @click="tab4(1)">按年度</li>
                    <li class="fl" :class="[current4==2 ? 'active' : '']" @click="tab4(2)">按单季度</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">科目\年度</th>
                        <th class="lastTh" v-for="(item,index) in mainIndex.date">{{item | isValue}}</th>
                    </tr>
                    <tr >
                        <td class="firstTd">净利润（元）</td>
                        <td class="lastTd" v-for="(items,index) in details4.netProfit">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">净利润同比增长率</td>
                        <td class="lastTd" v-for="(items,index) in details4.netProfitGrowthRate">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">扣非净利润（元）</td>
                        <td class="lastTd" v-for="(items,index) in details4.nonNetProfit">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">扣非净利润同比增长率</td>
                        <td class="lastTd" v-for="(items,index) in details4.nonNetProfitGrowthRate">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业总收入(元)</td>
                        <td class="lastTd" v-for="(items,index) in details4.grossRevenue">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">营业总收入同比增长率</td>
                        <td class="lastTd" v-for="(items,index) in details4.grossRevenueGrowthRate">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">每股净资产(元)</td>
                        <td class="lastTd" v-for="(items,index) in details4.perShareNetAssets">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">净资产收益率</td>
                        <td class="lastTd" v-for="(items,index) in details4.netAssetsReturn">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">净资产收益率-摊薄</td>
                        <td class="lastTd" v-for="(items,index) in details4.netAssetsReturnDiminish">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">资产负债比率</td>
                        <td class="lastTd" v-for="(items,index) in details4.assetsDebtsRate">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">每股资本公积金(元)</td>
                        <td class="lastTd" v-for="(items,index) in details4.perShareAssetsPublicReserve">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">每股未分配利润(元)</td>
                        <td class="lastTd" v-for="(items,index) in details4.perShareNonAllocateProfit">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">每股经营现金流(元)</td>
                        <td class="lastTd" v-for="(items,index) in details4.perShareOpCashFlow">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">销售毛利率</td>
                        <td class="lastTd" v-for="(items,index) in details4.saleGrossRate">{{items | isValue}}</td>
                    </tr>
                    <tr >
                        <td class="firstTd">销售净利率</td>
                        <td class="lastTd" v-for="(items,index) in details4.saleNetRate">{{items | isValue}}</td>
                    </tr>
                </table>
            </div>
            <!--指标变动说明-->
            <div class="indexChangeInstruct">
                <h3 class="titleBar clearfix">
                    <i class="fl"></i>
                    <span class="titleBarName fl">
                        指标变动说明
                    </span>
                </h3>
                <ul class="clearfix filter">
                    <li class="fl" :class="[current5==index ? 'active' : '']" @click="tab5(index,item)" v-for="(item,index) in indexChangeInstruct.date">{{item}}</li>
                </ul>
                <table>
                    <tr>
                        <th class="firstTh">变动科目</th>
                        <th>本期数值</th>
                        <th>上期数值</th>
                        <th>变动幅度</th>
                        <th class="lastTh">变动原因</th>
                    </tr>
                    <tr v-for="(items,index) in indexChangeInstruct.details">
                        <td class="firstTd">{{items.changeItem | isValue}}</td>
                        <td>{{items.currentValue | isValue}}</td>
                        <td>{{items.previousValue | isValue}}</td>
                        <td :class="{classA:items.changeStatus==1,classB:items.changeStatus==2,classC:items.changeStatus==3,classD:items.changeStatus==4}">{{items.changeScope | isValue}}</td>
                        <td class="lastTd">{{items.changeReason | isValue}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import * as api from '@/assets/js/api'
    export default {
        name: 'financeAnalysisList',
        mounted(){
//            资产负债表
            api.Get('/cloudMap/listedCompany/getBalanceSheetList', {
                "entId": 1,
                "entName": this.entName,
                "dateType":0,
            }).then((res) => {
                this.loading=false;
                this.balanceSheet = res.data;
                this.details=res.data.details;
            })
//            资产负债构成
            api.Get('/cloudMap/listedCompany/getBalanceComposition', {
                "entId": 1,
                "entName": this.entName,
            }).then((res) => {
                this.balanceComposition = res.data;
            })
//            利润表
            api.Get('/cloudMap/listedCompany/getProfitSheetList', {
                "entId": 1,
                "entName": this.entName,
                "dateType":0,
            }).then((res) => {
                this.profitSheet = res.data;
                this.details2=res.data.details;
            })
//            现金流量表
            api.Get('/cloudMap/listedCompany/getCashCirculateList', {
                "entId": 1,
                "entName": this.entName,
                "dateType":0,
            }).then((res) => {
                this.cashCirculateSheet = res.data;
                this.details3=res.data.details;
            })
//            主要指标
            api.Get('/cloudMap/listedCompany/getMainIndexList', {
                "entId": 1,
                "entName": this.entName,
                "dateType":0,
                "indexType":0
            }).then((res) => {
                this.mainIndex = res.data;
                this.details4=res.data.details;
            })
//            指标变动说明
            api.Get('/cloudMap/listedCompany/getIndexChangeInstructList', {
                "entId": 1,
                "entName": this.entName,
                "dateType":0
            }).then((res) => {
                this.indexChangeInstruct = res.data;
            })
        },
        data () {
            return {
                loading:true,
                entId:1,
                entName:this.$router.currentRoute.params.entName,
                indexType:0,    //指标类型
                dateType:0,     //时间类型（按报告期，按年度，按单季度）
                options:[
                    {
                        value: '选项1',
                        label: '主要指标'
                    },{
                        value: '选项2',
                        label: '主要指标-每股能力'
                    },{
                        value: '选项3',
                        label: '主要指标-成长能力'
                    },{
                        value: '选项4',
                        label: '主要指标-偿债能力'
                    },{
                        value: '选项5',
                        label: '主要指标-运营能力'
                    }
                ],  //select选项值
                value:'',       //select被选中值
                current:0,
                current2:0,
                current3:0,
                current4:0,
                current5:0,
                classA: 'classA',  //表格增加减少类名变量--不变
                classB: 'classB',  //表格增加减少类名变量--增加
                classC: 'classC',  //表格增加减少类名变量--减少
                classD: 'classD',  //表格增加减少类名变量--新进
                balanceSheet:{},
                balanceComposition:{},
                profitSheet:{},
                cashCirculateSheet:{},
                mainIndex:{},
                indexChangeInstruct:{},
                details:'',
                details2:'',
                details3:'',
                details4:'',
            }
        },
        created () {
//            this.tabClass();
        },
        methods:{
//下拉框选项--切换
            changeCon(value){
                switch(value)
                {
                    case '选项2':
                        api.Get('/cloudMap/listedCompany/getMainIndexList', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":1
                        }).then((res) => {
                            this.mainIndex = res.data;
                            this.details4=res.data.details;
                            this.indexType=1;
                        })
                        break;
                    case '选项3':
                        api.Get('/cloudMap/listedCompany/getMainIndexList', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":2
                        }).then((res) => {
                            this.mainIndex = res.data;
                            this.details4=res.data.details;
                            this.indexType=2;
                        })
                        break;
                    case '选项4':
                        api.Get('/cloudMap/listedCompany/getMainIndexList', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":3
                        }).then((res) => {
                            this.mainIndex = res.data;
                            this.details4=res.data.details;
                            this.indexType=3;
                        })
                        break;
                    case '选项5':
                        api.Get('/cloudMap/listedCompany/getMainIndexList', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":4
                        }).then((res) => {
                            this.mainIndex = res.data;
                            this.details4=res.data.details;
                            this.indexType=4;
                        })
                        break;
                    default:
                        api.Get('/cloudMap/listedCompany/getMainIndexList', {
                            "entId": 1,
                            "entName": this.entName,
                            "dateType":this.dateType,
                            "indexType":0
                        }).then((res) => {
                            this.mainIndex = res.data;
                            this.details4=res.data.details;
                            this.indexType=0;
                        })
                }

            },
//资产负债表-切换
            tab(i){
                this.current=i;
                if (i==1) {
                    this.fetList(1,'/cloudMap/listedCompany/getBalanceSheetList',this.balanceSheet,this.details)
                }else if (i==2){
                    this.fetList(1,'/cloudMap/listedCompany/getBalanceSheetList',this.balanceSheet,this.details)
                }else{
                    this.fetList(2,'/cloudMap/listedCompany/getBalanceSheetList',this.balanceSheet,this.details)
                }
            },
//利润表-切换
            tab2(i){
                this.current2=i;
                if (i==0) {
                    this.fetList(0,'/cloudMap/listedCompany/getProfitSheetList',this.profitSheet,this.details2)
                }else if (i==1){
                    this.fetList(1,'/cloudMap/listedCompany/getProfitSheetList',this.profitSheet,this.details2)
                }else{
                    this.fetList(2,'/cloudMap/listedCompany/getProfitSheetList',this.profitSheet,this.details2)
                }
            },
//现金流量表-切换
            tab3(i){
                this.current3=i;
                if (i==0) {
                    this.fetList(0,'/cloudMap/listedCompany/getCashCirculateList',this.cashCirculateSheet,this.details3)
                }else if (i==1){
                    this.fetList(1,'/cloudMap/listedCompany/getCashCirculateList',this.cashCirculateSheet,this.details3)
                }else{
                    this.fetList(2,'/cloudMap/listedCompany/getCashCirculateList',this.cashCirculateSheet,this.details3)
                }
            },
//主要指标-切换
            tab4(i){
                this.current4=i;
                if (i==0){
                    this.fetList(0,'/cloudMap/listedCompany/getMainIndexList',this.mainIndex,this.details4);
                    this.indexType=0;
                }else if (i==1) {
                    this.fetList(1,'/cloudMap/listedCompany/getMainIndexList',this.mainIndex,this.details4);
                    this.indexType=1;
                }else{
                    this.fetList(2,'/cloudMap/listedCompany/getMainIndexList',this.mainIndex,this.details4);
                    this.indexType=2;
                }
            },
//指标变动说明-切换
            tab5(i,item){
                this.current5=i;
                this.fetList2(item,'/cloudMap/listedCompany/getIndexChangeInstructList',this.indexChangeInstruct)
            },
//主要指标
            fetList(dateType,url,data,details){
                api.Get(url, {
                    "entId": 1,
                    "entName": this.entName,
                    "dateType":dateType,
                    "indexType":this.indexType
                }).then((res) => {
                    data = res.data;
                    details = res.data.details;
                    this.dateType=dateType;
                })
            },
//指标变动说明
            fetList2(dateType,url,data){
                api.Get(url, {
                    "entId": 1,
                    "entName": this.entName,
                    "dateType":dateType,
                }).then((res) => {
                    data = res.data;
                })
            }
        },
        components:{

        },
        watch: {

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
    @import 'assets/css/common.css';
    .financeAnalysis table{
        margin-bottom:22px;
    }
    .listedComponeySelect{margin-bottom: 8px;}
    /*===========================资产负债表============================*/
    .balanceSheet th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
    }
    .balanceSheet .firstTh {
        border-left: 1px solid #284f9d;
        width: 20%;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .balanceSheet td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
    }
    .balanceSheet tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-right:none;
        border-left:none;
        text-align: left;
    }
    .balanceSheet .firstTd{
        border-left:1px solid #1f3b6d;
        border-right:none;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .balanceSheet tr:hover .firstTd{
        border-left:1px solid #1f3b6d;
        border-right:none;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .balanceSheet td:last-child{
        border-right:1px solid #1f3b6d;
    }
    .balanceSheet tr:hover td:last-child{
        border-right:1px solid #1f3b6d;
    }
    .balanceSheet .lastTh{
        border-right:none;
    }
    .balanceSheet th:last-child{
        border-right:1px solid #1f3b6d;
    }
    .balanceSheet th:hover td:last-child{
        border-right:1px solid #1f3b6d;
    }
    /*===========================利润表============================*/
    .profitSheet th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
    }
    .profitSheet .firstTh{
        border-left:1px solid #284f9d;
        width:20%;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .profitSheet td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
    }
    .profitSheet tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-right:none;
        text-align: left;
    }
    .profitSheet .lastTd{
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .profitSheet tr:hover .lastTd{
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .profitSheet .firstTd{
        border-left:1px solid #1f3b6d;
        border-right:none;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .profitSheet tr:hover .firstTd{
        border-left:1px solid #1f3b6d;
        border-right:none;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .profitSheet td:last-child{
        border-right:1px solid #1f3b6d;
    }
    .profitSheet tr:hover td:last-child{
        border-right:1px solid #1f3b6d;
    }
    .profitSheet .lastTh{
        border-right:none;
    }
    .profitSheet th:last-child{
        border-right:1px solid #1f3b6d;
    }
    .profitSheet th:hover td:last-child{
        border-right:1px solid #1f3b6d;
    }
    /*===========================现金流量表============================*/
    .cashCirculateSheet th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
    }
    .cashCirculateSheet .firstTh{
        border-left:1px solid #284f9d;
        width:20%;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .cashCirculateSheet td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
    }
    .cashCirculateSheet tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-right:none;
        text-align: left;
    }
    .cashCirculateSheet .lastTd{
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .cashCirculateSheet tr:hover .lastTd{
        border:1px solid #325eb2;
        border-right:none;
        border-left:none;
    }
    .cashCirculateSheet .firstTd{
        border-left:1px solid #1f3b6d;
        border-right:none;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .cashCirculateSheet tr:hover .firstTd{
        border-left:1px solid #1f3b6d;
        border-right:none;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .cashCirculateSheet  td:last-child{
        border-right:1px solid #1f3b6d;
    }
    .cashCirculateSheet tr:hover td:last-child{
        border-right:1px solid #1f3b6d;
    }
    .cashCirculateSheet .lastTh{
        border-right:none;
    }
    .cashCirculateSheet th:last-child{
        border-right:1px solid #1f3b6d;
    }
    .cashCirculateSheet th:hover td:last-child{
        border-right:1px solid #1f3b6d;
    }
    /*===========================资产负债构成============================*/
    .balanceComposition th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #325eb2;
        border-bottom:1px solid #325eb2;
        text-align: center;
    }
    .balanceComposition .firstTh{
        border-left:1px solid #325eb2;
    }
    .balanceComposition .lastTh{
        border-right:1px solid #325eb2;
    }
    .balanceComposition td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: center;
    }
    .balanceComposition table{
        position: relative;
        border-collapse:collapse;
        border-spacing:0 0px;
    }
    .balanceComposition tr:hover td{
         height:34px;
         background: rgba(40,92,198,0.35);
         border:1px solid #325eb2;
         box-sizing: border-box;
         border-left:none;
         text-align: center;
      
    }
    .balanceComposition .firstTd{
        border-left:1px solid #325eb2;
        border-right:none;
        padding:0 20px;
    }
    .balanceComposition tr:hover .firstTd{
        border-left:1px solid #325eb2;
        border-right:none;
        padding:0 20px;
    }
    .balanceComposition .halfTable{
        width:49%;
    }
    .balanceComposition .lastTd{
        border-right:1px solid #325eb2;
        text-decoration: none;
        cursor: none;
        width:50%;
    }

    /*===========================指标变动说明============================*/
    .indexChangeInstruct th{
        height:34px;
        background:rgba(40,92,198,0.35);
        color:#cdd2de;
        border-top:1px solid #284f9d;
        border-bottom:1px solid #284f9d;
        text-align: center;
    }
    .indexChangeInstruct .firstTh{
        border-left:1px solid #284f9d;
        width:20%;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .indexChangeInstruct .lastTh{
        border-right:1px solid #284f9d;
        width:45%;
    }
    .indexChangeInstruct td{
        height:34px;
        background:rgba(88,143,255,0.15);
        color:#fff;
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-left:none;
        border-right:none;
        text-align: left;
    }
    .indexChangeInstruct tr:hover td{
        background: rgba(40,92,198,0.35);
        border:1px solid #325eb2;
        box-sizing: border-box;
        border-right:none;
        border-left:none;
        text-align: left;
    }
    .indexChangeInstruct .firstTd{
        border-left:1px solid #1f3b6d;
        border-right:none;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .indexChangeInstruct tr:hover .firstTd{
        border-left:1px solid #1f3b6d;
        border-right:none;
        padding:0 20px;
        box-sizing: border-box;
        text-align: left;
    }
    .indexChangeInstruct .lastTd{
        border-right:1px solid #1f3b6d;
        text-align: left;
        padding:0 20px;
        box-sizing: border-box;
    }
    .indexChangeInstruct tr:hover .lastTd{
        border-right:1px solid #1f3b6d;
        text-align: left;
        padding:0 20px;
        box-sizing: border-box;
    }
    .indexChangeInstruct td.classA{
        color:#fff;
    }
    .indexChangeInstruct td.classB{
        color:#e07567;
    }
    .indexChangeInstruct td.classB:after{
        content:" ↑";
        color:#e07567;
        font-weight:bold;
    }
    .indexChangeInstruct td.classC{
        color:#3cd947;
    }
    .indexChangeInstruct td.classC:before{
        content:"- ";
        color:#3cd947;
        font-weight:bold;
    }
    .indexChangeInstruct td.classC:after{
        content:" ↓";
        color:#3cd947;
        font-weight:bold;
    }
    .indexChangeInstruct td.classD{
        color:#ff6344;
    }
    .boot-page {
        height: auto;
    }
</style>
