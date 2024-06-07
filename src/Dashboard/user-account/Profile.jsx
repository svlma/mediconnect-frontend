import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Profile = () => {
  const { user, token, dispatch } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    bloodType: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      bloodType: user.bloodType,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData({ ...formData, photo: URL.createObjectURL(file) });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let uploadedImageUrl = formData.photo;
      if (selectedFile) {
        const data = await uploadImageToCloudinary(selectedFile);
        uploadedImageUrl = data.url;
      }

      const updatedFormData = { ...formData, photo: uploadedImageUrl };

      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "UPDATE_USER",
        payload: {
          user: result.data,
        },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/users/profile/me");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="mb-5 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
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
          className="mb-5 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-b-primaryColor text-[15px] leading-7 text-headingColor
                placeholder:text-textColor rounded-md cursor-pointer"
          aria-readonly
          readOnly
        />
        <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mb-5 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-b-primaryColor text-[15px] leading-7 text-headingColor
                placeholder:text-textColor rounded-md cursor-pointer"
        />
        <input
          type="text"
          placeholder="Blood Type"
          name="bloodType"
          value={formData.bloodType}
          onChange={handleInputChange}
          className="mb-5 w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none
                focus:border-b-primaryColor text-[15px] leading-7 text-headingColor
                placeholder:text-textColor rounded-md cursor-pointer"
          required
        />

        <div className="mb-5 flex items-center justify-between">
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

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
              <img
                src={formData.photo}
                alt="Profile"
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative w-[130px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg,.png"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.37rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`mt-7 w-full bg-primaryColor text-white text-[18px] leading-[30px] py-4 px-3 rounded-lg hover:bg-primaryDarkColor ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? <HashLoader size={25} color="#ffffff" /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
