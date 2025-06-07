import { NavLink } from "react-router-dom";

export const KnowMore = ({ KnowMoreLink ,Text}) => {
  return (
    <>
      <NavLink
        to={KnowMoreLink}
        className="rounded-sm transition-all duration-300 ease-in-out bg-orange-color px-5 py-2 text-white border border-transparent hover:border-orange-color hover:bg-transparent hover:text-orange-color font-semibold xl:text-[1.1rem] lg:text-[.9rem] text-[1rem]z "
      >
        {Text}
      </NavLink>
    </>
  );
};
