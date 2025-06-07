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



// //jainik code
// import { useParams } from "react-router-dom";

// export const GujaratPackages = () => {
//   const { PathName } = useParams();

//   return (
//     <>
//       <h1>{PathName.replace(/-/g, " ").toUpperCase()}</h1>
//       <p>This is the {PathName.replace(/-/g, " ")} </p>
//     </>
//   );
// };