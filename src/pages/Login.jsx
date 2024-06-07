import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Make sure to import Link if you're using it
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext.jsx";
import HashLoader from "react-spinners/HashLoader.js";
import { Container, Text } from "@chakra-ui/react";
import logo from "../assets/images/logo_transparent.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.data.token,
          role: result.data.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      //si l'admin qui log in en se dirige directement vers dashboard
      if (result.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="w-full max-w-[570px] mx-auto rounded-lg md:p-10 shadow-[12px_20px_30px_rgba(0,0,0,0.3)]">
        <Container className="flex flex-col items-center justify-center h-full pb-6">
          <div className="flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-12 mr-4 " />
            <h1 className="text-headingColor text-[40px] leading-9 pr-8 ">
              Welcome
            </h1>
          </div>
        </Container>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              autoComplete="current-password"
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[22px] leading-7 text-headingColor
              placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>
          <div className="mt-7 flex justify-center">
            <button
              type="submit"
              className="bg-primaryColor text-white text-[18px] leading-[30px] py-3 hover:bg-primaryDarkColor rounded-[50px] focus:outline-none w-40"
            >
              {loading ? (
                <HashLoader size={25} color="#fff" />
              ) : (
                <Text fontWeight="bold" fontSize={25}>
                  Login
                </Text>
              )}
            </button>
          </div>

          <p className="mt-5 text-textColor text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
