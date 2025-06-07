import { Banner } from "../../components/Banner/Banner";
import { HomePageForm } from "../HomePage/HomePageForm/HomePageForm";
import { ContactPageHeading } from "./ContactPageHeading/ContactPageHeading";
import { ContactIcons } from "./ContactIcons/ContactIcons";
import { ContactMap } from "./ContactMap/ContactMap";

export const Contact = () => {


    return (

        <>

            <Banner Title={"Contact Us"} />

            <HomePageForm />
            
            <ContactPageHeading/>

            <ContactIcons/>

            <ContactMap/>

        </>

    )
}