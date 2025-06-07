import { StayInTentDropDownData } from "../../StayInTent.js";
import { KnowMore } from "../../../../components/Buttons/KnowMore.jsx";
import { useParams } from "react-router-dom";

export const StayInTentDropDownBookOnlineLayer = () => {


    const { StayInTentPath } = useParams();

    const FormattedPath = StayInTentPath.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const FormattedData = StayInTentDropDownData[FormattedPath].BookOnlineLayer


    return (

        <>

            <div className="bg-gray-200">
                <div className="flex flex-row max-w-screen-xl mx-auto py-10 px-10 gap-10 items-center justify-between">

                    <p className="text-gray-600  md:text-[1.5rem] text-[.8rem] font-(family-name:--font-layer-font)">{FormattedData}</p>

                    <div className="flex flex-row gap-5 ">

                        <KnowMore Text={"Book Now"} />

                    </div>

                </div>
            </div>


        </>

    )
}