import { FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


export const ContactIcons = () => {
    return (

        <>

            <div className="contact-icons-section ">


                <div className="max-w-screen-xl mx-auto py-10 px-2 grid md:grid-cols-3 grid-cols-1 gap-5 ">


                    <div className="flex flex-row gap-5 p-5 relative items-start group  w-full rounded-2xl shadow-md/50  transition-all duration-300 ease-in">

                        <div className="absolute top-0 left-0 w-full h-0 bg-orange-color -z-10 transition-all duration-500 ease-in-out group-hover:h-full rounded-2xl"></div>
                        <FaLocationArrow size={30} className="text-orange-color mt-2 group-hover:text-white" />
                        <div className="flex flex-col gap-5 justify-center ">
                            <h2 className="text-black font-semibold text-[1.5rem] group-hover:text-white">Booking Office</h2>
                            <p className="text-gray-500 font-semibold text-[1rem] group-hover:text-white">B-701/702, Pntc, Radio Mirchi Road, Satellite, Ahmedabad
                            </p>
                        </div>
                    </div>


                    <div className="flex flex-row gap-5 p-5 relative items-start group  w-full rounded-2xl shadow-md/50  transition-all duration-300 ease-in">
                        <div className="absolute top-0 left-0 w-full h-0 bg-orange-color -z-10 transition-all duration-500 ease-in-out group-hover:h-full rounded-2xl"></div>
                        <MdEmail size={30} className="text-orange-color mt-2 group-hover:text-white" />
                        <div className="flex flex-col gap-5 justify-center ">
                            <h2 className="text-black font-semibold text-[1.5rem] group-hover:text-white">Email Address</h2>
                            <p className="text-gray-500 font-semibold text-[1rem] group-hover:text-white">booking@aalpine.in</p>
                        </div>
                    </div>


                    <div className="flex flex-row gap-5 p-5 relative items-start group  w-full rounded-2xl shadow-md/50  transition-all duration-300 ease-in">
                            <div className="absolute top-0 left-0 w-full h-0 bg-orange-color -z-10 transition-all duration-500 ease-in-out group-hover:h-full rounded-2xl"></div>
                        <FaPhoneAlt size={30} className="text-orange-color mt-2 group-hover:text-white" />
                        <div className="flex flex-col gap-5 justify-center ">
                            <h2 className="text-black font-semibold text-[1.5rem] group-hover:text-white">Talk to Our Tour Expert</h2>
                            <p className="text-gray-500 font-semibold text-[1rem] group-hover:text-white">+91 7069766966</p>
                        </div>
                    </div>


                </div>


            </div>

        </>
    )
}