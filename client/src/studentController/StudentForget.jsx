import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentForget = () => {
  const [userForget, setUserForget] = useState({
    email: "",
    newPassword: ""
  });

  const formHandler = async (e) => {
    e.preventDefault();
    const fetchData = await axios.patch(`http://127.0.0.1:2727/schoolUser/userForget`, userForget);
    console.log(`>>>fetchData>>>`, fetchData);

    setUserForget({
      email: "",
      newPassword: ""
    });
  };

  const handleStudent = (e) => {
    setUserForget({
      ...userForget,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-12 w-full max-w-md border border-white/50">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent mb-3">
            Forgot Password
          </h1>
          <p className="text-gray-600 text-lg">Reset your account password securely</p>
        </div>

        <form onSubmit={formHandler} className="space-y-6">
          <div>
            <input 
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userForget.email}
              onChange={handleStudent}
              className="w-full px-5 py-4 text-lg bg-white/60 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all duration-300 placeholder-gray-500 shadow-md hover:shadow-lg"
              required
            />
          </div>

          <div>
            <input 
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={userForget.newPassword}
              onChange={handleStudent}
              className="w-full px-5 py-4 text-lg bg-white/60 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all duration-300 placeholder-gray-500 shadow-md hover:shadow-lg"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-5 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <button 
            onClick={() => window.location.href = '/login'}
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-all duration-200 hover:underline flex items-center justify-center mx-auto"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentForget;
