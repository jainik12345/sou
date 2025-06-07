import { useParams } from "react-router-dom";
import { StayInTentDropDownData } from "../../StayInTent.js";
import { BookOnline } from "../../../../components/Buttons/BookOnline.jsx";

export const StayInTentDropDownBookOnlineCard = () => {

    const { StayInTentPath } = useParams();

    const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const FormattedData = StayInTentDropDownData[FormattedPath]

    return (

        <>

            <div className="SouTicketsBookingCards-section">

                {FormattedData.BookOnlineCard && FormattedData.BookOnlineCard.map((Val, Idx) => {

                    return (

                        <div className="SouTicketsBookingCards-cont mx-auto max-w-screen-xl flex flex-col py-20 px-10 gap-5" key={Idx}>

                            <h2 className='font-bold text-[2rem] text-orange-color text-center '>{Val.CardHeading}</h2>

                            {

                                Val.CardPara && Val.CardPara.map((ParaVal, ParaIdx) => {

                                    return (

                                        <p className="text-center text-[1rem] font-semibold text-gray-600" key={ParaIdx}>{ParaVal}</p>

                                    )

                                })

                            }

                            <div className="SouTicketsBookingCards-cont grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 ">

                                {Val.CardData && Val.CardData.map((CardVal, CardIdx) => {

                                    return (

                                        <div className="Ticket-Card text-center rounded-2xl shadow-xl/30 flex flex-col p-5 gap-3 relative" key={CardIdx}>

                                            <div className="Card-Img flex justify-center items-center hover:-translate-y-[10px] transition-all ease-in duration-300">

                                                <img src={CardVal.CardImg} alt="IMG" className="h-60 w-100" />

                                            </div>


                                            <div className="package-rates flex flex-col gap-3">

                                                <h2 className="font-bold text-orange-color text-[1.2rem] text-center">{CardVal.CardTitle}</h2>

                                                <h2 className="font-semibold text-gray-600 text-[1rem] text-center">{CardVal.CardPrice}</h2>

                                            </div>

                                            <BookOnline BookOnlineLink={""} />

                                        </div>

                                    )

                                })}

                            </div>

                        </div>
                    )

                })}

            </div >

        </>

    )
}