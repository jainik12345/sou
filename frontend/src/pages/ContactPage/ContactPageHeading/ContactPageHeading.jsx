import { IoMdInformationCircle } from "react-icons/io";


export const ContactPageHeading = () => {

    return (

        <>

            <div className="ContactPageHeading-section bg-gray-100">


                <div className="ContactPageHeading-cont max-w-screen-xl mx-auto p-10 flex lg:flex-row flex-col justify-center items-center gap-5">


                    <div className="flex flex-col gap-5  relative">

                        <h4 className="sm:text-[1rem] text-[1rem] font-bold text-gray-600 ml-14">Contact us only for resort booking</h4>

                        <h2 className="sm:text-[1.8rem] text-[1.4rem] text-orange-color font-bold flex justify-center items-start "><IoMdInformationCircle size={35} className="mr-5 mt-1" />We only provide SOU Resort Booking</h2>

                    </div>

                    <div>

                        <p className="text-[1rem] font-semibold text-gray-600">A Unit of Aalpine Holiday Nagari India Pvt. Ltd. – Official Booking Partner of Statue Of Unity Tourism</p>

                    </div>

                </div>

            </div>

        </>

    )
}