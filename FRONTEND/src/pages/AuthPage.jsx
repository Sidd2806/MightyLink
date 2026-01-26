import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  return (
    <div
      className="
        min-h-screen flex flex-col items-center justify-center
        bg-gradient-to-br from-[#172442] via-[#03071a] to-black
      "
    >
      <h1 className="text-3xl font-bold mb-8 text-white tracking-wide">
        URL Shortener
      </h1>
      {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
    </div>
  );
};

export default AuthPage;
