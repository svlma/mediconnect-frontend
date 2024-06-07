import { useState, useContext } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout.jsx";
import Feedback from "./Feedback.jsx";
import SidePanel from "./SidePanel.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { Stack } from "@chakra-ui/react";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    data: doctor,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      return toast.error("Please select a date and time for your appointment");
    }

    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: selectedDate, time: selectedTime }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message + " Please try again");
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Error errMessage={error} />;

  if (!doctor) return null;

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo,
  } = doctor;

  // Filter times between 8 AM and 6 PM
  const filterTimes = (time) => {
    const hour = time.getHours();
    return hour >= 8 && hour <= 18;
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-5">
              {/* <figure className="max-w-[200px] max-h-[200px]"> */}
              <img
                src={photo}
                className="w-full max-w-[200px] max-h-[200px] rounded-[10px] shadow "
                borderRadius="20px"
                mb={4}
                padding={7}
              />
              {/* </figure> */}
              <div>
                <Stack
                  direction="row"
                  spacing={2}
                  className="flex items-center"
                  justifyContent={"space-between"}
                >
                  <h3 className="text-headingColor text-[30px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <span
                    className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px]
                    leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded"
                  >
                    {specialization}
                  </span>
                </Stack>
                <div>
                  <span
                    className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px]
                      lg:leading-7 font-semibold text-headingColor"
                  >
                    <img src={starIcon} alt="" />
                    {averageRating}
                  </span>
                  <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                    ({totalRating})
                  </span>
                </div>
                <p className="text__para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]">
                  {bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${
                  tab === "about"
                    ? "border-b border-solid border-primaryColor"
                    : ""
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`${
                  tab === "feedback"
                    ? "border-b border-solid border-primaryColor"
                    : ""
                } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>
            <div className="mt-[50px]">
              {tab === "about" && (
                <DoctorAbout
                  name={name}
                  about={about}
                  qualifications={qualifications}
                  experiences={experiences}
                />
              )}
              {tab === "feedback" && (
                <Feedback reviews={reviews} totalRating={totalRating} />
              )}
            </div>
          </div>

          <div>
            <SidePanel
              doctorId={doctor._id}
              ticketPrice={ticketPrice}
              timeSlots={timeSlots}
            />
            <div className="mt-6">
              <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-4">
                Book an Appointment
              </h3>
              <div className="mb-4">
                <label className="block text-headingColor mb-2">
                  Select Date:
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholderText="Select a date"
                />
              </div>
              <div className="mb-4">
                <label className="block text-headingColor mb-2">
                  Select Time:
                </label>
                <DatePicker
                  selected={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  filterTime={filterTimes}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholderText="Select a time"
                />
              </div>
              <button
                onClick={handleBooking}
                className="btn px-2 w-full rounded-xl"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetails;
