import listedCompany from '@/pages/listedCompany-info/index'
import companyFileList from '@/pages/listedCompany-info/companyFileList'
import shareholderList from '@/pages/listedCompany-info/shareholderList'
import financeAnalysisList from '@/pages/listedCompany-info/financeAnalysisList'
import valuePredictList from '@/pages/listedCompany-info/valuePredictList'
import companyEventList from '@/pages/listedCompany-info/companyEventList'
import bonusIssueList from '@/pages/listedCompany-info/bonusIssueList'
import industryAnalysisList from '@/pages/listedCompany-info/industryAnalysisList'
import mainBusinessList from '@/pages/listedCompany-info/mainBusinessList'
import mainPositionList from '@/pages/listedCompany-info/mainPositionList'
const routes = [{
    path: '/entBase/:entName/listedCompany',
    name: 'listedCompany',
    component: listedCompany,
    children:[
        {
            path: '/entBase/:entName/listedCompany/companyFileList',
            name: 'companyFileList',
            component: companyFileList
        },
        {
            path: '/entBase/:entName/listedCompany/shareholderList',
            name: 'shareholderList',
            component: shareholderList
        },
        {
            path: '/entBase/:entName/listedCompany/financeAnalysisList',
            name: 'financeAnalysisList',
            component: financeAnalysisList
        },
        {
            path: '/entBase/:entName/listedCompany/mainBusinessList',
            name: 'mainBusinessList',
            component: mainBusinessList
        },
        {
            path: '/entBase/:entName/listedCompany/mainPositionList',
            name: 'mainPositionList',
            component: mainPositionList
        },
        {
            path: '/entBase/:entName/listedCompany/valuePredictList',
            name: 'valuePredictList',
            component: valuePredictList
        },
        {
            path: '/entBase/:entName/listedCompany/companyEventList',
            name: 'companyEventList',
            component: companyEventList
        },
        {
            path: '/entBase/:entName/listedCompany/bonusIssueList',
            name: 'bonusIssueList',
            component: bonusIssueList
        },
        {
            path: '/entBase/:entName/listedCompany/industryAnalysisList',
            name: 'industryAnalysisList',
            component: industryAnalysisList
        }
    ]
}]

export default routes