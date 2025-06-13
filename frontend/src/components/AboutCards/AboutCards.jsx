// import { AboutCardsImgs } from "../../pages/AboutPage/AboutData";
// import { ClickHere } from "../../components/Buttons/ClickHere.jsx";
// import BE_URL from "../../config.js";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional effect

// export const AboutCards = () => {

//     //useState Declarations

//     const [AboutAttractionsCard, setAboutAttractionsCard] = useState(null);
//     const [FetchError, setFetchError] = useState(null);

//     //fetching api here 

//     useEffect(() => {

//         const FetchResponse = async () => {

//             try {

//                 const FetchResponse = await axios.get(`${BE_URL}/aboutAttractionsSection`);

//                 if (FetchResponse.status === 200) {

//                     setAboutAttractionsCard(FetchResponse.data.data);

//                 } else {

//                     console.error("unexpected api status code received:- ", FetchResponse.status);

//                 }

//             } catch (error) {

//                 console.error("Unable To Fetch The About Why Choose Us Section:- ", error);
//                 setFetchError("Unable To Load The Data ");

//             }

//         };

//         FetchResponse();

//     }, []);


//     return (

//         <>
//             <div className="About-Cards-cont grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:p-15 lg:p-5 md:p-10 sm:p-20 p-8 gap-5 max-w-screen-xl mx-auto">

//                 {FetchError && (
//                     <div className="text-center text-red-600 font-semibold text-lg py-10">
//                         {FetchError}
//                     </div>
//                 )}

//                 {
//                     AboutAttractionsCard && AboutAttractionsCard?.map((Val, Idx) => {

//                         return (

//                             <div className="Card-cont shadow-2xl flex flex-col gap-5 items-center p-4  rounded-xl" key={Idx}>

//                                 <div className="card-img">

//                                     <LazyLoadImage src={`${BE_URL}/Images/AboutImages/Attractions/${Val.image}`} alt="IMG" className="h-50" />

//                                 </div>

//                                 <div className="flex flex-col justify-around gap-4 py-5  items-center ">

//                                     <div className="card-title">

//                                         <h2 className="text-orange-color font-bold text-[1.2rem]">{Val.heading}</h2>

//                                     </div>

//                                     <div className="card-desc h-80 overflow-y-auto p-2 flex items-center">

//                                         <p className="text-gray-600 font-semibold text-justify sm:text-[1rem] text-[.9rem]">{Val.description}</p>

//                                     </div>

//                                     <div className="card-button flex justify-center items-center">

//                                         <ClickHere ButtonDirection={"/sou-tickets"} ButtonText={"Click Here"} />

//                                     </div>

//                                 </div>

//                             </div>

//                         )

//                     })

//                 }
//             </div>

//         </>
//     )
// }


//new design
import { ClickHere } from "../../components/Buttons/ClickHere.jsx";
import BE_URL from "../../config.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// Design inspired by user image1, no background gradient, card focus with shadow and white background.

export const AboutCards = () => {
    const [AboutAttractionsCard, setAboutAttractionsCard] = useState([]);
    const [FetchError, setFetchError] = useState(null);

    useEffect(() => {
        const FetchResponse = async () => {
            try {
                const FetchResponse = await axios.get(`${BE_URL}/aboutAttractionsSection`);
                if (FetchResponse.status === 200) {
                    setAboutAttractionsCard(FetchResponse.data.data);
                } else {
                    console.error("unexpected api status code received:- ", FetchResponse.status);
                }
            } catch (error) {
                console.error("Unable To Fetch The About Why Choose Us Section:- ", error);
                setFetchError("Unable To Load The Data ");
            }
        };
        FetchResponse();
    }, []);

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-screen-xl mx-auto px-4 py-12">
            {FetchError && (
                <div className="text-center text-red-600 font-semibold text-lg py-10">
                    {FetchError}
                </div>
            )}
            {AboutAttractionsCard && AboutAttractionsCard.map((Val, Idx) => (
                <div
                    key={Idx}
                    className="bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
                    style={{ minHeight: 430 }}
                >
                    <div className="relative">
                        {/* Badge logic: if Val.badge exists, show badge. */}
                        {Val.badge && (
                            <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-lg z-10 shadow">
                                {Val.badge}
                            </span>
                        )}
                        <LazyLoadImage
                            src={`${BE_URL}/Images/AboutImages/Attractions/${Val.image}`}
                            alt={Val.heading}
                            effect="blur"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col items-center px-6 py-6 flex-1">
                        <h2 className="font-extrabold text-xl text-gray-800 text-center mb-1">
                            {Val.heading}
                        </h2>
                        <div className="w-15 h-1 bg-orange-500 rounded-full my-2"></div>
            
                        {/* Show description if wanted, else hide as per image1 */}
                        {Val.description && (
                            <p className="text-gray-600 text-sm text-justify mb-4">{Val.description}</p>
                        )}
                        <div className="mt-auto w-full flex justify-center">
                            <ClickHere
                                ButtonDirection={Val.buttonUrl || "/sou-tickets"}
                                ButtonText={Val.buttonText || "Book Online"}
                                className="w-full"
                                style={{ minWidth: 120 }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};