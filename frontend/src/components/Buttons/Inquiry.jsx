import { NavLink } from "react-router-dom"

export const Inquiry = ({InquiryLink}) => {
  return (
    
    <>
 
        <NavLink to={InquiryLink} className="rounded-sm transition-all duration-300 ease-in-out bg-green-color px-10 py-2 text-white border border-transparent hover:border-green-color hover:bg-transparent hover:text-green-color font-semibold xl:text-[1.1rem] lg:text-[.9rem] text-[1rem]">Inquiry</NavLink>
    
    </>
  )
}