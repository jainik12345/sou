// import { useParams } from "react-router-dom"
// import { StayInTentDropDownData } from "../../StayInTent";

// export const StayInTentDropDownHerosection = () => {

//     const { StayInTentPath } = useParams();

//     const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

//     const FormattedData = StayInTentDropDownData[FormattedPath]

//     return (

//         <>

//             <div className="hero-section">

//                 <div className="hero-cont max-w-screen-xl mx-auto md:px-10 py-20 px-5">

//                     {

//                         FormattedData.HeroSection && FormattedData.HeroSection.map((Val, Idx) => {

//                             return (

//                                 <div className="flex flex-col gap-5" key={Idx}>
//                                     <div className="hero-title text-center">
//                                         <h2 className="text-[2rem] font-semibold font-(family-name:--font-title-font) ">{Val.HeroHeading}</h2>
//                                         <h2 className="text-[2rem] font-semibold text-orange-color">{Val.HeroTitle}</h2>
//                                     </div>

//                                     <div className="hero-img flex md:flex-row flex-col justify-center gap-10">

//                                         <div className="img md:w-1/2 w-full">

//                                             <img src={Val.HeroImg} alt="IMG" className="h-120 w-full" />

//                                         </div>

//                                         <div className="hero-content flex flex-col gap-5  md:w-1/2 w-full">

//                                             <h2 className="text-[1.5rem] font-semibold text-orange-color">{Val.HeroPara.ParaTitle}</h2>

//                                             {
//                                                 Val.HeroPara.Para && Val.HeroPara.Para.map((Val, Idx) => {

//                                                     return (

//                                                         <p key={Idx} className="md:text-[1rem] text-[.9rem] font-semibold text-gray-600">{Val}</p>

//                                                     )

//                                                 })
//                                             }

//                                         </div>

//                                     </div>
//                                 </div>
//                             )
//                         })

//                     }

//                 </div>

//             </div>

//         </>

//     )
// }

//Fetching Code

import { useParams } from "react-router-dom";
import { StayInTentDropDownData } from "../../StayInTent";
import BE_URL from "../../../../config";
import axios from "axios";
import { useEffect, useState } from "react";

export const StayInTentDropDownHerosection = () => {
    //Routing Defineded

    const { StayInTentPath } = useParams();

    //useState Definations

    const [StayInTentHeroData, setStayInTentHeroData] = useState(null);
    const [FetchError, setFetchError] = useState(null);

    //Formatting Routing Path

    const FormattedPath = StayInTentPath.toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

    const FormattedData = StayInTentDropDownData[FormattedPath];

    //Fetching API Here

    useEffect(() => {
        //Fetching Function Which Runs Only Once When The Page Gets Reload

        const FetchStayInTentHeroSection = async () => {
            try {
                //Fetching API Of Sou Packages Names

                const FetchSouPackgesNames = await axios.get(
                    `${BE_URL}/souPackageName`
                );

                // Matching Routing Path With The Name Of The All Sou Packages Name And If Both Matches It Will Return That Purticular Matched Data

                const FindId =
                    FetchSouPackgesNames.data.data &&
                    FetchSouPackgesNames.data.data.find((Key) => {
                        return (
                            StayInTentPath ===
                            Key.sou_package_name
                                .toLowerCase()
                                .replace(/\s+/g, "-")
                                .replace(/[^a-z0-9-]/g, "")
                        );
                    });

                //Fetching API Of SouPackages Hero Section

                const FetchHeroSectionResponse = await axios.get(`${BE_URL}/souPackageHeroSection/package/${FindId.id}`);

                // Checking If Status Code Is 200 Then Data Will Be Stored In useState and FetchError Will Be Null Else Error Will Be Display

                if (FetchHeroSectionResponse.status === 200) {
                    setStayInTentHeroData(FetchHeroSectionResponse.data.data);
                    setFetchError(null);
                } else {
                    setFetchError("Failed To Load Stay In Tent Hero Section Data.");
                    console.warn(
                        "Unexpected response status:",
                        FetchHeroSectionResponse.status
                    );
                }

                // If Fetching Has Error Then This Will Be Execute
            } catch (error) {
                console.error(
                    "Unable To Fetch Data Of Stay In Tent Hero Section:- ",
                    error
                );
                setFetchError("An error occurred while loading Data.");
            }
        };

        FetchStayInTentHeroSection();
    }, [StayInTentPath]);

    return (
        <>
            {StayInTentHeroData &&
                StayInTentHeroData?.map((Val, Idx) => {
                    return (
                        <div className="hero-section" key={Idx}>
                            <div className="hero-cont max-w-screen-xl mx-auto md:px-10 py-20 px-5">
                                <div className="flex flex-col gap-5" >
                                    <div className="hero-title text-center">
                                        <h2 className="text-[2rem] font-semibold font-(family-name:--font-title-font) ">
                                            {Val.HeroHeading}
                                        </h2>
                                        <h2 className="text-[2rem] font-semibold text-orange-color">
                                            {Val.HeroTitle}
                                        </h2>
                                    </div>
                                    <div className="hero-img flex md:flex-row flex-col justify-center gap-10">
                                        <div className="img md:w-1/2 w-full">
                                            <img
                                                src={`${BE_URL}/Images/SouPackage/SouPackageHeroSection/${Val.image}`}
                                                alt="IMG"
                                                className="h-120 w-full bg-cover"
                                            />
                                        </div>

                                        <div className="hero-content flex flex-col gap-5  md:w-1/2 w-full">
                                            <h2 className="text-[1.5rem] font-semibold text-orange-color">
                                                {Val.heading}
                                            </h2>

                                            {/* <p key={Idx} className="md:text-[1rem] text-[.9rem] font-semibold text-gray-600">{Val.description}</p> */}

                                            {Val.description.split("\n").map((para, i) => (
                                                <p
                                                    key={i}
                                                    className="md:text-[1rem] text-[.9rem] font-semibold text-gray-600"
                                                >
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};
