import tax from '@/pages/tax-info/index'
import taxDetails from '@/pages/tax-info/details'
import taxIllegalCase from '@/pages/tax-info/taxIllegalCase'
import taxArrearsInfo from '@/pages/tax-info/taxArrearsInfo'
import abnormalIdentified from '@/pages/tax-info/abnormalIdentified'
import taxAdministrativePenalty from '@/pages/tax-info/taxAdministrativePenalty'
const routes = [{
    path: '/entBase/:entName/tax',
    name: 'tax',
    component: tax,
    children:[
        {
            path: '/entBase/:entName/tax/taxDetails',
            name: 'taxDetails',
            component: taxDetails
        },
        {
            path: '/entBase/:entName/tax/taxIllegalCase',
            name: 'taxIllegalCase',
            component: taxIllegalCase
        },
        {
            path: '/entBase/:entName/tax/taxArrearsInfo',
            name: 'taxArrearsInfo',
            component: taxArrearsInfo
        },
        {
            path: '/entBase/:entName/tax/abnormalIdentified',
            name: 'abnormalIdentified',
            component: abnormalIdentified
        },
        {
            path: '/entBase/:entName/tax/taxAdministrativePenalty',
            name: 'taxAdministrativePenalty',
            component: taxAdministrativePenalty
        }
    ]
}]

export default routes