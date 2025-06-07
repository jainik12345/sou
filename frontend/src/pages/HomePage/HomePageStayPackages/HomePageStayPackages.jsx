import { HomePageCard } from "../../../components/HomePageCard/HomePageCard.jsx";
import { CardImgs } from "../HomeData.js"

export const HomePageStayPackages = () => {
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

            <div className="cards-cont grid justify-center lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 p-5 gap-5 max-w-screen-xl mx-auto">
                <HomePageCard CardImgs={CardImgs} />
            </div>

        </>
    )
}

