import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://127.0.0.1:2727/schoolUser/login`,
      logindata
    );
    console.log(`>>>Res>>`, res.data.data);
    if(logindata.email&&logindata.password){
      alert("user login successfully")
      navigate("/dashboard")
    }else{
      alert("invalid user please signup first")
    }
  };

  const loginHandle = (e) => {
    e.preventDefault();
    setLoginData({
      ...logindata,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={loginHandler}>
        <input
          type="email"
          name="email"
          placeholder="enter the email"
          value={logindata.email}
          onChange={loginHandle}
        />

        <input
          type="password"
          name="password"
          placeholder="enter the password"
          value={logindata.password}
          onChange={loginHandle}
        />

        <button>login</button>
      </form>
    </div>
  );
};

export default UserLogin;
