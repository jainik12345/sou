// import { FaAnglesRight } from "react-icons/fa6";
// import { StayInTentDropDownData } from "../../StayInTent";
// import { useParams } from "react-router-dom";

// export const StayInTentDropDownNoticePolicy = () => {
//     const { StayInTentPath } = useParams();

//     const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
//     const FormattedData = StayInTentDropDownData[FormattedPath];

//     return (

//         <div className="flex flex-col gap-20 max-w-screen-xl mx-auto md:py-20 py-10 px-5 md:px-10">

//             <div className="notice-section flex flex-col gap-5">

//                 {FormattedData?.Notice?.NoticeData && (

//                     <>

//                         <h1 className="before:content-[''] before:block md:before:w-30 before:w-20 before:text-orange-color before:border-2 w-fit md:text-[2.5rem] text-[1.5rem] text-gray-800 font-medium">
//                             {FormattedData.Notice.NoticeHeader}
//                         </h1>
//                         <div className="flex flex-col gap-5">
//                             {FormattedData.Notice.NoticeData.map((Val, Idx) => (
//                                 <p className="flex gap-5 items-center text-gray-600 font-semibold md:text-[1rem] text-[.8rem]" key={Idx}>
//                                     <FaAnglesRight className="text-orange-color" />
//                                     {Val}
//                                 </p>
//                             ))}
//                         </div>
                        
//                     </>
//                 )}

//             </div>

//             <div className="policy-section flex flex-col gap-5">

//                 {FormattedData?.Policy?.PolicyData && (
//                     <>
//                         <h1 className="before:content-[''] before:block md:before:w-30 before:w-20 before:text-orange-color before:border-2 w-fit md:text-[2.5rem] text-[1.5rem] text-gray-800 font-medium">
//                             {FormattedData.Policy.PolicyHeader}
//                         </h1>
//                         <div className="flex flex-col gap-5">
//                             {FormattedData.Policy.PolicyData.map((Val, Idx) => (
//                                 <p className="flex gap-5 items-center text-gray-600 font-semibold md:text-[1rem] text-[.8rem]" key={Idx}>
//                                     <FaAnglesRight className="text-orange-color" />
//                                     {Val}
//                                 </p>
//                             ))}


                            
//                         </div>
//                     </>


//                 )}

//             </div>

//         </div>
        
//     );
// };


import { FaAnglesRight } from "react-icons/fa6";
import { StayInTentDropDownData } from "../../StayInTent";
import { useParams } from "react-router-dom";

export const StayInTentDropDownNoticePolicy = () => {
    const { StayInTentPath } = useParams();
    const FormattedPath = StayInTentPath
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    const FormattedData = StayInTentDropDownData[FormattedPath];

    return (
        <div className="max-w-screen-xl mx-auto py-12 px-4 flex flex-row gap-10">
            {/* Notice Section */}
            {FormattedData?.Notice?.NoticeData && (
                <section className="bg-orange-50 shadow-lg rounded-xl p-8 flex flex-col gap-6 border-t-4 border-orange-400">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-orange-400 rounded-full text-white text-2xl shadow">
                            <FaAnglesRight />
                        </div>
                        <h2 className="text-2xl font-bold text-orange-700 tracking-wide">
                            {FormattedData.Notice.NoticeHeader}
                        </h2>
                    </div>
                    <ul className="flex flex-col gap-4 pl-3">
                        {FormattedData.Notice.NoticeData.map((Val, Idx) => (
                            <li key={Idx} className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center bg-orange-200 rounded-full text-orange-600 text-lg">
                                    <FaAnglesRight />
                                </span>
                                <span className="text-gray-800 text-base font-medium">{Val}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Policy Section */}
            {FormattedData?.Policy?.PolicyData && (
                <section className="bg-blue-50 shadow-lg rounded-xl p-8 flex flex-col gap-6 border-t-4 border-blue-400">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full text-white text-2xl shadow">
                            <FaAnglesRight />
                        </div>
                        <h2 className="text-2xl font-bold text-blue-700 tracking-wide">
                            {FormattedData.Policy.PolicyHeader}
                        </h2>
                    </div>
                    <ul className="flex flex-col gap-4 pl-3">
                        {FormattedData.Policy.PolicyData.map((Val, Idx) => (
                            <li key={Idx} className="flex items-center gap-3">
                                <span className="w-6 h-6 flex items-center justify-center bg-blue-200 rounded-full text-blue-600 text-lg">
                                    <FaAnglesRight />
                                </span>
                                <span className="text-gray-800 text-base font-medium">{Val}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};