import { GujaratPackagesCardData } from "../GujaratPackagesData";
import { GujaratPackagesCard } from "../../../components/GujaratPackagesCard/GujaratPackagesCard";

export const GujaratPackagesCards = () => {
    return (

        <>

            <div className="cards-section">

                <div className="cards-cont max-w-screen-xl mx-auto p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">

                    {

                        GujaratPackagesCardData && GujaratPackagesCardData.map((CardVal,CardIdx)=>{


                            return(

                                <GujaratPackagesCard CardImg={CardVal.CardImg} CardTitle={CardVal.CardTitle} CardPara={CardVal.CardPara} key={CardIdx}/>

                            )   

                        })

                    }

                </div>

            </div>

        </>

    )
}

export default GujaratPackagesCards
