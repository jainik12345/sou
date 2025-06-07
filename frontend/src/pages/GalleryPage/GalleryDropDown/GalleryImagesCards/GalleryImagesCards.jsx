import { GalleryImgData } from "../../Gallery.js";
import { useParams } from "react-router-dom";
import { GalleryCards } from "../../../../components/GalleryCards/GalleryCards.jsx";

export const GalleryImagesCards = () => {
    const { GalleryPath } = useParams();

    // Convert GalleryPath to match the key format in GalleryImgData
    const formattedGalleryPath = GalleryPath?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const GalleryData = GalleryImgData[formattedGalleryPath];

    // Error handling: If GalleryData is undefined
    if (!GalleryData) {
        return (
            <div className="text-center py-10">
                <h2 className="text-red-500 text-2xl font-semibold">
                    Gallery not found. Please check the URL.
                </h2>
            </div>
        );
    }

    return (
        <>
            <div className="gallery-img-section">
                <div className="gallery-img-cont mx-auto p-10 flex flex-col gap-5">
                    <div className="heading flex flex-col items-center justify-center">
                        <h2 className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold font-(family-name:--font-title-font)">
                            Tallest statue in the world
                        </h2>
                        <h2 className="text-orange-color md:text-[2rem] text-[1.5rem] font-semibold">
                            {formattedGalleryPath}
                        </h2>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center gap-5">
                        <GalleryCards GalleryImgs={GalleryData.Imgs} />
                    </div>
                </div>
            </div>
        </>
    );
};
