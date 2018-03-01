import quality from '@/pages/quality-info/index'
import qualityDetails from '@/pages/quality-info/details'
import qualityEntry from '@/pages/quality-info/qualityEntry'
import qualityExport from '@/pages/quality-info/qualityExport'
import qualityVehicle from '@/pages/quality-info/qualityVehicle'

const routes = [{
    path: '/entBase/:entName/quality',
    name: 'quality',
    component: quality,
    children:[
        {
            path: '/entBase/:entName/quality/qualityDetails',
            name: 'qualityDetails',
            component: qualityDetails
        },
        {
            path: '/entBase/:entName/quality/qualityEntry',
            name: 'qualityEntry',
            component: qualityEntry
        },
        {
            path: '/entBase/:entName/quality/qualityExport',
            name: 'qualityExport',
            component: qualityExport
        },
        {
            path: '/entBase/:entName/quality/qualityVehicle',
            name: 'qualityVehicle',
            component: qualityVehicle
        }

    ]
}]

export default routes