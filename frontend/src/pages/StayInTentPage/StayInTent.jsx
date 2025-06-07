import { Banner } from "../../components/Banner/Banner";
import { HomePageForm } from "../HomePage/HomePageForm/HomePageForm";
import { HomePageStayPackages } from "../HomePage/HomePageStayPackages/HomePageStayPackages";

export const StayInTent = () => {
  return (

    <>

      <Banner Title={"Best Places To Stay near Statue of Unity"} />

      <HomePageStayPackages/>

      <HomePageForm />

    </>
  );
};
