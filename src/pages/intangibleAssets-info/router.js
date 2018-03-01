import inCapital from '@/pages/intangibleAssets-info/index'
import patentList from '@/pages/intangibleAssets-info/patentList'
import trademarkList from '@/pages/intangibleAssets-info/trademarkList'
import copyrightList from '@/pages/intangibleAssets-info/copyrightList'
import sfcopyrightList from '@/pages/intangibleAssets-info/sfcopyrightList'
import contractRecordList from '@/pages/intangibleAssets-info/contractRecordList'
import icpRecordList from '@/pages/intangibleAssets-info/icpRecordList'


const routes = [{
    path: '/entBase/:entName/inCapital',
    name: 'inCapital',
    component: inCapital,
    children:[
        {
            path: '/entBase/:entName/inCapital/patentList',
            name: 'patentList',
            component: patentList
        },
        {
            path: '/entBase/:entName/inCapital/trademarkList',
            name: 'trademarkList',
            component: trademarkList
        },
        {
            path: '/entBase/:entName/inCapital/copyrightList',
            name: 'copyrightList',
            component: copyrightList
        },
        {
            path: '/entBase/:entName/inCapital/sfcopyrightList',
            name: 'sfcopyrightList',
            component: sfcopyrightList
        },
        {
            path: '/entBase/:entName/inCapital/contractRecordList',
            name: 'contractRecordList',
            component: contractRecordList
        },
        {
            path: '/entBase/:entName/inCapital/icpRecordList',
            name: 'icpRecordList',
            component: icpRecordList
        }
    ]
}]

export default routes