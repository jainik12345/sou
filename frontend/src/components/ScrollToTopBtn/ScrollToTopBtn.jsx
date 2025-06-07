import { IoIosArrowUp } from "react-icons/io";

export const ScrollToTopBtn = () => {
    const HandleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            className="text-white bg-orange-color p-2 rounded-full fixed bottom-8 right-8 z-90 cursor-pointer"
            onClick={HandleBackToTop}
        >
            <IoIosArrowUp size={30} />
        </button>
    );
};
