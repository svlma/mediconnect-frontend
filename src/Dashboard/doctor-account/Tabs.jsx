import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

//eslint-disable-next-line react/prop-types
const Tabs = ({ tab, setTab }) => {
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      dispatch({ type: 'LOGOUT' });
      navigate('/login');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) {
      return; // Exit the function if the user cancels the deletion
    }

    try {
      const res = await fetch(`${BASE_URL}/doctors/${user._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      dispatch({ type: 'LOGOUT' });
      navigate('/');
    } catch (err) {
      console.error("Failed to delete account:", err.message);
    }
  };

  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div className="hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md">
        <button
          onClick={() => setTab('overview')}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>

        <button
          onClick={() => setTab('appointments')}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>

        <button
          onClick={() => setTab('settings')}
          className={`${
            tab === "settings"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>

        <div className='mt-[100px] w-full'>
          <button
            onClick={handleLogout}
            className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white'
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs