/**
 * Created by 魏阁 on 2017-8-7.
 */
import business from '@/pages/business-info/index'
import baseInfoList from '@/pages/business-info/baseInfoList'
import shareholderInfoList from '@/pages/business-info/shareholderInfoList'
import keyPersonnelInfoList from '@/pages/business-info/keyPersonnelInfoList'
import branchInfoList from '@/pages/business-info/branchInfoList'
import changeInfoList from '@/pages/business-info/changeInfoList'
import clearingInfoList from '@/pages/business-info/clearingInfoList'
import admPermitInfoList from '@/pages/business-info/admPermitInfoList'
import abnormalOperateInfoList from '@/pages/business-info/abnormalOperateInfoList'
import blacklistInfoList from '@/pages/business-info/blacklistInfoList'
import spotCheckInfoList from '@/pages/business-info/spotCheckInfoList'
import judicialAssistInfoList from '@/pages/business-info/judicialAssistInfoList'
import movablesMortgageInfoList from '@/pages/business-info/movablesMortgageInfoList'
import equityCapitalInfoList from '@/pages/business-info/equityCapitalInfoList'
import intellectualPropertyInfoList from '@/pages/business-info/intellectualPropertyInfoList'
import admPunishInfoList from '@/pages/business-info/admPunishInfoList'
import entAnnualReportInfoList from '@/pages/business-info/entAnnualReportInfoList'


const routes = [{
    path: '/entBase/:entName/business',
    name: 'business',
    component: business,
    children:[
        {
            path: '/entBase/:entName/business/baseInfoList',
            name: 'baseInfoList',
            component: baseInfoList
        },
        {
            path: '/entBase/:entName/business/shareholderInfoList',
            name: 'shareholderInfoList',
            component: shareholderInfoList
        },
        {
            path: '/entBase/:entName/business/keyPersonnelInfoList',
            name: 'keyPersonnelInfoList',
            component: keyPersonnelInfoList
        },
        {
            path: '/entBase/:entName/business/branchInfoList',
            name: 'branchInfoList',
            component: branchInfoList
        },
        {
            path: '/entBase/:entName/business/changeInfoList',
            name: 'changeInfoList',
            component: changeInfoList
        },
        {
            path: '/entBase/:entName/business/clearingInfoList',
            name: 'clearingInfoList',
            component: clearingInfoList
        },
        {
            path: '/entBase/:entName/business/admPermitInfoList',
            name: 'admPermitInfoList',
            component: admPermitInfoList
        },
        {
            path: '/entBase/:entName/business/abnormalOperateInfoList',
            name: 'abnormalOperateInfoList',
            component: abnormalOperateInfoList
        },
        {
            path: '/entBase/:entName/business/blacklistInfoList',
            name: 'blacklistInfoList',
            component: blacklistInfoList
        },
        {
            path: '/entBase/:entName/business/spotCheckInfoList',
            name: 'spotCheckInfoList',
            component: spotCheckInfoList
        },
        {
            path: '/entBase/:entName/business/judicialAssistInfoList',
            name: 'judicialAssistInfoList',
            component: judicialAssistInfoList
        },
        {
            path: '/entBase/:entName/business/movablesMortgageInfoList',
            name: 'movablesMortgageInfoList',
            component: movablesMortgageInfoList
        },
        {
            path: '/entBase/:entName/business/equityCapitalInfoList',
            name: 'equityCapitalInfoList',
            component: equityCapitalInfoList
        },
        {
            path: '/entBase/:entName/business/intellectualPropertyInfoList',
            name: 'intellectualPropertyInfoList',
            component: intellectualPropertyInfoList
        },
        {
            path: '/entBase/:entName/business/admPunishInfoList',
            name: 'admPunishInfoList',
            component: admPunishInfoList
        },
        {
            path: '/entBase/:entName/business/entAnnualReportInfoList',
            name: 'entAnnualReportInfoList',
            component: entAnnualReportInfoList
        }
    ]
}]

export default routes