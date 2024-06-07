import { useEffect, useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { Container, Text } from "@chakra-ui/react";
import heart from "../assets/images/heart.jpg";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [key, setKey] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    gender: "",
    role: "patient",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Resets the key on each component mount to force reload the GIF
    setKey(Date.now());
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const { message } = await res.json();
      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <section className="px-1 xl:px-0 ">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
          <img src={heart} alt="Sign up" className="w-full rounded-bl-[60px]" />

          <div className="bg-white rounded-[20px] p-4 lg:p-12 shadow-[20px_20px_30px_rgba(0,0,0,0.1)]">
            <div className="flex items-center justify-center mb-8 pt-2">
              <h1 className="text-headingColor text-[40px] leading-9 pr-3">
                Create an <span className="text-primaryColor">account</span>
              </h1>
            </div>

            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mb-3 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-b-primaryColor text-[15px] leading-7 text-headingColor
                placeholder:text-textColor rounded-md cursor-pointer"
                required
              />
              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mb-3 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-b-primaryColor text-[15px] leading-7 text-headingColor
                placeholder:text-textColor rounded-md cursor-pointer"
                required
              />
              <input
                type="password"
                placeholder="Enter your Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className=" w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-b-primaryColor text-[15px] leading-7 text-headingColor
                placeholder:text-textColor rounded-md cursor-pointer"
                required
              />

              <div className=" flex items-center justify-between">
                <label className="text-headingColor font-bold text-[15px] leading-7 pt-1">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
                <label className="text-headingColor font-bold text-[15px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>

              <div className=" flex items-center gap-3">
                {selectedFile && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img
                      src={previewURL}
                      alt="Profile"
                      className="w-full rounded-full"
                    />
                  </figure>
                )}
                <div className="relative w-[130px] h-[50px] ">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg,.png"
                    className=" absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.37rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              {/* <button
                type="submit"
                className={`mt-4 w-full bg-primaryColor text-white text-[18px] leading-[30px] py-4 px-3 rounded-lg hover:bg-primaryDarkColor ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
                disabled={loading}
              > */}
              <div className="mt-3 flex justify-center">
                <button
                  type="submit"
                  className="bg-primaryColor text-white text-[18px] leading-[30px] py-4 hover:bg-primaryDarkColor rounded-[50px] focus:outline-none w-50"
                  disabled={loading}
                >
                  {loading ? (
                    <HashLoader size={35} color="#ffffff" />
                  ) : (
                    <Text fontWeight="bold" fontSize={25}>
                      Sign up
                    </Text>
                  )}
                </button>
              </div>

              <p className="mt-4 text-textColor text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
