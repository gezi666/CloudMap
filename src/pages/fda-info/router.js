import food from '@/pages/fda-info/index'
import foodDetails from '@/pages/fda-info/details'
import foodLcence from '@/pages/fda-info/foodLcence'
import healthFoodLogin from '@/pages/fda-info/healthFoodLogin'
import drugRegRecord from '@/pages/fda-info/drugRegRecord'
import drugProduction from '@/pages/fda-info/drugProduction'
import medicalInstrument from '@/pages/fda-info/medicalInstrument'
import cosmeticsRegRecord from '@/pages/fda-info/cosmeticsRegRecord'
import adManagement from '@/pages/fda-info/adManagement'
import internetDrug from '@/pages/fda-info/internetDrug'
import domesticDrug from '@/pages/fda-info/drugRegRecord/domesticDrug'
import importedDrugs from '@/pages/fda-info/drugRegRecord/importedDrugs'
import supplementRecord from '@/pages/fda-info/drugRegRecord/supplementRecord'
import cnExtractRecord from '@/pages/fda-info/drugRegRecord/cnExtractRecord'
import domesticProductsName from '@/pages/fda-info/drugRegRecord/domesticProductsName'
import importedProductsName from '@/pages/fda-info/drugRegRecord/importedProductsName'
import drugPatents from '@/pages/fda-info/drugRegRecord/drugPatents'
import clinicalTrialMechanism from '@/pages/fda-info/drugRegRecord/clinicalTrialMechanism'
import certificationInfo from '@/pages/fda-info/drugProduction/certificationInfo'
import approvedMedicinePackage from '@/pages/fda-info/drugProduction/approvedMedicinePackage'
import regApprovalSendsInfo from '@/pages/fda-info/drugProduction/regApprovalSendsInfo'
import cnProtectionVarieties from '@/pages/fda-info/drugProduction/cnProtectionVarieties'
import domesticEquipment from '@/pages/fda-info/medicalInstrument/domesticEquipment'
import importedEquipment from '@/pages/fda-info/medicalInstrument/importedEquipment'
import medicalInstrumentsRecord from '@/pages/fda-info/medicalInstrument/medicalInstrumentsRecord'
import inspectionDirectory from '@/pages/fda-info/medicalInstrument/inspectionDirectory'
import specialCosmetics from '@/pages/fda-info/cosmeticsRegRecord/specialCosmetics'
import importCosmetics from '@/pages/fda-info/cosmeticsRegRecord/importCosmetics'
import nonSpecificRecord from '@/pages/fda-info/cosmeticsRegRecord/nonSpecificRecord'
import adApprovedInfo from '@/pages/fda-info/adManagement/adApprovedInfo'
import falseAdNotice from '@/pages/fda-info/adManagement/falseAdNotice'

const routes = [{
    path: '/entBase/:entName/food',
    name: 'food',
    component: food,
    children:[
        {
            path: '/entBase/:entName/food/foodDetails',
            name: 'foodDetails',
            component: foodDetails
        },
        {
            path: '/entBase/:entName/food/foodLcence',
            name: 'foodLcence',
            component: foodLcence
        },
        {
            path: '/entBase/:entName/food/healthFoodLogin',
            name: 'healthFoodLogin',
            component: healthFoodLogin
        },
        {
            path: '/entBase/:entName/food/drugRegRecord',
            name: 'drugRegRecord',
            component: drugRegRecord,
            children:[
                {
                    path: '/entBase/:entName/food/drugRegRecord/domesticDrug',
                    name: 'domesticDrug',
                    component: domesticDrug
                },{
                    path: '/entBase/:entName/food/drugRegRecord/importedDrugs',
                    name: 'importedDrugs',
                    component: importedDrugs
                },{
                    path: '/entBase/:entName/food/drugRegRecord/supplementRecord',
                    name: 'supplementRecord',
                    component: supplementRecord
                },{
                    path: '/entBase/:entName/food/drugRegRecord/cnExtractRecord',
                    name: 'cnExtractRecord',
                    component: cnExtractRecord
                },{
                    path: '/entBase/:entName/food/drugRegRecord/domesticProductsName',
                    name: 'domesticProductsName',
                    component: domesticProductsName
                },{
                    path: '/entBase/:entName/food/drugRegRecord/importedProductsName',
                    name: 'importedProductsName',
                    component: importedProductsName
                },{
                    path: '/entBase/:entName/food/drugRegRecord/drugPatents',
                    name: 'drugPatents',
                    component: drugPatents
                },{
                    path: '/entBase/:entName/food/drugRegRecord/clinicalTrialMechanism',
                    name: 'clinicalTrialMechanism',
                    component: clinicalTrialMechanism
                }
            ]
        },
        {
            path: '/entBase/:entName/food/drugProduction',
            name: 'drugProduction',
            component: drugProduction,
            children:[
                {
                    path: '/entBase/:entName/food/drugProduction/certificationInfo',
                    name: 'certificationInfo',
                    component: certificationInfo
                },{
                    path: '/entBase/:entName/food/drugProduction/approvedMedicinePackage',
                    name: 'approvedMedicinePackage',
                    component: approvedMedicinePackage
                },{
                    path: '/entBase/:entName/food/drugProduction/regApprovalSendsInfo',
                    name: 'regApprovalSendsInfo',
                    component: regApprovalSendsInfo
                },{
                    path: '/entBase/:entName/food/drugProduction/cnProtectionVarieties',
                    name: 'cnProtectionVarieties',
                    component: cnProtectionVarieties
                }
            ]
        },
        {
            path: '/entBase/:entName/food/medicalInstrument',
            name: 'medicalInstrument',
            component: medicalInstrument,
            children:[
                {
                    path: '/entBase/:entName/food/medicalInstrument/domesticEquipment',
                    name: 'domesticEquipment',
                    component: domesticEquipment
                },{
                    path: '/entBase/:entName/food/medicalInstrument/importedEquipment',
                    name: 'importedEquipment',
                    component: importedEquipment
                },{
                    path: '/entBase/:entName/food/medicalInstrument/medicalInstrumentsRecord',
                    name: 'medicalInstrumentsRecord',
                    component: medicalInstrumentsRecord
                },{
                    path: '/entBase/:entName/food/medicalInstrument/inspectionDirectory',
                    name: 'inspectionDirectory',
                    component: inspectionDirectory
                }
            ]
        },
        {
            path: '/entBase/:entName/food/cosmeticsRegRecord',
            name: 'cosmeticsRegRecord',
            component: cosmeticsRegRecord,
            children:[
                {
                    path: '/entBase/:entName/food/cosmeticsRegRecord/specialCosmetics',
                    name: 'specialCosmetics',
                    component: specialCosmetics
                },{
                    path: '/entBase/:entName/food/cosmeticsRegRecord/importCosmetics',
                    name: 'importCosmetics',
                    component: importCosmetics
                },{
                    path: '/entBase/:entName/food/cosmeticsRegRecord/nonSpecificRecord',
                    name: 'nonSpecificRecord',
                    component: nonSpecificRecord
                }
            ]
        },
        {
            path: '/entBase/:entName/food/adManagement',
            name: 'adManagement',
            component: adManagement,
            children:[
                {
                    path: '/entBase/:entName/food/adManagement/adApprovedInfo',
                    name: 'adApprovedInfo',
                    component: adApprovedInfo
                },{
                    path: '/entBase/:entName/food/adManagement/falseAdNotice',
                    name: 'falseAdNotice',
                    component: falseAdNotice
                }
            ]
        },
        {
            path: '/entBase/:entName/food/internetDrug',
            name: 'internetDrug',
            component: internetDrug
        }
    ]
}]

export default routes