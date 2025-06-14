import { StayInTentDropDownData } from "../../StayInTent.js";
import { KnowMore } from "../../../../components/Buttons/KnowMore.jsx";
import { useParams } from "react-router-dom";
import axios from "axios";
import BE_URL from "../../../../config.js";
import { useEffect, useState } from "react";


export const StayInTentDropDownBookOnlineLayer = () => {

    //Routing Definations

    const { StayInTentPath } = useParams();

    //useState Declarations

    const [StayInTentDropdownBookLayer, setStayInTentDropdownBookLayer] = useState([]);

    //Fetching API

    useEffect(() => {

        const StayInTentDropDownLayer = async () => {

            try {

                const FetchSouPackagesNames = await axios.get(`${BE_URL}/souPackageName`);
                const findId = FetchSouPackagesNames.data.data && FetchSouPackagesNames.data.data.find((key) => {
                    return (
                        StayInTentPath === key.sou_package_name
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "")
                    );
                });

                const FetchStayInTentBookOnlineLayerData = await axios.get(`${BE_URL}/souPackageBookLayer/package/${findId.id}`);

                if (FetchStayInTentBookOnlineLayerData.status === 200) {

                    setStayInTentDropdownBookLayer(FetchStayInTentBookOnlineLayerData.data.data);

                } else {

                    console.warn("Unexpected response status:", FetchStayInTentBookOnlineLayerData.status);

                }

            } catch (error) {
                console.error(
                    "Unable To Fetch Data Of Stay In Tent Book Online Layer Section:- ",
                    error
                );
            }

        }

        StayInTentDropDownLayer();

    }, [StayInTentPath]);


    return (

        <>
            {

                StayInTentDropdownBookLayer && StayInTentDropdownBookLayer?.map((val, idx) => {


                    return (

                        <div className="bg-gray-200" key={idx}>
                            <div className="flex flex-row max-w-screen-xl mx-auto py-10 px-10 gap-10 items-center justify-between">

                                <p className="text-gray-600  md:text-[1.5rem] text-[.8rem] font-(family-name:--font-layer-font)">{val.title}</p>

                                <div className="flex flex-row gap-5 ">

                                    <KnowMore Text={"Book Now"} />

                                </div>

                            </div>
                        </div>

                    )
                })

            }



        </>

    )
}