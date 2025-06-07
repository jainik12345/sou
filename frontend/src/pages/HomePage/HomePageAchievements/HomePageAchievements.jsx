import { ArchivementsImg } from "../HomeData";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";

export const HomePageAchievements = () => {

    const [IsImgClickedIdx, setIsImgClickedIdx] = useState(null);


    return (

        <>

            {IsImgClickedIdx !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-5 gap-4 border backdrop-blur-sm bg-black/70 select-none">
                    <button
                        className="absolute top-4 right-4 text-gray-300 text-3xl z-50 cursor-pointer"
                        onClick={() => setIsImgClickedIdx(null)}
                    >
                        <RiCloseLargeFill />
                    </button>

                    <IoIosArrowBack
                        className="text-5xl text-grey-text cursor-pointer"
                        onClick={() =>
                            setIsImgClickedIdx((prev) => (prev === 0 ? ArchivementsImg.length - 1 : prev - 1))
                        }
                    />

                    <div className="relative bg-white p-4 rounded-lg shadow-lg">
                        <img
                            src={ArchivementsImg[IsImgClickedIdx].ImgUrl}
                            alt="Pop Up Img"
                            className="lg:max-h-[80vh] md:max-h-[70vh] max-h-[60vh] rounded-lg"
                        />
                    </div>

                    <IoIosArrowForward
                        className="text-5xl text-grey-text cursor-pointer"
                        onClick={() =>
                            setIsImgClickedIdx((prev) => (prev === ArchivementsImg.length - 1 ? 0 : prev + 1))
                        }
                    />
                </div>
            )}

            <div className="archivements-section p-20">
                <div className="archivements-heading flex justify-center mb-20">
                    <h2
                        className="lg:text-[5rem] text-[2rem] relative"
                        style={{ fontFamily: "var(--font-heading-font)" }}
                    >
                        <p
                            className="font-bold bg-orange-color h-fit py-2 px-5 text-[1rem] absolute rotate-340 lg:left-[-25px] lg:top-[-5px] top-[-25px] left-[-30px] text-white"
                            style={{ fontFamily: "var(--font-heading-font)" }}
                        >
                            Our
                        </p>
                        ACHIEVEMENTS
                    </h2>
                </div>

                <div className="archivements-cont max-w-screen-xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                    {ArchivementsImg.map((val, idx) => (
                        <img
                            key={idx}
                            src={val.ImgUrl}
                            alt="IMG"
                            className="rounded-2xl shadow-xl/30 cursor-pointer hover:scale-95 transition-all duration-700"
                            onClick={() => setIsImgClickedIdx(idx)}
                        />
                    ))}
                </div>
            </div>

        </>

    )
}

