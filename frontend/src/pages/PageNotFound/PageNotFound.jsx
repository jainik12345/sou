import React from "react";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-200 to-orange-500 text-white font-sans">
      <h1 className="text-[8rem] font-bold leading-none m-0">404</h1>
      <h2 className="text-3xl font-semibold mt-2 mb-2">Page Not Found</h2>
      <p className="text-lg mb-8 text-white/90">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <a
        href="/"
        className="px-7 py-3 bg-white text-orange-600 rounded-full font-bold no-underline shadow-lg hover:bg-orange-50 transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default PageNotFound;
