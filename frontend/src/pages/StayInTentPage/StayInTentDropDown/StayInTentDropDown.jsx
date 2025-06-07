import { useParams } from "react-router-dom";
import { StayInTentDropDownBanner } from "./StayInTentDropDownBanner/StayInTentDropDownBanner";
import { StayInTentDropDownHerosection } from "./StayInTentDropDownHerosection/StayInTentDropDownHerosection";
import { StayInTentDropDownBg } from "./StayInTentDropDownBg/StayInTentDropDownBg";
import { StayInTentDropDownBookOnlineCard } from "./StayInTentDropDownBookOnlineCard/StayInTentDropDownBookOnlineCard";
import { StayInTentDropDownBookOnlineLayer } from "./StayInTentDropDownBookOnlineLayer/StayInTentDropDownBookOnlineLayer";
import { StayInTentDropDownFaq } from "./StayInTentDropDownFaq/StayInTentDropDownFaq";
import { HomePageForm } from "../../HomePage/HomePageForm/HomePageForm";
import { StayInTentDropDownNoticePolicy } from "./StayInTentDropDownNoticePolicy/StayInTentDropDownNoticePolicy";
import { StayInTentDropDownTestimonial } from "./StayInTentDropDownTestimonial/StayInTentDropDownTestimonial";
import { StayInTentDropDownIcons } from "./StayInTentDropDownIcons/StayInTentDropDownIcons";
import { StayInTentDropDownPackagesCard } from "./StayInTentDropDownPackagesCard/StayInTentDropDownPackagesCard";

export const StayInTentDropDown = () => {

    const { StayInTentPath } = useParams();

    if (!StayInTentPath) {

        return <h1 className="text-xl text-red-600">Invalid Gujarat Package</h1>;

    }

    return (

        <>

            <StayInTentDropDownBanner />
            <StayInTentDropDownHerosection />
            <StayInTentDropDownBg />
            <StayInTentDropDownBookOnlineCard />
            <StayInTentDropDownBookOnlineLayer />
            <StayInTentDropDownPackagesCard />
            <StayInTentDropDownTestimonial />
            <StayInTentDropDownIcons />
            <StayInTentDropDownNoticePolicy />
            <StayInTentDropDownFaq />
            <HomePageForm />

        </>

    );

}