import { useParams } from "react-router-dom";
import { StayInTentDropDownData } from "../../StayInTent";

const IMAGES = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
];

const packages = [
    {
        title: "1 Night & 2 Days",
        subtitle: "Package Starts with ₹6,000",
        image: IMAGES[0],
        rates: [
            {
                label: "1N/2D Package Rates (Sunday and Monday)",
                table: [
                    ["Premium Cottages (Garden View)", "₹6000/-*"],
                    ["Royal Cottages (River View)", "₹7000/-*"],
                ],
            },
            {
                label: "1N/2D Package Rates (Tuesday to Saturday)",
                table: [
                    ["Premium Cottages (Garden View)", "₹7000/-*"],
                    ["Royal Cottages (River View)", "₹8000/-*"],
                ],
            },
        ],
    },
    {
        title: "2 Night & 3 Days",
        subtitle: "Package Starts with ₹11,000",
        image: IMAGES[1],
        rates: [
            {
                label: "2N/3D Package Rates (Sunday and Monday)",
                table: [
                    ["Premium Cottages (Garden View)", "₹11000/-*"],
                    ["Royal Cottages (River View)", "₹13000/-*"],
                ],
            },
            {
                label: "2N/3D Package Rates (Tuesday to Saturday)",
                table: [
                    ["Premium Cottages (Garden View)", "₹13000/-*"],
                    ["Royal Cottages (River View)", "₹14500/-*"],
                ],
            },
        ],
    },
    {
        title: "3 Night & 4 Days",
        subtitle: "Package Starts with ₹16,000",
        image: IMAGES[2],
        rates: [
            {
                label: "3N/4D Package Rates (Sunday and Monday)",
                table: [
                    ["Premium Cottages (Garden View)", "₹16000/-*"],
                    ["Royal Cottages (River View)", "₹18500/-*"],
                ],
            },
            {
                label: "3N/4D Package Rates (Tuesday to Saturday)",
                table: [
                    ["Premium Cottages (Garden View)", "₹18500/-*"],
                    ["Royal Cottages (River View)", "₹21000/-*"],
                ],
            },
        ],
    },
];

const peakSurcharge = [
    ["01st to 09th November 2024", "INR 3000/-* Per Night Per Tent"],
    ["22th to 31st December 2024", ""],
    ["14th & 15th January 2025", ""],
    ["14th to 15th March 2025", ""],
];

const extraCharges = [
    {
        title: "For Premium & Royal Cottage",
        details: [
            ["Sunday & Monday", "₹5500/-* Per Night"],
            ["Tuesday to Saturday", "₹5500/-* Per Night"],
        ],
    },
    {
        title: "For Royal Villa",
        details: [["For All Days", "₹36000/-* Per Night"]],
    },
];

export const StayInTentDropDownPackagesPrices = () => {
    return (
        <section className="py-12 px-2 w-full bg-gray-100">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-700 mb-2">
                        Statue of Unity Tent City Tour Packages & Prices
                    </h1>
                    <div className="font-semibold text-base sm:text-lg text-gray-700 tracking-wide">
                        Rates from 1st August 2024 to 31st March 2025
                    </div>
                    <div className="text-sm sm:text-base text-gray-500 mt-1">
                        Experience Ultimate Hospitality, Unmatchable Luxury and Unparalleled Comfort at Tented Accommodation Near Statue Of Unity at Kevadia.
                    </div>
                </div>

                {/* Packages with images and tables */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
                    {packages.map((pkg, idx) => (
                        <div key={pkg.title} className="bg-white rounded-3xl shadow-lg border border-orange-100 flex flex-col hover:shadow-2xl transition-all overflow-hidden">
                            <img src={pkg.image} alt={pkg.title} className="h-44 w-full object-cover" />
                            <div className="p-5 flex flex-col h-full">
                                <h2 className="text-lg font-bold text-orange-700 mb-1">{pkg.title}</h2>
                                <div className="font-semibold text-sm text-orange-500 mb-1">{pkg.subtitle}</div>
                                <div>
                                    {pkg.rates.map((rate, rateIdx) => (
                                        <div key={rate.label} className="mb-5">
                                            <div className="text-xs font-semibold text-center text-orange-600 mb-1">{rate.label}</div>
                                            <div className="rounded-xl border border-orange-200 overflow-hidden">
                                                <table className="w-full text-sm text-left">
                                                    <thead>
                                                        <tr className="bg-orange-100">
                                                            <th className="px-4 py-2 font-semibold">Category</th>
                                                            <th className="px-4 py-2 font-semibold">Rate Per Person</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {rate.table.map(([cat, price], i) => (
                                                            <tr key={cat} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                                                                <td className="px-4 py-2">{cat}</td>
                                                                <td className="px-4 py-2 text-orange-700 font-bold">{price}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="mt-auto w-full py-2 bg-gradient-to-tr from-green-500 to-green-700 text-white font-bold rounded-lg shadow hover:from-green-600 hover:to-green-800 transition">
                                    Book Online
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Surcharge and Extra charges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
                    <div className="rounded-xl border-2 border-orange-400 bg-white shadow-md p-6 flex flex-col">
                        <div className="text-center bg-orange-500 text-white font-bold rounded-t-md py-2 mb-4">Peak Season Surcharge</div>
                        <table className="w-full text-sm">
                            <tbody>
                                {peakSurcharge.map(([date, rate], i) => (
                                    <tr key={date} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                                        <td className="px-3 py-2">{date}</td>
                                        <td className="px-3 py-2">{rate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="rounded-xl border-2 border-orange-400 bg-white shadow-md p-6 flex flex-col">
                        <div className="text-center bg-orange-500 text-white font-bold rounded-t-md py-2 mb-4">Extra Mattress Charges</div>
                        <div className="mb-4">
                            <div className="font-semibold text-gray-800 mb-2">For Premium & Royal Cottage</div>
                            <table className="w-full text-sm mb-2">
                                <tbody>
                                    {extraCharges[0].details.map(([when, rate], i) => (
                                        <tr key={when} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                                            <td className="px-3 py-2">{when}</td>
                                            <td className="px-3 py-2 text-orange-700 font-bold">{rate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="font-semibold text-gray-800 mb-2">For Royal Villa</div>
                            <table className="w-full text-sm">
                                <tbody>
                                    {extraCharges[1].details.map(([when, rate], i) => (
                                        <tr key={when} className={i % 2 === 0 ? "bg-orange-50" : ""}>
                                            <td className="px-3 py-2">{when}</td>
                                            <td className="px-3 py-2 text-orange-700 font-bold">{rate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}