import { useParams } from "react-router-dom"
import { StayInTentDropDownData } from "../../StayInTent";

export const StayInTentDropDownHerosection = () => {

    const { StayInTentPath } = useParams();

    const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const FormattedData = StayInTentDropDownData[FormattedPath]

    return (

        <>

            <div className="hero-section">

                <div className="hero-cont max-w-screen-xl mx-auto md:px-10 py-20 px-5">

                    {

                        FormattedData.HeroSection && FormattedData.HeroSection.map((Val, Idx) => {

                            return (

                                <div className="flex flex-col gap-5" key={Idx}>
                                    <div className="hero-title text-center">
                                        <h2 className="text-[2rem] font-semibold font-(family-name:--font-title-font) ">{Val.HeroHeading}</h2>
                                        <h2 className="text-[2rem] font-semibold text-orange-color">{Val.HeroTitle}</h2>
                                    </div>

                                    <div className="hero-img flex md:flex-row flex-col justify-center gap-10">

                                        <div className="img md:w-1/2 w-full">

                                            <img src={Val.HeroImg} alt="IMG" className="h-120 w-full" />

                                        </div>

                                        <div className="hero-content flex flex-col gap-5  md:w-1/2 w-full">

                                            <h2 className="text-[1.5rem] font-semibold text-orange-color">{Val.HeroPara.ParaTitle}</h2>

                                            {
                                                Val.HeroPara.Para && Val.HeroPara.Para.map((Val, Idx) => {

                                                    return (


                                                        <p key={Idx} className="md:text-[1rem] text-[.9rem] font-semibold text-gray-600">{Val}</p>


                                                    )

                                                })
                                            }

                                        </div>

                                    </div>
                                </div>
                            )
                        })

                    }

                </div>

            </div>

        </>

    )
}