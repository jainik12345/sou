import { HomePageCard } from "../../../components/HomePageCard/HomePageCard.jsx"
import BE_URL from "../../../config.js"
import axios from "axios"
import { useEffect, useState } from "react"

export const HomePageStayPackages = () => {

    const [HomeStayPackages, setHomeStayPackages] = useState(null);
    const [FetchError, setFetchError] = useState(null);

    useEffect(() => {

        //Function Declared to Fetch API Data

        const FetchHomePageStayPackages = async () => {

            try {

                //Fetching The API Response 

                const FetchResponse = await axios.get(`${BE_URL}/homeSouPackage`);
                const FetchFilteredResponse = FetchResponse.data.data;

                //Checking If Status Code Is 200 Then Data Will Be Stored In useState

                if (FetchResponse.status === 200) {

                    setHomeStayPackages(FetchFilteredResponse);
                    setFetchError(null);

                } else {

                    setFetchError("Failed to load home slider images.");
                    console.warn("Unexpected response status:", FetchResponse.status);

                }

                //Displaying The Error 

            } catch (error) {

                console.error("Unable To Fetch Data Of Home Page Image Slider:- ", error);
                setFetchError("An error occurred while loading home slider images.");

            }

        }

        FetchHomePageStayPackages();

    }, []);

    return (
        <>
            <div className="home-page-card-cont flex justify-center items-center p-5">
                <div className="home-page-card-title max-w-screen-xl flex justify-center items-center flex-col gap-4 text-center my-4">
                    <h2 className="text-orange-color text-4xl font-bold">Statue of Unity Stay Package</h2>
                    <p className="text-grey-text text-base font-semibold w-full">
                        We provide a wide range of Statue of Unity Stay Package for you.
                        All of these tents and resorts are equipped with weather-tented
                        accommodation so that your vacation amidst nature is successful
                        and comfortable.
                    </p>
                </div>
            </div>

            {FetchError && (
                <div className="max-w-screen-xl mx-auto p-4 text-center text-red-500 font-semibold">
                    {FetchError}
                </div>
            )}

            <div className="cards-cont grid justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 p-5 gap-5 max-w-screen-xl mx-auto">
                <HomePageCard HomeStayPackages={HomeStayPackages} />
            </div>
        </>
    )
}

