import { useState } from "react";
import { User2Icon, Mail, Lock } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import api from "../configs/axios.js"
import { Navigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle.jsx";
import { useLanguage } from "../languageContext.js";



const LoginView = () => {
  const [state, setState] = useState("login");
  const [disable, setDisable] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { setUserData, isAuthentication } = useAuthStore();
  const { t } = useLanguage();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    setErrorMsg("");

    try {
      let response;

      if (state === "login") {
        response = await api.post("/auth/login", formData);
        alert("Login Success");
      } else {
        response = await api.post("/auth/register", formData);
        alert("Register Success");
      }

      const user = response?.data?.user;
      if (user) {
        setUserData(user);
      }

      navigate("/app");
    } catch (error) {
      console.error("Auth request failed:", error);
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Request failed. Please try again.";
      setErrorMsg(message === "Email sudah digunakan"
        ? "Email sudah terdaftar. Silakan pilih Masuk untuk login."
        : message);
    } finally {
      setDisable(false);
    }
  };

  return !isAuthentication ? (
    <>
      <section className="bg-black w-full py-15 min-h-screen flex justify-center items-center">
        <div className="fixed top-5 right-5 z-10">
          <LanguageToggle />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
        >
          <h1 className="text-white text-3xl mt-10 font-medium">
            {state === "login" ? t.login : t.signUp}
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            {t.pleaseContinue}
          </p>

          {/* Error Message */}
          {errorMsg && (
            <div className="text-red-500 text-sm mt-2">{errorMsg}</div>
          )}

          {/* Login Form */}
          {state !== "login" && (
            <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
              <User2Icon size={16} color="#4f39f6" />
              <input
                type="text"
                name="name"
                placeholder={t.name}
                className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
                value={formData.name}
                onChange={handleChange}
               
              />
            </div>
          )}

          {/* Email Form */}
          <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <Mail size={16} color="#4f39f6" />
            <input
              type="email"
              name="email"
              placeholder={t.email}
              className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Form */}
          <div className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
            <Lock size={16} color="#4f39f6" />
            <input
              type="password"
              name="password"
              placeholder={t.password}
              className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none"
              value={formData.password}
              onChange={handleChange}
             
            />
          </div>

          {/* Forget Password */}
          <div className="mt-4 text-left">
            {/* <button className="text-sm text-indigo-400 hover:underline">
              Forget password?
            </button> */}
          </div>

            
          <button
            type="submit"
            className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition "
            disable:bg-gray-400 disabled:cursor-not-allowed disable:text-white
            disabled={disable}
          >
            {state === "login" ? t.login : t.signUp}
          </button>
          <p
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
          >
            {state === "login"
              ? t.noAccount
              : t.haveAccount}
            <span className="text-indigo-400 hover:underline ml-1">
              {state === "login" ? t.signUp : t.login}
            </span>
          </p>
        </form>

        {/* Soft Backdrop*/}
        <div className="fixed inset-0 -z-1 pointer-events-none">
          <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-indigo-800/35 to-transparent rounded-full blur-3xl" />
          <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-indigo-700/35 to-transparent rounded-full blur-2xl" />
        </div>
      </section>
    </>
  ) :(
    <Navigate to={"/app"} replace/>
  );
};

export default LoginView;
