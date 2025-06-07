import { NavLink } from "react-router-dom";

export const BookOnline = ({ BookOnlineLink }) => {
  return (
    <>
      <NavLink
        to={BookOnlineLink}
        className="rounded-sm transition-all duration-300 ease-in-out bg-green-color px-5 py-2 text-white border border-transparent hover:border-green-color hover:bg-transparent hover:text-green-color font-semibold xl:text-[1.1rem] lg:text-[.9rem] text-[1rem]"
      >
        Book Online
      </NavLink>
    </>
  );
};
