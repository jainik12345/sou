import BgImg from "../../../../assets/images/gtbg.png";
import axios from "axios";
import BE_URL from "../../../../config";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const StayInTentDropDownBg = () => {
    const [StayInTentBgImg, setStayInTentBgImg] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { StayInTentPath } = useParams();

    useEffect(() => {
        setIsLoading(true);
        setStayInTentBgImg(null);
        setFetchError(null);

        const fetchStayInTentBgImg = async () => {
            try {
                const fetchSouPackagesNames = await axios.get(`${BE_URL}/souPackageName`);
                const findId = fetchSouPackagesNames.data.data && fetchSouPackagesNames.data.data.find((key) => {
                    return (
                        StayInTentPath === key.sou_package_name
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "")
                    );
                });

                if (!findId) {
                    setFetchError("No matching package found.");
                    setStayInTentBgImg(null);
                    setIsLoading(false);
                    return;
                }

                const fetchStayInTentBgSection = await axios.get(`${BE_URL}/souPackageBgImage/package/${findId.id}`);
                if (
                    fetchStayInTentBgSection.status === 200 &&
                    fetchStayInTentBgSection.data.data.length > 0
                ) {
                    setStayInTentBgImg(fetchStayInTentBgSection.data.data[0]);
                    setFetchError(null);
                } else {
                    setFetchError("Failed to load Stay In Tent background image data.");
                    setStayInTentBgImg(null);
                }
            } catch (error) {
                console.error("Unable to fetch Stay In Tent background image data:", error);
                setFetchError("An error occurred while loading data.");
                setStayInTentBgImg(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStayInTentBgImg();
    }, [StayInTentPath]);

    // If loading or there is no data, do not show the section
    if (isLoading || fetchError || !StayInTentBgImg || !StayInTentBgImg.image) {
        return null;
    }

    const bgImageUrl = `${BE_URL}/Images/SouPackage/SouPackageBgImages/${StayInTentBgImg.image}`;

    return (
        <div
            className="w-full h-[250px] bg-fixed overflow-hidden"
            style={{
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        ></div>
    );
};