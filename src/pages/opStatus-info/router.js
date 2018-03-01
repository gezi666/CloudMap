import opStatus from '@/pages/opStatus-info/index'
import investList from '@/pages/opStatus-info/investList'
import mergeList from '@/pages/opStatus-info/mergeList'
import winBidList from '@/pages/opStatus-info/winBidList'
import bidList from '@/pages/opStatus-info/bidList'
import recruitList from '@/pages/opStatus-info/recruitList'


const routes = [{
    path: '/entBase/:entName/opStatus',
    name: 'opStatus',
    component: opStatus,
    children:[
        {
            path: '/entBase/:entName/opStatus/investList',
            name: 'investList',
            component: investList
        },
        {
            path: '/entBase/:entName/opStatus/mergeList',
            name: 'mergeList',
            component: mergeList
        },
        {
            path: '/entBase/:entName/opStatus/winBidList',
            name: 'winBidList',
            component: winBidList
        },
        {
            path: '/entBase/:entName/opStatus/bidList',
            name: 'bidList',
            component: bidList
        },
        {
            path: '/entBase/:entName/opStatus/recruitList',
            name: 'recruitList',
            component: recruitList
        }
    ]
}]

export default routes