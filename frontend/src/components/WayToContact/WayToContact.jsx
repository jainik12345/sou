import { NavLink } from "react-router-dom";
import { FaAnglesRight } from "react-icons/fa6";

export const WaytoConatct = () => {
  return (
    <>
      <section className=" bg-orange-color">
        <div className="way-to-contact-cont  p-8 flex md:flex-row flex-col gap-5 justify-around items-center max-w-screen-xl mx-auto">
          <div className="way-to-contact-title xl:text-[1.5rem] lg:text-[1.3rem] md:text-[1rem] text-[12px] text-white  font-(family-name:--font-layer-font)">
            <h3>
              Let’s plan to visit tallest statue in the world – Statue of Unity
            </h3>
          </div>

          <div className="way-to-contact-btn text-white after:transition-all duration-500 ease-in-out after:block after:w-full after:h-0.5 after:bg-white after:mt-2 hover:after:w-0">
            <NavLink
              to={"/contact"}
              className="flex justify-between mt-2 items-center gap-5 group xl:text-[1.5rem] lg:text-[1.3rem] md:text-[.9rem] font-(family-name:--font-layer-font)"
            >
              Contact Us
              <FaAnglesRight className="group-hover:translate-x-10 transition-all duration-500 ease-in-out" />
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};
