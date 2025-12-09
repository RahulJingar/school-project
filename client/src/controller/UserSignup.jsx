import React from 'react'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {

  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate=useNavigate();

  const signupUser = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://127.0.0.1:2727/schoolUser/signup`, userSignup);
    console.log(`>>>res>>`, res.data);
    if(userSignup.name&&userSignup.email&&userSignup.password){
      alert("user signup successfully");
      navigate("/")
    }
  }


  const signupHandler = (e) => {
    setUserSignup({
      ...userSignup,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={signupUser} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userSignup.name}
            onChange={signupHandler}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={userSignup.email}
            onChange={signupHandler}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={userSignup.password}
            onChange={signupHandler}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account? <span className="text-blue-600 cursor-pointer">Login</span>
        </p>

      </div>
    </div>
  );
};

export default UserSignup;
