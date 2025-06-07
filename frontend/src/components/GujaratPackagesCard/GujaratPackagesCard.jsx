import { KnowMore } from "../Buttons/KnowMore"
import { Inquiry } from "../Buttons/Inquiry"

export const GujaratPackagesCard = ({CardImg,CardTitle,CardPara}) => {
  return (
   
    <>

        <div className="card-cont p-5 rounded-2xl shadow-xl/30 flex flex-col gap-10">

            <div className="card-img">

                <img src={CardImg}alt="IMG " className="40"/>

            </div>

            <div className="card-desc flex flex-col gap-5">

                <h2 className="font-semibold text-[1.2rem] text-orange-color text-center">{CardTitle}</h2>

                <p className="font-semibold text-[1rem] text-gray-600 text-center">{CardPara}</p>

                <div className="flex gap-5 justify-around">

                    <KnowMore  Text={"Book Now"}/>

                    < Inquiry/>

                </div>

            </div>

        </div>

    </> 

  ) 
}

