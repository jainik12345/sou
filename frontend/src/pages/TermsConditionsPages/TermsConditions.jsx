// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import axios from "axios";
// import BE_URL from "../../config";

// const TermsConditions = () => {
//   const [terms, setTerms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     axios
//       .get(`${BE_URL}/termsConditions`)
//       .then((res) => {
//         setTerms(res.data.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(
//           err.response?.data?.error || "Failed to fetch terms & conditions"
//         );
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="bg-[#f9f6f1] text-[#333] px-4 py-12 md:px-12 lg:px-36">
//       <div className="max-w-screen-xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-12 animate-fadeIn">
//         <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
//           Terms & Conditions
//         </h2>

//         <div className="space-y-6 text-justify text-gray-700 leading-relaxed">
//           {loading && <p>Loading...</p>}
//           {error && <p className="text-red-500">{error}</p>}
//           {!loading && !error && terms.length === 0 && (
//             <p>No terms & conditions found.</p>
//           )}
//           {!loading &&
//             !error &&
//             terms.map((term) => <p key={term.id}>{term.text}</p>)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsConditions;

/* */

/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import BE_URL from "../../config";
import { motion, useInView } from "framer-motion";

const TermsConditions = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const contentRef = useRef(null);
  const inView = useInView(contentRef, { once: true });

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get(`${BE_URL}/termsConditions`)
      .then((res) => {
        setTerms(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          err.response?.data?.error || "Failed to fetch terms & conditions"
        );
        setLoading(false);
      });
  }, []);

  const maxHeight = expanded ? "none" : "350px"; 
  const shouldShowToggle = terms.length > 0 && !expanded;

  return (
    <div className="bg-[#f9f6f1] text-[#333] px-3 py-12 md:px-5 lg:px-12">
      <motion.div
        className="max-w-[1440px] mx-auto bg-white shadow-md rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        ref={contentRef}
      >
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Terms & Conditions
        </h2>

        <div
          className="relative overflow-hidden transition-all duration-700 ease-in-out"
          style={{ maxHeight, overflow: "hidden" }}
        >
          <div className="space-y-6 text-justify text-gray-700 leading-relaxed">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && terms.length === 0 && (
              <p>No terms & conditions found.</p>
            )}
            {!loading &&
              !error &&
              terms.map((term) => (
                <motion.p
                  key={term.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: term.id * 0.1 }}
                >
                  {term.text}
                </motion.p>
              ))}
          </div>
        </div>

        {terms.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-orange-600 font-semibold hover:underline transition duration-300"
            >
              {expanded ? "Read Less ▲" : "Read More ▼"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TermsConditions;
