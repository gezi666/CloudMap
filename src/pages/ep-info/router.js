import environmental from '@/pages/ep-info/index'
import environmentalDetails from '@/pages/ep-info/details'
import companiesList from '@/pages/ep-info/companiesList'
import overseeNoticeList from '@/pages/ep-info/overseeNoticeList'
import hotlineSituationList from '@/pages/ep-info/hotlineSituationList'
import processingSituationList from '@/pages/ep-info/processingSituationList'
const routes = [{
    path: '/entBase/:entName/environmental',
    name: 'environmental',
    component: environmental,
    children:[
        {
            path: '/entBase/:entName/environmental/environmentalDetails',
            name: 'environmentalDetails',
            component: environmentalDetails
        },
        {
            path: '/entBase/:entName/environmental/companiesList',
            name: 'companiesList',
            component: companiesList
        },
        {
            path: '/entBase/:entName/environmental/overseeNoticeList',
            name: 'overseeNoticeList',
            component: overseeNoticeList
        },
        {
            path: '/entBase/:entName/environmental/hotlineSituationList',
            name: 'hotlineSituationList',
            component: hotlineSituationList
        },
        {
            path: '/entBase/:entName/environmental/processingSituationList',
            name: 'processingSituationList',
            component: processingSituationList
        }
    ]
}]

export default routes