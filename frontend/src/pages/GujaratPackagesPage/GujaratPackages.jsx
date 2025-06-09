import { Banner } from "../../components/Banner/Banner";
import { GujaratPackagesCards } from "./GujaratPackagesCards/GujaratPackagesCards";
import { GujaratPackagesTourGuide } from "./GujaratPackagesTourGuide/GujaratPackagesTourGuide"

export const GujaratPackages = () => {

    return (

        <>
            <Banner Title={"Gujarat Packages"} />


            {/* gujarat packages cards section */}

            <GujaratPackagesCards />


            {/* gujarat tour guide  */}

            <GujaratPackagesTourGuide />
        </>
    )
}

