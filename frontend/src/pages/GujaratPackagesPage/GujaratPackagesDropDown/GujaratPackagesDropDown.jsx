import { useParams } from "react-router-dom";
import { GujaratPackagesDropDownBanner } from "../GujaratPackagesDropDown/GujaratPackagesDropDownBanner/GujaratPackagesDropDownBanner";
import { GujaratPackagesDropDownCards } from "../GujaratPackagesDropDown/GujaratPackagesDropDownCards/GujaratPackagesDropDownCards";
import { GujaratPackagesDropDownBg } from "../GujaratPackagesDropDown/GujaratPackagesDropDownBg/GujaratPackagesDropDownBg";
import { GujaratPackagesDropDownForm } from "./GujaratPackagesDropDownForm/GujaratPackagesDropDownForm";

export const GujaratPackagesDropDown = () => {

    const { GujaratPath } = useParams();

    if (!GujaratPath) {
        return <h1 className="text-xl text-red-600">Invalid Gujarat Package</h1>;
    }

    // const formattedTitle = pathName
    //     .replace(/-/g, " ")
    //     .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <>
            <GujaratPackagesDropDownBanner />
            <GujaratPackagesDropDownCards />
            <GujaratPackagesDropDownBg />
            <GujaratPackagesDropDownForm />
        </>
    );
};