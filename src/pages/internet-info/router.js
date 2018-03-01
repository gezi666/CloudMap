import internet from '@/pages/internet-info/index'
import internetDetails from '@/pages/internet-info/details'
const routes = [{
    path: '/entBase/:entName/internet',
    name: 'internet',
    component: internet,
    children:[
        {
            path: '/entBase/:entName/internet/internetDetails',
            name: 'internetDetails',
            component: internetDetails
        }
    ]
}]

export default routes