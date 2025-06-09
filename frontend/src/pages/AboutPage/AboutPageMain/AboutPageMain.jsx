// import { MainImgInfo } from "../AboutData.js";
// import { FaAnglesRight } from "react-icons/fa6";

// export const AboutPageMain = () => {
//     return (
//         <>
//             {MainImgInfo.map((Val, Idx) => (
//                 <div
//                     key={Idx}
//                     className="about-heading text-center max-w-screen-xl mx-auto flex flex-col py-10"
//                 >
//                     {/* Heading */}
//                     <h2
//                         className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold font-(family-name:--font-title-font)"
//                     >
//                         Tallest statue in the world
//                     </h2>

//                     <h3 className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold">
//                         Statue Of Unity
//                     </h3>

//                     {/* Image & Description */}
//                     <div className="ImageInfo-section flex md:flex-row flex-col md:items-start items-center md:p-10 p-5 justify-between gap-10">
//                         {/* Image */}
//                         <div className="about-us-img md:w-[50%] w-[80%] flex justify-center">
//                             <img src={Val.ImgUrl} alt="IMG" className="" />
//                         </div>

//                         {/* Description */}
//                         <div className="ImgInfoDesc flex flex-col gap-8 text-justify md:p-5 p-0 h-fit md:w-[60%] w-full">
//                             {/* Paragraphs */}
//                             <div className="desc space-y-4">
//                                 {Val.ImgDesc.map((para, index) => (
//                                     <p key={index} className="font-[400] md:text-[1.1rem] text-[1rem]">
//                                         {para}
//                                     </p>
//                                 ))}
//                             </div>

//                             {/* Improvement List */}
//                             <div className="ImgDescList">
//                                 <div className="list-heading flex flex-col gap-5">


//                                     <ul className="font-[500] md:text-[1.3rem] text-[1rem]">
//                                         {Val.ImgListTitle}
//                                     </ul>


//                                     <div className="list-cont grid grid-cols-2 gap-3 ">

//                                         {Val.ImgLists.map((item, idx) => (
//                                             <li
//                                                 key={idx}
//                                                 className="text-gray-600 font-semibold flex gap-2 items-center lg:text-[1rem] text-[.8rem]"
//                                             >
//                                                 <FaAnglesRight className="text-orange-color" />
//                                                 {item}
//                                             </li>
//                                         ))}

//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };


import { MainImgInfo } from "../AboutData.js";
import { FaAnglesRight } from "react-icons/fa6";

export const AboutPageMain = () => {
    return (
        <>
            {MainImgInfo.map((Val, Idx) => (
                <section
                    key={Idx}
                    className="max-w-screen-xl mx-auto flex flex-col gap-10 py-12 px-3 sm:px-6 lg:px-0"
                >
                    {/* Heading */}
                    <div className="text-center mb-6">
                        <h2 className="text-orange-500 text-2xl md:text-3xl font-black tracking-tight uppercase">
                            Tallest statue in the world
                        </h2>
                        <h3 className="text-orange-400 text-3xl md:text-5xl font-extrabold mt-2 drop-shadow-sm">
                            Statue Of Unity
                        </h3>
                    </div>

                    {/* Image & Description */}
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14 bg-white/90 rounded-3xl shadow-xl border border-orange-100 p-5 md:p-8">
                        {/* Image */}
                        <div className="md:w-1/2 w-full flex justify-center">
                            <img
                                src={Val.ImgUrl}
                                alt="Statue of Unity"
                                className="rounded-2xl shadow-lg border-4 border-orange-100 object-contain max-h-[420px] w-full md:w-auto"
                            />
                        </div>

                        {/* Description & List */}
                        <div className="flex-1 flex flex-col gap-7 md:gap-10 justify-between">
                            {/* Paragraphs */}
                            <div className="space-y-4 text-gray-700 text-justify">
                                {Val.ImgDesc.map((para, index) => (
                                    <p key={index} className="font-normal md:text-lg text-base leading-relaxed">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* List Section */}
                            <div className="mt-3">
                                <div className="font-bold text-orange-600 text-lg mb-3">
                                    {Val.ImgListTitle}
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 pl-2">
                                    {Val.ImgLists.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center gap-2 text-gray-800 font-semibold text-base md:text-lg"
                                        >
                                            <FaAnglesRight className="text-orange-400 text-lg" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
};