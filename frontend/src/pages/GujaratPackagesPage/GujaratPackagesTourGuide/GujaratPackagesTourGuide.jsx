// import { Banner } from "../../../components/Banner/Banner"
// import { GujaratPackagesTourData } from "../GujaratPackagesData"
// import { GujaratPackagesGuideCard } from "../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard"


// export const GujaratPackagesTourGuide = () => {
    
    
//     return (

//         <>

//             <Banner Title={"Gujarat Tour 3Nights 4Days"} />

//             <div className="gujarat-packages-tour-guide-section">

//                 <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">

//                     {

//                         GujaratPackagesTourData &&  GujaratPackagesTourData.map((PackageVal,PackageIdx)=>{

//                             return(

//                                 <GujaratPackagesGuideCard Title={PackageVal.Title} Heading={PackageVal.Heading} Faq={PackageVal.Faq} Images={PackageVal.ImgUrl} TableData={PackageVal.TourTable} key={PackageIdx} Optional={PackageVal.Optional}/>

//                             )

//                         })

//                     }

//                 </div>

//             </div>

//         </>

//     )
// }

import { Banner } from "../../../components/Banner/Banner"
import { GujaratPackagesTourGuideData } from "../GujaratPackagesData"
import { GujaratPackagesGuideCard } from "../../../components/GujaratPackagesGuideCard/GujaratPackagesGuideCard"

export const GujaratPackagesTourGuide = () => {
    
    
    return (

        <>

            <Banner Title={"Gujarat Tour 3Nights 4Days"} />

            <div className="gujarat-packages-tour-guide-section">

                <div className="gujarat-packages-tour-guide-cont max-w-screen-xl mx-auto">

                    {

                        GujaratPackagesTourGuideData &&  GujaratPackagesTourGuideData.map((PackageVal,PackageIdx)=>{

                            return(

                                <GujaratPackagesGuideCard Title={PackageVal.Title} Heading={PackageVal.Heading} Faq={PackageVal.Faq} Images={PackageVal.ImgUrl} TableData={PackageVal.TourTable} key={PackageIdx} Optional={PackageVal.Optional}/>

                            )

                        })

                    }

                </div>

            </div>

        </>

    )
}