import { NavLink } from "react-router-dom"
import { KnowMore } from "../../../components/Buttons/KnowMore.jsx";


export const HomePageSouInfo = () => {
    return (

        <>

            <div className="info-section bg-section-background-color">
                <div className="info-cont max-w-screen-xl mx-auto flex flex-col gap-5 py-20">
                    <div className="info-title md:text-[  2rem] text-[1.5rem] font-bold text-orange-color text-center">
                        <h2>Statue of Unity Tent City Online Booking</h2>
                    </div>

                    <div className="info-para1 text-center text-gray-900 font-normal md:text-[1.1rem] text-[.9rem] px-2">
                        <p>
                            Since its inauguration in 2018, the Statue of Unity has become one of the most popular tourist attractions in Gujarat and entire India. People from all over the country visit Kevadia, Gujarat, to get a glimpse of the world’s tallest statue. Around the Statue of Unity, there are various other things to see and places that make for a great vacation spot. If you are planning a family vacation to Kevadia, you would be able to stay in any of the few luxury accommodations. Our Statue of Unity Stay Package is affordable and provides a luxurious stay in close proximity to the Statue of Unity.
                        </p>
                    </div>

                    <div className="info-para2 text-center text-gray-900 font-normal md:text-[1.1rem] text-[.9rem] px-2">
                        <p>
                            Our tents are prepared with high-quality materials, all of which are well structured so that your stay in the
                            <NavLink
                                to="/stay-in-tent/sou-tent-city-1"
                                className="text-orange-color hover:text-orange-700"
                            >
                                Statue of Unity Tent City – 1
                            </NavLink>
                            and
                            <NavLink
                                to="/stay-in-tent/tent-city-narmada-2"
                                className="text-orange-color hover:text-orange-700"
                            >
                                Tent City Narmada – 2
                            </NavLink>
                            is comfortable and equipped with all the modern amenities you require during your vacation. With hundreds of tents and cottages and well-equipped conference halls that can host anywhere between 100 to 1000 guests, these accommodations are the perfect place to stay if you want to ensure that you receive five-star services at an affordable rate.
                        </p>
                    </div>

                    <div className="know-more-btn flex justify-center mt-5">
                        <KnowMore KnowMoreLink={"/about-us"} />
                    </div>
                </div>
            </div>

        </>
    )
}