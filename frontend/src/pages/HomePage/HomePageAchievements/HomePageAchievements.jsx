import { useEffect, useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";
import axios from "axios";
import BE_URL from "../../../config";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Optional effect

export const HomePageAchievements = () => {
    const [IsImgClickedIdx, setIsImgClickedIdx] = useState(null);
    const [ArchivementsData, setArchivementsData] = useState(null);
    const [FetchError, setFetchError] = useState(null);

    useEffect(() => {
        const FetchArchivementsImgs = async () => {
            try {
                const FetchResponse = await axios.get(`${BE_URL}/homeCertificate`);
                if (FetchResponse.status === 200) {
                    setArchivementsData(FetchResponse.data.data[0].images);
                } else {
                    setFetchError("Failed to load archivements section.");
                    console.warn("Unexpected response status:", FetchResponse.status);
                }
            } catch (error) {
                console.error("Unable To Fetch Data Of Archivements Section :- ", error);
                setFetchError("An error occurred while loading Archivements section.");
            }
        }
        FetchArchivementsImgs();
    }, [])

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
                            setIsImgClickedIdx((prev) => (prev === 0 ? ArchivementsData.length - 1 : prev - 1))
                        }
                    />

                    <div className="relative bg-white p-4 rounded-lg shadow-lg flex items-center justify-center"
                        style={{ width: "80vw", height: "80vh", maxWidth: 900, maxHeight: 700 }}>
                        <LazyLoadImage
                            src={`${BE_URL}/Images/HomeImages/HomeCertificate/${ArchivementsData[IsImgClickedIdx]}`}
                            alt="Pop Up Img"
                            className="w-full h-full object-cover rounded-lg"
                            style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                    </div>

                    <IoIosArrowForward
                        className="text-5xl text-grey-text cursor-pointer"
                        onClick={() =>
                            setIsImgClickedIdx((prev) => (prev === ArchivementsData.length - 1 ? 0 : prev + 1))
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
                    {ArchivementsData?.map((val, idx) => (
                        <LazyLoadImage
                            key={idx}
                            src={`${BE_URL}/Images/HomeImages/HomeCertificate/${val}`}
                            alt="IMG"
                            className="rounded-2xl shadow-xl/30 cursor-pointer h-60 w-full object-cover hover:scale-95 transition-all duration-700"
                            onClick={() => setIsImgClickedIdx(idx)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

