import customs from '@/pages/customs-info/index'
import customsDetails from '@/pages/customs-info/details'
import customsPunish from '@/pages/customs-info/customsPunish'
import customsRegister from '@/pages/customs-info/customsRegister'
const routes = [{
    path: '/entBase/:entName/customs',
    name: 'customs',
    component: customs,
    children:[
        {
            path: '/entBase/:entName/customs/customsDetails',
            name: 'customsDetails',
            component: customsDetails
        },
        {
            path: '/entBase/:entName/customs/customsPunish',
            name: 'customsPunish',
            component: customsPunish
        },
        {
            path: '/entBase/:entName/customs/customsRegister',
            name: 'customsRegister',
            component: customsRegister
        }

    ]
}]

export default routes