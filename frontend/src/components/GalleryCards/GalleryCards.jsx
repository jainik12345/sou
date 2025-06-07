import { IoIosSearch } from "react-icons/io";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RiCloseLargeFill } from "react-icons/ri";

export const GalleryCards = ({ GalleryImgs }) => {

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
              setIsImgClickedIdx((prev) => (prev === 0 ? GalleryImgs.length - 1 : prev - 1))
            }
          />

          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <img
              src={GalleryImgs[IsImgClickedIdx]}
              alt="Pop Up Img"
              className="lg:max-h-[80vh] md:max-h-[70vh] max-h-[60vh] rounded-lg"
            />
          </div>

          <IoIosArrowForward
            className="text-5xl text-grey-text cursor-pointer"
            onClick={() =>
              setIsImgClickedIdx((prev) => (prev === GalleryImgs.length - 1 ? 0 : prev + 1))
            }
          />
        </div>
      )}

      {

        GalleryImgs && GalleryImgs.map((val, idx) => {

          return (

            <div className="gallery-card relative group" key={idx} onClick={() => { setIsImgClickedIdx(idx) }}>

              <img src={val} alt="IMG" className="h-60 w-100 rounded-2xl" />
              <div className="absolute top-0 left-0 w-full h-0 bg-black z-10 transition-all duration-500 ease-in-out group-hover:h-full rounded-2xl opacity-50 flex justify-between items-center flex-col gap-5 cursor-pointer group-hover:pt-25 group-hover:pb-2"><IoIosSearch size={30} className="text-white hidden group-hover:block" /><span className="hidden group-hover:block text-white text-[1.2rem]">Cycling</span></div>

            </div>

          )

        })

      }

    </>

  )
}