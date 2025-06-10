// import { useParams } from "react-router-dom"
// import { StayInTentDropDownData } from "../../StayInTent";
// import { BookOnline } from "../../../../components/Buttons/BookOnline";

// export const StayInTentDropDownPackagesCard = () => {

//     const { StayInTentPath } = useParams();

//     const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

//     const FormattedData = StayInTentDropDownData[FormattedPath]?.PackagesBookOnlineCard || [];

//     return (

//         <>

//             <div className="SouTicketsPackagesCards-section">

//                 {FormattedData && FormattedData.map((Val, Idx) => {

//                     return (

//                         <div key={Idx} className="container md:px-10 px-5 md:py-20 py-10 max-w-screen-xl mx-auto flex flex-col gap-20">

//                             <div className="flex flex-col gap-5">

//                                 <h2 className="font-bold text-[2rem] text-orange-color text-center">{Val.CardHeading}</h2>

//                                 {Val.CardPara && Val.CardPara.map((para, paraIdx) => {

//                                     return <p className="text-center text-[1.1rem] font-semibold text-gray-600" key={paraIdx}>{para}</p>

//                                 })}

//                             </div>

//                             <div className="Cp-cont flex flex-col md:flex-row gap-10">

//                                 {Val.package && Val.package.map((pkg, pkgIdx) => {

//                                     return (

//                                         <div className="grid grid-cols-1 gap-20 mx-auto" key={pkgIdx}>

//                                             {pkg.CpData && (
//                                                 <div className="cp-cont w-full flex flex-col gap-3">

//                                                     {pkg.CpData.cp && (

//                                                         <h2 className="text-center font-semibold text-orange-color text-[1.2rem]">{pkg.CpData.cp}</h2>
//                                                     )}


//                                                     <div className="cd-cards grid md:grid-cols-2 grid-cols-1 md:px-10 md:py-10 gap-10">

//                                                         {pkg.CpData.CpCardData && pkg.CpData.CpCardData.map((Card, CardIdx) => {

//                                                             return (

//                                                                 <div className="cd-card rounded-2xl shadow-xl/30 flex flex-col p-5 gap-5 items-center" key={CardIdx}>

//                                                                     {Card.Weeks && (
//                                                                         <h2 className="text-center font-semibold text-orange-color">
//                                                                             {Card.Weeks}
//                                                                         </h2>
//                                                                     )}
//                                                                     <img src={Card.CardImg} alt="" className="h-60 w-100" />
//                                                                     <div className="flex flex-col gap-5 text-center">
//                                                                         <p className="font-bold text-orange-color text-[1.2rem] text-center">{Card.CardTitle}</p>
//                                                                         <p className="font-semibold text-gray-600 text-[1rem] text-center">{Card.CardPrice}</p>
//                                                                         {
//                                                                             Card.CardExtra && (
//                                                                                 <p className="font-semibold text-gray-600 text-[1rem] text-center">{Card.CardExtra}</p>
//                                                                             )

//                                                                         }

//                                                                         <BookOnline />


//                                                                     </div>
//                                                                 </div>

//                                                             );

//                                                         })}

//                                                     </div>
//                                                 </div>

//                                             )}

//                                             {
//                                                 pkg.MapData && (

//                                                     <div className="map-cont w-full flex flex-col gap-3">

//                                                         {pkg.MapData.Map && (

//                                                             <h2 className="text-center font-semibold text-orange-color text-[1.2rem]">{pkg.MapData.Map}</h2>

//                                                         )}

//                                                         <div className="map-cards grid md:grid-cols-2 grid-cols-1 md:px-10 md:py-10 gap-10">

//                                                             {pkg.MapData.MapCardData && pkg.MapData.MapCardData.map((Card, CardIdx) => {

//                                                                 return (

//                                                                     <div className="cd-card rounded-2xl shadow-xl/30 flex flex-col p-5 gap-5 items-center" key={CardIdx}>

//                                                                         {Card.Weeks && (
//                                                                             <h2 className="text-center font-semibold text-orange-color">
//                                                                                 {Card.Weeks}
//                                                                             </h2>
//                                                                         )}

//                                                                         <img src={Card.CardImg} alt="IMG" className="h-60 w-100" />
//                                                                         <div className="flex flex-col gap-5 text-center" >

//                                                                             <p className="font-bold text-orange-color text-[1.2rem] text-center">{Card.CardTitle}</p>
//                                                                             <p className="font-semibold text-gray-600 text-[1rem] text-center">{Card.CardPrice}</p>
//                                                                             {
//                                                                                 Card.CardExtra && (
//                                                                                     <p className="font-semibold text-gray-600 text-[1rem] text-center">{Card.CardExtra}</p>
//                                                                                 )

//                                                                             }
//                                                                             <BookOnline />

//                                                                         </div>
//                                                                     </div>

//                                                                 );

//                                                             })}

//                                                         </div>
//                                                     </div>
//                                                 )

//                                             }

//                                         </div>


//                                     )

//                                 })}

//                             </div>


//                         </div>

//                     )

//                 })}

//             </div>

//         </>

//     )
// }
import { useParams } from "react-router-dom";
import { StayInTentDropDownData } from "../../StayInTent";
import { BookOnline } from "../../../../components/Buttons/BookOnline";

export const StayInTentDropDownPackagesCard = () => {
    const { StayInTentPath } = useParams();
    const FormattedPath = StayInTentPath
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    const FormattedData =
        StayInTentDropDownData[FormattedPath]?.PackagesBookOnlineCard || [];

    // If there is no data, don't render the section
    if (!Array.isArray(FormattedData) || FormattedData.length === 0) {
        return null;
    }

    return (
        <section className="w-full bg-white py-16">
            {FormattedData.map((Val, Idx) => (
                <div
                    key={Idx}
                    className="max-w-screen-xl mx-auto mb-16 px-4 md:px-8 flex flex-col gap-10"
                >
                    {/* Heading */}
                    <div className="mb-6">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-3 tracking-tight">
                            <span className="text-orange-500">{Val.CardHeading}</span>
                        </h2>
                        {Val.CardPara &&
                            Val.CardPara.map((para, paraIdx) => (
                                <p
                                    className="text-center text-lg md:text-xl font-medium text-gray-700"
                                    key={paraIdx}
                                >
                                    {para}
                                </p>
                            ))}
                    </div>

                    {/* Packages */}
                    <div className="flex flex-col gap-12">
                        {Val.package &&
                            Val.package.map((pkg, pkgIdx) => (
                                <div key={pkgIdx} className="flex flex-col gap-8">
                                    {/* CpData Cards */}
                                    {pkg.CpData && (
                                        <div className="w-full flex flex-col gap-4">
                                            {pkg.CpData.cp && (
                                                <h3 className="text-center font-bold text-2xl text-gray-900 mb-4">
                                                    {pkg.CpData.cp}
                                                </h3>
                                            )}
                                            <div className="grid sm:grid-cols-2  lg:grid-cols-2 gap-8">
                                                {pkg.CpData.CpCardData &&
                                                    pkg.CpData.CpCardData.map((Card, CardIdx) => (
                                                        <div
                                                            className="relative group bg-white border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex flex-col items-center p-0 overflow-hidden"
                                                            key={CardIdx}
                                                        >
                                                            {/* Image */}
                                                            <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-50 overflow-hidden">
                                                                <img
                                                                    src={Card.CardImg}
                                                                    alt={Card.CardTitle}
                                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            {/* Card Body */}
                                                            <div className="flex flex-col items-center gap-2 w-full px-6 py-7">
                                                                {Card.Weeks && (
                                                                    <span className="absolute left-4 top-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                                                        {Card.Weeks}
                                                                    </span>
                                                                )}
                                                                <h4 className="font-bold text-lg text-gray-900 text-center mb-1">
                                                                    {Card.CardTitle}
                                                                </h4>
                                                                <div className="flex items-center gap-2 my-1">
                                                                    <span className="bg-orange-100 text-orange-600 font-bold rounded px-3 py-1 text-base">
                                                                        {Card.CardPrice}
                                                                    </span>
                                                                    {Card.CardExtra && (
                                                                        <span className="text-gray-500 font-medium text-sm">
                                                                            {Card.CardExtra}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="mt-4 w-full flex justify-center">
                                                                    <BookOnline />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* MapData Cards */}
                                    {pkg.MapData && (
                                        <div className="w-full flex flex-col gap-4">
                                            {pkg.MapData.Map && (
                                                <h3 className="text-center font-bold text-2xl text-gray-900 mb-4">
                                                    {pkg.MapData.Map}
                                                </h3>
                                            )}
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
                                                {pkg.MapData.MapCardData &&
                                                    pkg.MapData.MapCardData.map((Card, CardIdx) => (
                                                        <div
                                                            className="relative group bg-white border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex flex-col items-center p-0 overflow-hidden"
                                                            key={CardIdx}
                                                        >
                                                            {/* Image */}
                                                            <div className="w-full aspect-[4/3] flex items-center justify-center bg-gray-50 overflow-hidden">
                                                                <img
                                                                    src={Card.CardImg}
                                                                    alt={Card.CardTitle}
                                                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                                                />
                                                            </div>
                                                            {/* Card Body */}
                                                            <div className="flex flex-col items-center gap-2 w-full px-6 py-7">
                                                                {Card.Weeks && (
                                                                    <span className="absolute left-4 top-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                                                        {Card.Weeks}
                                                                    </span>
                                                                )}
                                                                <h4 className="font-bold text-lg text-gray-900 text-center mb-1">
                                                                    {Card.CardTitle}
                                                                </h4>
                                                                <div className="flex items-center gap-2 my-1">
                                                                    <span className="bg-orange-100 text-orange-600 font-bold rounded px-3 py-1 text-base">
                                                                        {Card.CardPrice}
                                                                    </span>
                                                                    {Card.CardExtra && (
                                                                        <span className="text-gray-500 font-medium text-sm">
                                                                            {Card.CardExtra}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <div className="mt-4 w-full flex justify-center">
                                                                    <BookOnline />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </section>
    );
};