<!-- // "use client";

// import React, { useState } from "react";
// import { Calendar } from "lucide-react";

// const TestResults = () => {
//   const [activeTab, setActiveTab] = useState<"upcoming" | "past">("past");

//   const results = [
//     {
//       date: "07 Feb, 2025",
//       time: "05:00 PM",
//       title: "Superset Diagnostics Test",
//       totalScore: 62,
//       maxScore: 100,
//       type: "past", // 👈 tag for filtering
//       sections: [
//         { name: "Verbal Ability", score: 15, max: 20, color: "bg-cyan-400" },
//         { name: "Logical Reasoning", score: 17, max: 30, color: "bg-yellow-300" },
//         { name: "Quantitative Aptitude", score: 16, max: 30, color: "bg-yellow-300" },
//         { name: "General Awareness", score: 14, max: 20, color: "bg-cyan-400" },
//       ],
//     },
//     {
//       date: "04 Feb, 2025",
//       time: "06:00 PM",
//       title: "Superset Diagnostics Test",
//       totalScore: 57,
//       maxScore: 100,
//       type: "past",
//       sections: [],
//     },
//     {
//       date: "10 Oct, 2025",
//       time: "04:00 PM",
//       title: "Mock Aptitude Test",
//       totalScore: null, // no score yet
//       maxScore: 100,
//       type: "upcoming", // 👈 upcoming exam
//       sections: [],
//     },
//   ];

//   // Filter results by tab
//   const filteredResults = results.filter((r) => r.type === activeTab);

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-semibold text-gray-700">My Results</h1>
//           <div className="flex gap-2 bg-white rounded-full p-1 shadow-sm">
//             <button
//               onClick={() => setActiveTab("upcoming")}
//               className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
//                 activeTab === "upcoming"
//                   ? "bg-indigo-500 text-white"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Upcoming
//             </button>
//             <button
//               onClick={() => setActiveTab("past")}
//               className={`px-8 py-3 rounded-full text-sm font-medium transition-colors ${
//                 activeTab === "past"
//                   ? "bg-indigo-500 text-white"
//                   : "text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Past
//             </button>
//           </div>
//         </div>

//         {/* Results List */}
//         <div className="space-y-8">
//           {filteredResults.length > 0 ? (
//             filteredResults.map((result, idx) => (
//               <div key={idx} className="bg-white rounded-lg shadow-sm p-8">
//                 {/* Date and Score Header */}
//                 <div className="flex justify-between items-start mb-6">
//                   <div>
//                     <div className="flex items-center gap-2 text-gray-400 mb-2">
//                       <Calendar className="w-5 h-5" />
//                       <span className="text-lg">
//                         {result.date} {result.time}
//                       </span>
//                     </div>
//                     <h2 className="text-xl font-semibold text-gray-700">
//                       {result.title}
//                     </h2>
//                   </div>
//                   <div className="text-right">
//                     {result.type === "past" ? (
//                       <>
//                         <span className="text-3xl font-semibold text-cyan-400">
//                           {result.totalScore}
//                         </span>
//                         <span className="text-2xl text-gray-400">
//                           {" "}
//                           / {result.maxScore}
//                         </span>
//                       </>
//                     ) : (
//                       <span className="text-gray-400 text-lg">
//                         Upcoming Exam
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Section Scores (only for past exams) */}
//                 {result.type === "past" && result.sections.length > 0 && (
//                   <div className="space-y-6 mt-8">
//                     {result.sections.map((section, sIdx) => (
//                       <div key={sIdx} className="flex items-center gap-6">
//                         <div className="w-56 text-gray-400 text-base">
//                           {section.name}
//                         </div>
//                         <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
//                           <div
//                             className={`${section.color} h-full rounded-full transition-all duration-500`}
//                             style={{
//                               width: `${(section.score / section.max) * 100}%`,
//                             }}
//                           />
//                         </div>
//                         <div className="w-20 text-right">
//                           <span className="text-lg font-medium text-gray-600">
//                             {section.score}
//                           </span>
//                           <span className="text-gray-400">
//                             {" "}
//                             / {section.max}
//                           </span>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No results to display.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestResults; -->