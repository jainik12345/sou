import { WhyChooseUs } from "../AboutData"

export const AboutChooseUs = () => {
    return (

        <>
            <div className="choose-us-section">

                <div className="choose-us-cont p-5 flex flex-col max-w-screen-xl mx-auto gap-7">

                    <div className="choose-us-title text-center">

                        <h2 className="text-orange-color font-semibold md:text-[2rem] text-[1.3rem]">Why should you Choose Us?</h2>

                    </div>

                    <div className="choose-us-details flex flex-col gap-5 ">

                        {

                            WhyChooseUs.map((Val, Idx) => {

                                return (

                                    <p key={Idx} className="font-[500] lg:text-[1.1rem] text-[1rem] text-gray-500"><span className="font-[500] mr-2 text-orange-color lg:text-[1.3rem] text-[1.1rem]">{Val.Title}:</span>{Val.Para}</p>

                                )

                            })

                        }

                    </div>

                </div>

            </div>
            
        </>

    )
}

