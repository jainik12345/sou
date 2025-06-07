import bane_bg from "../../assets/images/SouBanner.webp";

export const Banner = ({ Title }) => {
  return (
    <div
      className="p-10 bg-center bg-cover bg-no-repeat "
      style={{
        backgroundImage: `linear-gradient(rgb(58, 58, 65), rgba(65, 58, 58, 0.7)), url(${bane_bg})`,
      }}
    >
      <div className="text-orange-color text-2xl lg:text-3xl font-bold w-full flex items-center justify-center text-center p-4">
        {Title}
      </div>
    </div>
  );
};
