import { MainImgInfo } from "../AboutData.js";
import { FaAnglesRight } from "react-icons/fa6";

export const AboutPageMain = () => {
    return (
        <>
            {MainImgInfo.map((Val, Idx) => (
                <div
                    key={Idx}
                    className="about-heading text-center max-w-screen-xl mx-auto flex flex-col py-10"
                >
                    {/* Heading */}
                    <h2
                        className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold font-(family-name:--font-title-font)"
                    >
                        Tallest statue in the world
                    </h2>

                    <h3 className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold">
                        Statue Of Unity
                    </h3>

                    {/* Image & Description */}
                    <div className="ImageInfo-section flex md:flex-row flex-col md:items-start items-center md:p-10 p-5 justify-between gap-10">
                        {/* Image */}
                        <div className="about-us-img md:w-[50%] w-[80%] flex justify-center">
                            <img src={Val.ImgUrl} alt="IMG" className="" />
                        </div>

                        {/* Description */}
                        <div className="ImgInfoDesc flex flex-col gap-8 text-justify md:p-5 p-0 h-fit md:w-[60%] w-full">
                            {/* Paragraphs */}
                            <div className="desc space-y-4">
                                {Val.ImgDesc.map((para, index) => (
                                    <p key={index} className="font-[400] md:text-[1.1rem] text-[1rem]">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Improvement List */}
                            <div className="ImgDescList">
                                <div className="list-heading flex flex-col gap-5">


                                    <ul className="font-[500] md:text-[1.3rem] text-[1rem]">
                                        {Val.ImgListTitle}
                                    </ul>


                                    <div className="list-cont grid grid-cols-2 gap-3 ">

                                        {Val.ImgLists.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className="text-gray-600 font-semibold flex gap-2 items-center lg:text-[1rem] text-[.8rem]"
                                            >
                                                <FaAnglesRight className="text-orange-color" />
                                                {item}
                                            </li>
                                        ))}

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
