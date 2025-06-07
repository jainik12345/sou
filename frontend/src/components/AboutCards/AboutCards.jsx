import { AboutCardsImgs } from "../../pages/AboutPage/AboutData";
import { ClickHere } from "../../components/Buttons/ClickHere.jsx";

export const AboutCards = () => {

    return (

        <>
            <div className="About-Cards-cont grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:p-15 lg:p-5 md:p-10 sm:p-20 p-8 gap-5 max-w-screen-xl mx-auto">
                {
                    AboutCardsImgs && AboutCardsImgs.map((Val, Idx) => {

                        return (

                            <div className="Card-cont shadow-2xl flex flex-col gap-5 items-center p-4  rounded-xl" key={Idx}>

                                <div className="card-img">

                                    <img src={Val.CardImgUrl} alt="IMG" className="h-50" />

                                </div>

                                <div className="flex flex-col justify-around gap-4 py-5  items-center ">

                                    <div className="card-title">

                                        <h2 className="text-orange-color font-bold text-[1.2rem]">{Val.CardTitle}</h2>

                                    </div>

                                    <div className="card-desc h-80 overflow-y-auto p-2 flex items-center">

                                        <p className="text-gray-600 font-semibold text-justify sm:text-[1rem] text-[.9rem]">{Val.CardDesc}</p>

                                    </div>

                                    <div className="card-button flex justify-center items-center">

                                        <ClickHere ButtonDirection={"/sou-tickets"} ButtonText={"Click Here"} />

                                    </div>

                                </div>

                            </div>

                        )

                    })

                }
            </div>

        </>
    )
}

