import { FaTent } from "react-icons/fa6";
import { BiDish } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { FaWifi } from "react-icons/fa6";
import { FaSwimmingPool } from "react-icons/fa";
import { TbTreadmill } from "react-icons/tb";
import { GiTheater } from "react-icons/gi";
import { useParams } from "react-router-dom"
import { StayInTentDropDownData } from "../../StayInTent";

export const StayInTentDropDownIcons = () => {


    const { StayInTentPath } = useParams();

    const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const FormattedData = StayInTentDropDownData[FormattedPath].FacilitiesIcons || [];


    return (

        <>

            <div className="facilities-section bg-gray-100">

                {FormattedData?.FacilitiesHeader || FormattedData?.FacilitiesPara ? (

                    <div className="container max-w-screen-xl mx-auto py-20 px-10 flex flex-col gap-10 ">

                        <div className="header flex flex-col gap-5">
                            <h1 className="text-[2rem] text-orange-color font-(family-name:--font-layer-font) text-center ">{FormattedData?.FacilitiesHeader}</h1>
                            <p className="text-center text-gray-700 font-medium text-[1.1rem]">{FormattedData?.FacilitiesPara}</p>
                        </div>


                        <div className="icons-container"> {/*SoU Tent City 1 */}

                            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-5">

                                {FormattedPath === "sou-tent-city-1" ? (

                                    <>

                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaCar className="icon-item bg-white shadow-md  rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Free Parking</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <IoRestaurantOutline className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Dining Hall</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaWifi className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Free WiFi</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaSwimmingPool className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Swimming Pool</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <TbTreadmill className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Gymnasium</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <GiTheater className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Multi-Utility Hall</p>
                                        </div>

                                    </>

                                ) : FormattedPath === "unity-village-resort" ? (

                                    <>

                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaCar className="icon-item bg-white shadow-md  rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Free Parking</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <IoRestaurantOutline className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Dining Hall</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaWifi className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Free WiFi</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaSwimmingPool className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Swimming Pool</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <TbTreadmill className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Gymnasium</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <GiTheater className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Multi-Utility Hall</p>
                                        </div>

                                    </>

                                ) : FormattedPath === "nirvana-resort-restaurant" ? (

                                    <>

                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaCar className="icon-item bg-white shadow-md  rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Free Parking</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <IoRestaurantOutline className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Dining Hall</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaWifi className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Free WiFi</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <FaSwimmingPool className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Swimming Pool</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <TbTreadmill className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Gymnasium</p>
                                        </div>
                                        <div className="flex flex-col items-center justify-center gap-5">
                                            <GiTheater className="icon-item bg-white shadow-md rounded-lg text-[10rem] p-5 hover:bg-orange-color transition-all duration-200 ease-in hover:text-white flex flex-col items-center justify-center" />
                                            <p className="text-[1.2rem] font-semibold text-gray-600">Multi-Utility Hall</p>
                                        </div>

                                    </>

                                ) : null}

                            </div>

                        </div>

                    </div>


                ) : (null)}

            </div>

        </>

    )
}