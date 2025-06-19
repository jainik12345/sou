import { ContactForm } from "../../../components/ContactForm/ContactForm.jsx";

export const HomePageForm = () => {
  return (
    <>
      <div className="form-section py-10">
        <div className="form-title text-center flex flex-col gap-5 mb-10">
          <h2 className="text-orange-color md:text-3xl text-2xl font-bold">
            Let’s Plan Your Statue of Unity Tour
          </h2>
          <h4 className="text-gray-600 font-semibold md:text-xl text-center text-sm px-5">
            Share your personal and tour details with us to get the best
            discounted rates for the Statue of Unity packages.
          </h4>
        </div>
        <ContactForm />
      </div>
    </>
  );
};
