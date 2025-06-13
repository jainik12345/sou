// import { useEffect } from "react";

// const TermsConditions = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="bg-[#f9f6f1] text-[#333] px-4 py-12 md:px-12 lg:px-36">
//       <div className="max-w-screen-xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-12 animate-fadeIn">
//         <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
//           Terms & Conditions
//         </h2>

//         <div className="space-y-6 text-justify text-gray-700 leading-relaxed">
//           <p>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
//             necessitatibus, unde delectus asperiores amet, soluta aliquam
//             cumque nihil earum veritatis dolorum provident debitis sequi.
//           </p>
//           <p>
//             Eos doloribus iusto eaque aliquid sunt laudantium voluptas laborum
//             porro? Excepturi voluptates similique velit, unde iusto pariatur
//             culpa.
//           </p>
//           <p>
//             Perspiciatis repellendus nisi fugiat minus dignissimos labore
//             expedita sint officiis laborum praesentium quos commodi hic
//             accusantium.
//           </p>
//           <p>
//             Quam, voluptatum? Laudantium molestiae cumque tempore saepe
//             asperiores deserunt nulla alias, quia consequatur exercitationem eos
//             incidunt!
//           </p>
//           <p>
//             Sed vel maiores earum dicta quasi ea explicabo repellat inventore.
//             Quibusdam dignissimos, illo aliquid amet error.
//           </p>
//           <p>
//             If you have any questions, feel free to contact us at{" "}
//             <span className="text-orange-500 underline cursor-pointer">
//               support@example.com
//             </span>
//             .
//           </p>

//           {/* Inclusions Section */}
//           <div>
//             <h3 className="text-2xl font-semibold text-orange-500 mt-10 mb-4">
//               Inclusions
//             </h3>
//             <ul className="list-disc list-inside space-y-2">
//               <li>
//                 2 Nights/3 Days Package: Includes Lunch,
//                 Refreshment & Dinner on 1st Day; Morning Tea, Breakfast, Lunch,
//                 Refreshment & Dinner on 2nd Day; and Morning Tea & Breakfast on
//                 3rd Day.
//               </li>
//               <li>
//                 The meals will be served as per the scheduled time in the dining
//                 area. Missed meals will not be refunded or extended on 3rd Day.
//               </li>
//               <li>
//                 <strong>1 Night/2 Days Package:</strong> Includes Lunch,
//                 Refreshment & Dinner on 1st Day; and Morning Tea & Breakfast on
//                 2nd Day.
//               </li>
//               <li>
//                 The meals will be served as per the scheduled time in respective
//                 dining areas. Missed meals will not be refunded or extended on
//                 2nd Day.
//               </li>
//               <li>
//                 Accommodation in rooms is on a twin sharing basis.
//               </li>
//               <li>
//                 Two bottles of drinking water per cottage will be provided on a
//                 complimentary basis.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TermsConditions;

/* */

import { useEffect, useState } from "react";
import axios from "axios";
import BE_URL from "../../config";

const TermsConditions = () => {
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="bg-[#f9f6f1] text-[#333] px-4 py-12 md:px-12 lg:px-36">
      <div className="max-w-screen-xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-12 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
          Terms & Conditions
        </h2>

        <div className="space-y-6 text-justify text-gray-700 leading-relaxed">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && terms.length === 0 && (
            <p>No terms & conditions found.</p>
          )}
          {!loading &&
            !error &&
            terms.map((term) => <p key={term.id}>{term.text}</p>)}
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
