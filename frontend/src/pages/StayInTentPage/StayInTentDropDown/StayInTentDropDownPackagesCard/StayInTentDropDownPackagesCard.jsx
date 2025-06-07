import { useParams } from "react-router-dom"
import { StayInTentDropDownData } from "../../StayInTent";
import { BookOnline } from "../../../../components/Buttons/BookOnline";

export const StayInTentDropDownPackagesCard = () => {

    const { StayInTentPath } = useParams();

    const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const FormattedData = StayInTentDropDownData[FormattedPath]?.PackagesBookOnlineCard || [];

    return (

        <>

            <div className="SouTicketsPackagesCards-section">

                {FormattedData && FormattedData.map((Val, Idx) => {

                    return (

                        <div key={Idx} className="container md:px-10 px-5 md:py-20 py-10 max-w-screen-xl mx-auto flex flex-col gap-20">

                            <div className="flex flex-col gap-5">

                                <h2 className="font-bold text-[2rem] text-orange-color text-center">{Val.CardHeading}</h2>

                                {Val.CardPara && Val.CardPara.map((para, paraIdx) => {

                                    return <p className="text-center text-[1.1rem] font-semibold text-gray-600" key={paraIdx}>{para}</p>

                                })}

                            </div>

                            <div className="Cp-cont flex flex-col md:flex-row gap-10">

                                {Val.package && Val.package.map((pkg, pkgIdx) => {

                                    return (

                                        <div className="grid grid-cols-1 gap-20 mx-auto" key={pkgIdx}>

                                            {pkg.CpData && (
                                                <div className="cp-cont w-full flex flex-col gap-3">

                                                    {pkg.CpData.cp && (

                                                        <h2 className="text-center font-semibold text-orange-color text-[1.2rem]">{pkg.CpData.cp}</h2>
                                                    )}


                                                    <div className="cd-cards grid md:grid-cols-2 grid-cols-1 md:px-10 md:py-10 gap-10">

                                                        {pkg.CpData.CpCardData && pkg.CpData.CpCardData.map((Card, CardIdx) => {

                                                            return (

                                                                <div className="cd-card rounded-2xl shadow-xl/30 flex flex-col p-5 gap-5 items-center" key={CardIdx}>

                                                                    {Card.Weeks && (
                                                                        <h2 className="text-center font-semibold text-orange-color">
                                                                            {Card.Weeks}
                                                                        </h2>
                                                                    )}
                                                                    <img src={Card.CardImg} alt="" className="h-60 w-100" />
                                                                    <div className="flex flex-col gap-5 text-center">
                                                                        <p className="font-bold text-orange-color text-[1.2rem] text-center">{Card.CardTitle}</p>
                                                                        <p className="font-semibold text-gray-600 text-[1rem] text-center">{Card.CardPrice}</p>
                                                                        {
                                                                            Card.CardExtra && (
                                                                                <p className="font-semibold text-gray-600 text-[1rem] text-center">{Card.CardExtra}</p>
                                                                            )

                                                                        }

                                                                        <BookOnline />


                                                                    </div>
                                                                </div>

                                                            );

                                                        })}

                                                    </div>
                                                </div>

                                            )}

                                            {
                                                pkg.MapData && (

                                                    <div className="map-cont w-full flex flex-col gap-3">

                                                        {pkg.MapData.Map && (

                                                            <h2 className="text-center font-semibold text-orange-color text-[1.2rem]">{pkg.MapData.Map}</h2>

                                                        )}

                                                        <div className="map-cards grid md:grid-cols-2 grid-cols-1 md:px-10 md:py-10 gap-10">

                                                            {pkg.MapData.MapCardData && pkg.MapData.MapCardData.map((Card, CardIdx) => {

                                                                return (

                                                                    <div className="cd-card rounded-2xl shadow-xl/30 flex flex-col p-5 gap-5 items-center" key={CardIdx}>

                                                                        {Card.Weeks && (
                                                                            <h2 className="text-center font-semibold text-orange-color">
                                                                                {Card.Weeks}
                                                                            </h2>
                                                                        )}

                                                                        <img src={Card.CardImg} alt="IMG" className="h-60 w-100" />
                                                                        <div className="flex flex-col gap-5 text-center" >

                                                                            <p className="font-bold text-orange-color text-[1.2rem] text-center">{Card.CardTitle}</p>
                                                                            <p className="font-semibold text-gray-600 text-[1rem] text-center">{Card.CardPrice}</p>
                                                                            {
                                                                                Card.CardExtra && (
                                                                                    <p className="font-semibold text-gray-600 text-[1rem] text-center">{Card.CardExtra}</p>
                                                                                )

                                                                            }
                                                                            <BookOnline />

                                                                        </div>
                                                                    </div>

                                                                );

                                                            })}

                                                        </div>
                                                    </div>
                                                )

                                            }

                                        </div>


                                    )

                                })}

                            </div>


                        </div>

                    )

                })}

            </div>

        </>

    )
}