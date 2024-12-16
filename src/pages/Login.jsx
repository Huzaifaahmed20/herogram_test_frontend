import React, { useState } from "react";
import { login, signUp } from "../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function Login({ loginState }) {
  const [authData, setAuthData] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const changeToSignup = () => setIsLogin(!isLogin);
  const navigate = useNavigate();

  const onClick = async () => {
    if (!authData.email || !authData.password) {
      toast.info("Email and password are reuired");
      return;
    }
    try {
      if (isLogin) {
        const res = await login(authData);
        const token = res.data.token;
        localStorage.setItem("token", token);
        loginState();
      } else {
        await signUp(authData);
        setIsLogin(true);
        toast.info("Sign up successfull, login to continue");
      }
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };

  const handleChange = (ev) => {
    setAuthData({ ...authData, [ev.target.name]: ev.target.value });
  };

  return (
    <div className="bg-white flex flex-col justify-center items-center h-screen space-y-10">
      <h3 className="font-bold text-2xl">{isLogin ? "Login" : "Sign Up"}</h3>

      <input
        required
        onChange={handleChange}
        name="email"
        type="text"
        placeholder="hello@gmail.com"
        className="bg-white border border-slate-950 p-5 w-1/3"
        value={authData.email}
      />
      <input
        required
        onChange={handleChange}
        name="password"
        className=" bg-white border border-slate-950 p-5 w-1/3"
        placeholder="paswword"
        type="password"
        value={authData.password}
      />
      <button
        onClick={onClick}
        className="border border-blue-400 px-5 py-4 w-1/4"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>

      <p>
        Don't have an account?{" "}
        <button
          onClick={changeToSignup}
          className="cursor-pointer text-blue-500"
        >
          Signup
        </button>
      </p>
    </div>
  );
}
