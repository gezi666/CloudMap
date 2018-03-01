import court from '@/pages/court-info/index'
import courtDetails from '@/pages/court-info/details'
import brokenPromisesDetails from '@/pages/court-info/brokenPromisesDetails'
import refereeDocuments from '@/pages/court-info/refereeDocuments'
import courtAnnouncement from '@/pages/court-info/courtAnnouncement'

const routes = [{
    path: '/entBase/:entName/court',
    name: 'court',
    component: court,
    children:[
        {
            path: '/entBase/:entName/court/courtDetails',
            name: 'courtDetails',
            component: courtDetails
        },{
            path: '/entBase/:entName/court/brokenPromisesDetails',
            name: 'brokenPromisesDetails',
            component: brokenPromisesDetails
        },{
            path: '/entBase/:entName/court/refereeDocuments',
            name: 'refereeDocuments',
            component: refereeDocuments
        },{
            path: '/entBase/:entName/court/courtAnnouncement',
            name: 'courtAnnouncement',
            component: courtAnnouncement
        }
    ]
}]

export default routes