// export const PrivacyPolicy = () => {
//   return (

//     <>

//       <div className="section">

//         <div className="container flex flex-col gap-10 max-w-screen-xl mx-auto py-10 px-10">

//           <div className="heading flex justify-center items-center">

//             <h2 className="text-[1.5rem] font-semibold text-gray-600 ">Privacy Policy</h2>

//           </div>

//           <div className="policy-content flex flex-col items-start justify-center gap-5 text-justify">

//               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat corrupti alias culpa velit. Atque officiis harum laborum dolor molestias quidem, odit aut labore aliquam molestiae provident doloremque dolorum omnis qui.</p>
//               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat corrupti alias culpa velit. Atque officiis harum laborum dolor molestias quidem, odit aut labore aliquam molestiae provident doloremque dolorum omnis qui.</p>
//               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat corrupti alias culpa velit. Atque officiis harum laborum dolor molestias quidem, odit aut labore aliquam molestiae provident doloremque dolorum omnis qui.</p>
//               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat corrupti alias culpa velit. Atque officiis harum laborum dolor molestias quidem, odit aut labore aliquam molestiae provident doloremque dolorum omnis qui.</p>
//               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat corrupti alias culpa velit. Atque officiis harum laborum dolor molestias quidem, odit aut labore aliquam molestiae provident doloremque dolorum omnis qui.</p>
//               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat corrupti alias culpa velit. Atque officiis harum laborum dolor molestias quidem, odit aut labore aliquam molestiae provident doloremque dolorum omnis qui.</p>

//           </div>

//         </div>

//       </div>

//     </>

//   );
// };

import { useEffect } from "react";

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" bg-[#f9f6f1] text-[#333] px-4 py-12 md:px-12 lg:px-36">
      <div className="max-w-screen-xl mx-auto bg-white shadow-md rounded-2xl p-8 md:p-12 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">Privacy Policy</h2>

        <div className="space-y-6 text-justify text-gray-700 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam necessitatibus, unde
            delectus asperiores amet, soluta aliquam cumque nihil earum veritatis dolorum provident
            debitis sequi.
          </p>
          <p>
            Eos doloribus iusto eaque aliquid sunt laudantium voluptas laborum porro? Excepturi
            voluptates similique velit, unde iusto pariatur culpa.
          </p>
          <p>
            Perspiciatis repellendus nisi fugiat minus dignissimos labore expedita sint officiis
            laborum praesentium quos commodi hic accusantium.
          </p>
          <p>
            Quam, voluptatum? Laudantium molestiae cumque tempore saepe asperiores deserunt nulla
            alias, quia consequatur exercitationem eos incidunt!
          </p>
          <p>
            Sed vel maiores earum dicta quasi ea explicabo repellat inventore. Quibusdam
            dignissimos, illo aliquid amet error.
          </p>
          <p>
            If you have any questions, feel free to contact us at{" "}
            <span className="text-orange-500 underline cursor-pointer">support@example.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
