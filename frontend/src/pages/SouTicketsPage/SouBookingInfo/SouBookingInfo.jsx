import { SouBookingInfoData } from "../SouTicketsData"

export const SouBookingInfo = () => {
    return (

        <>

            <div className="SouBookingInfo-Section">

                <div className="SouBookingInfo-Cont max-w-screen-xl mx-auto md:p-10 flex flex-col gap-5">

                    <h2 className="text-orange-color font-bold text-center text-[2rem]">Statue Of Unity Tickets Online Booking</h2>


                    {SouBookingInfoData && SouBookingInfoData.map((Val, Idx) => {

                        return (

                            <>
                                <div key={Idx} className="flex flex-col gap-5">
                                    <div className="HeadPara">
                                        <p className="text-justify font-semibold text-gray-500 ">{Val.HeadPara}</p>
                                    </div>

                                    <div className="HeadPara2">

                                        {Val.HeadPara2 && Val.HeadPara2.map((HeadPara2Val, HeadPara2Idx) => {

                                            return (

                                                <div className="flex flex-col gap-5 text-justify">

                                                    <h2 className="font-bold text-gray-900 text-left text-[1.2rem]">{HeadPara2Val.HeadParaTitle}</h2>

                                                    <div className="flex flex-col gap-5">{

                                                       HeadPara2Val.HeadPara2Para && HeadPara2Val.HeadPara2Para.map((ParaVal, Index) => {

                                                            return (

                                                                <p className="text-justify font-semibold text-gray-500 " key={Index}>{ParaVal}</p>

                                                            )

                                                        })

                                                    }</div>

                                                </div>

                                            )

                                        })}

                                    </div>

                                    <div className="flex flex-col gap-5">

                                        {Val.BookingInfo && Val.BookingInfo.map((BookingVal, BookingIdx) => {


                                            return (
                                                <div className="Options-section flex flex-col gap-5">

                                                    <h2 className=" text-gray-900 font-bold text-left text-[1.2rem]">{BookingVal.OptionTitle} {BookingVal.id}:</h2>

                                                    <h2 className=" text-gray-900 font-bold text-left text-[1.2rem]">{BookingVal.OptionSubTitel}</h2>

                                                    {

                                                        BookingVal.OptionPara && BookingVal.OptionPara.map((OptionVal, OptionIdx) => {

                                                            return (


                                                                <p className="text-justify font-semibold text-gray-500 " key={OptionIdx}>{OptionVal}</p>

                                                            )

                                                        })

                                                    }
                                                </div>


                                            )


                                        })}

                                    </div>

                                    <div className="Booking Notice flex flex-col gap-5">

                                        {

                                            Val.BookingNotice && Val.BookingNotice.map((NoticeVal, NoticeIdx) => {

                                                return (

                                                    <p className="text-justify font-bold text-gray-800 " key={NoticeIdx}>{NoticeVal}</p>

                                                )


                                            })

                                        }

                                    </div>

                                </div>
                            </>

                        )

                    })}



                </div>

            </div>

        </>

    )
}