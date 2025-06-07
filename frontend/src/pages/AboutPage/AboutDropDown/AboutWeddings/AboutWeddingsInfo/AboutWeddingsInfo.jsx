import { AboutWeddingsData } from "../../../AboutData.js"
import { FiChevronsRight } from "react-icons/fi";
import { ClickHere } from "../../../../../components/Buttons/ClickHere.jsx"

export const AboutWeddingsInfo = () => {
    return (

        <>
            <div className="AboutWeddings-info-section bg-gray-200">

                {
                    AboutWeddingsData && AboutWeddingsData.map((Val, Idx) => {

                        return (

                            <div className="AboutWeddings-cont py-10 relative  max-w-screen-xl mx-auto flex flex-col lg:items-start items-center px-5" key={Idx}>

                                <div>

                                    <img src={Val.ImgUrl} alt="IMG" className="h-150 object-cover" />

                                </div>

                                <div className="AboutWeddings-info-cont flex flex-col  gap-5 p-5 lg:absolute relative lg:right-0  lg:top-40 bg-white rounded-se-3xl rounded-es-3xl lg:w-fit w-[100%]">

                                    {

                                        Val.ImgDescLists && Val.ImgDescLists.map((List, Index) => {

                                            return (

                                                <div className="md:text-[1rem] text-[.8rem] flex font-semibold" key={Index}><FiChevronsRight size={20} className="mr-5 text-orange-color" />{List}</div>

                                            )

                                        })

                                    }

                                    <div className="AboutWedding-info-btn w-fit ps-5">

                                        <ClickHere ButtonText={"Click Here"} />

                                    </div>


                                </div>

                            </div>
                        )

                    })

                }


            </div>

        </>
    )
}