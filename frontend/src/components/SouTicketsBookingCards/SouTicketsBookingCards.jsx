import { BookOnline } from "../Buttons/BookOnline";

export const SouTicketsBookingCards = ({ CardTitle, CardImg, PerAdultPrice, PerChildPrice, notice, Idx }) => {
    return (

        <>

            <div className="Ticket-Card text-center rounded-2xl shadow-xl/30 flex flex-col p-5 gap-3 relative" key={Idx}>

                <h2 className="font-bold text-orange-color md:text-[1.2rem] text-[1rem]">{CardTitle}</h2>

                <div className="Card-Img flex justify-center items-center ">

                    <img src={CardImg} alt="IMG" className="h-60 w-100" />

                </div>


                <div className="package-rates grid grid-col-2 gap-3 p-3">

                    <h2 className="font-bold text-orange-color text-[1.2rem] text-center w-full col-span-2">Package Rates:</h2>

                    <h2 className="font-bold text-gray-600 text-[1rem]">Per Adult :- {PerAdultPrice}</h2>

                    <h2 className="font-bold text-gray-600 text-[1rem]">Per Child :- {PerChildPrice}</h2>

                </div>

                <BookOnline BookOnlineLink={""}/>

                {notice && (
                    <p className={`font-semibold text-[1.1rem] text-red-600 text-justify absolute animate-gradient-text -top-1 left-[20%] ${notice ? 'block' : 'hidden'}`}>{notice}</p>
                )}

            </div>

        </>

    )
}