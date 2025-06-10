import React from "react";

const packages = [
  {
    title: "Lake View Cottage Room Packages Rate",
    sections: [
      {
        label: "Monday to Thursday",
        columns: [
          { label: "Plan", key: "plan" },
          { label: "1 Night & 2 Days (Per Couple)", key: "night1" },
          { label: "2 Night & 3 Days (Per Couple)", key: "night2" },
        ],
        rows: [
          { plan: "CP Plan", night1: "₹ 5,000/-", night2: "₹ 10,000/-" },
          { plan: "MAP Plan", night1: "₹ 6,000/-", night2: "₹ 12,000/-" },
          { plan: "AP Plan", night1: "₹ 7,000/-", night2: "₹ 14,000/-" },
        ],
      },
      {
        label: "Friday to Sunday",
        columns: [
          { label: "Plan", key: "plan" },
          { label: "1 Night & 2 Days (Per Couple)", key: "night1" },
          { label: "2 Night & 3 Days (Per Couple)", key: "night2" },
        ],
        rows: [
          { plan: "CP Plan", night1: "₹ 6,000/-", night2: "₹ 12,000/-" },
          { plan: "MAP Plan", night1: "₹ 7,000/-", night2: "₹ 14,000/-" },
          { plan: "AP Plan", night1: "₹ 8,000/-", night2: "₹ 16,000/-" },
        ],
      },
    ],
  },
  {
    title: "Lake View Cross Camp Cottage Room Packages Rate",
    subtitle: "Cross Camp (Min 10 Pax & Max 40 Pax in)",
    sections: [
      {
        columns: [
          { label: "Plan", key: "plan" },
          { label: "1 Night & 2 Days (Per Person)", key: "night1" },
          { label: "2 Night & 3 Days (Per Person)", key: "night2" },
        ],
        rows: [
          { plan: "EP Plan", night1: "₹ 500/-", night2: "₹ 1,000/-" },
          { plan: "CP Plan", night1: "₹ 900/-", night2: "₹ 1,800/-" },
          { plan: "MAP Plan", night1: "₹ 1,200/-", night2: "₹ 2,400/-" },
          { plan: "AP Plan", night1: "₹ 1,600/-", night2: "₹ 3,200/-" },
        ],
      },
    ],
  },
];

const PackageTable = ({ section }) => (
  <div className="overflow-x-auto rounded-lg shadow-md bg-white">
    {section.label && (
      <div className="bg-orange-100 text-orange-700 px-4 py-2 font-bold text-center rounded-t-md">
        {section.label}
      </div>
    )}
    <table className="min-w-full text-sm text-gray-700 border">
      <thead>
        <tr>
          {section.columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-2 bg-orange-400 text-white font-semibold text-center"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {section.rows.map((row, idx) => (
          <tr
            key={idx}
            className="hover:bg-orange-50 transition-colors border-b last:border-none"
          >
            {section.columns.map((col) => (
              <td key={col.key} className="px-4 py-2 text-center">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const StayInTentDropDownCottagePackagesRate = () => (
  <div className="py-12 px-2 bg-white">
    <div className="max-w-5xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-2">
          SOU Eco Camp Packages
        </h1>
        <p className="text-gray-700 text-lg">
          Choose the best package for your stay. Enjoy nature, comfort, and a memorable experience at the Statue of Unity.
        </p>
      </header>
      <div className="space-y-12">
        {packages.map((pkg, idx) => (
          <section key={idx} className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl text-orange-700 font-bold mb-2 text-center">
              {pkg.title}
            </h2>
            {pkg.subtitle && (
              <p className="text-center text-sm mb-4 text-gray-500">
                {pkg.subtitle}
              </p>
            )}
            <div className="flex flex-col md:flex-row gap-8 justify-center mb-4">
              {pkg.sections.map((section, sidx) => (
                <div key={sidx} className="flex-1">
                  <PackageTable section={section} />
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all">
                Book Online
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);