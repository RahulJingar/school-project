// import React from "react";
// import { useNavigate } from "react-router-dom";

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
//       <div className="max-w-sm w-full bg-slate-900/80 border border-emerald-500/40 rounded-3xl px-8 py-6 text-center">
//         <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto mb-3">
//           <span className="text-emerald-400 text-2xl">✓</span>
//         </div>
//         <h2 className="text-xl font-semibold text-emerald-300 mb-2">
//           Payment Successful
//         </h2>
//         <p className="text-slate-300 text-sm mb-4">
//           Aapka course successfully purchase ho gaya hai. Ab aap apni classes
//           start kar sakte hain.
//         </p>

//         <button
//           onClick={() => navigate("/courses")}
//           className="w-full mb-2 px-4 py-2 rounded-2xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white"
//         >
//           Back to Courses
//         </button>

//         <button
//           onClick={() => navigate("/courses")}
//           className="w-full px-4 py-2 rounded-2xl text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100"
//         >
//           Go to Dashboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;



import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50 px-4">
      <div className="max-w-md w-full bg-slate-900/80 border border-emerald-500/40 rounded-3xl p-8 text-center">
        <div className="h-14 w-14 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400">
          ✅
        </div>
        <h1 className="text-2xl font-semibold mb-2">Payment Successful</h1>
        <p className="text-sm text-slate-300 mb-6">
          Aapka course enroll ho chuka hai. Ab aap apne enrolled courses
          section se content access kar sakte hain.
        </p>
        <button
          onClick={() => navigate("/my-courses")}
          className="w-full mb-3 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"
        >
          Go to My Courses
        </button>
        <button
          onClick={() => navigate("/courses")}
          className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-sm font-semibold"
        >
          Browse More Courses
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
