import { ContactForm } from "../../../components/ContactForm/ContactForm.jsx";



export const HomePageForm = () => {

    return (
        <>
            

            <div className="form-section py-10">
                <div className="form-title text-center flex flex-col gap-5 mb-10">
                    <h2 className="text-orange-color lg:text-[2.5rem] text-[1.7rem] font-bold">
                        Let’s Plan Your Statue of Unity Tour
                    </h2>
                    <h4 className="text-gray-600 font-semibold lg:text-[1.2rem] text-[1rem] px-5">
                        Share your personal and tour details with us to get the best discounted rates for the
                        Statue of Unity packages.
                    </h4>
                </div>
                <ContactForm />
            </div>

        </>
    )
}

