import finance from '@/pages/finance-info/index'
import financeDetails from '@/pages/finance-info/details'
import financcCsrc from '@/pages/finance-info/financcCsrc'
import financeCirc from '@/pages/finance-info/financeCirc'
const routes = [{
    path: '/entBase/:entName/finance',
    name: 'finance',
    component: finance,
    children:[
        {
            path: '/entBase/:entName/finance/financeDetails',
            name: 'financeDetails',
            component: financeDetails
        },
        {
            path: '/entBase/:entName/finance/financcCsrc',
            name: 'financcCsrc',
            component: financcCsrc
        },
        {
            path: '/entBase/:entName/finance/financeCirc',
            name: 'financeCirc',
            component: financeCirc
        }

    ]
}]

export default routes