import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import bg from "../assets/images/bg3.jpg";
import homedoctor2 from "../assets/images/doctor2.jpeg";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import DoctorList from "../components/Doctors/DoctorList";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Tesetimonial";
import ExpandableText from "../components/ExpendedText";
import Header from "../components/Header/Header";
import map from "../assets/images/map.png";
import find from "../assets/images/find.png";
import book from "../assets/images/book.png";
import img from "../assets/images/img3.jpg";
import dimg from "../assets/images/shvetsa.jpg";
const Home = () => {
  const textStyle = {
    fontFamily: "'Playfair Display', sans-serif", // Replace 'Font Name' with the actual font name
  };
  return (
    <>
      <Stack
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          color: "white",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.98) 0.01%, rgba(255, 255, 255, 0) 100%), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        />
        <Header />
        <Stack
          style={{
            paddingTop: 40,
          }}
          paddingLeft={20}
        >
          <Box paddingTop={85} paddingLeft={165} className="lg:w-[700px]">
            <h1 className="text-[36px] leading-[46px] text-headingColor font-[700] md:text-[45px] md:leading-[70px] text-justify">
              Your Health, Our Priority
            </h1>
            <h2 className="text-[24px] leading-[32px] text-headingColor font-[500] md:text-[28px] md:leading-[40px] text-justify">
              Comprehensive Care for a Healthier You
            </h2>
            <p className="text-justify text-textColor">
              <ExpandableText>
                <br />
                At MEDI CONNECT, we are dedicated to offering a wide range of
                medical services tailored to meet the needs of our community.
                Our experienced professionals are here to provide compassionate
                care, advanced treatments, and personalized attention to ensure
                your well-being.
                <br />
                <br />
                Our Services Include: General Medicine, Pediatrics, Orthopedics,
                Cardiology, and more.
                <br />
                <br />
                Schedule an appointment today and take the first step towards
                better health.
              </ExpandableText>
            </p>
          </Box>
        </Stack>
      </Stack>

      <div>
        <section className="">
          <div className="container">
            <div className="lg:w-[470px] mx-auto">
              <h2 className="heading text-center">
                Providing best med services
              </h2>
            </div>
            <div>
              <p className="text__para text-center ">
                Ensuring top-notch medical care to meet your needs and exceed
                your expectations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
              <div className="px-5">
                <div className="flex items-center justify-center">
                  <img src={find} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Find a doctor
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Connect with experienced professionals who care about your
                    well-being through our doctor search tool.
                  </p>
                  <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>
              <div className="px-5">
                <div className="flex items-center justify-center">
                  <img src={map} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Find a Location
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Discover the nearest medical facility tailored to your needs
                    with our location search feature.
                  </p>
                  <Link
                    to="/location-search"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>
              <div className="px-5">
                <div className="flex items-center justify-center">
                  <img src={book} alt="" />
                </div>
                <div className="mt-[30px]">
                  <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                    Book Appointment
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
                    Schedule your next visit hassle-free with our easy
                    appointment booking system.
                  </p>
                  <Link
                    to="/doctors"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <About />

        <section>
          <div className="container">
            <div className="flex items-center justify-between flex-col lg:flex-row">
              <div className="xl:w-[670px] pl-6">
                <h2 className="heading pl-6 pb-4">
                  Get virtual treatment <br /> anytime.
                </h2>
                <ul className="pl-4">
                  <li className="text_para">
                    1. Schedule the appointment directly.
                  </li>
                  <li className="text_para">
                    2. Search for your physician here, and contact their office.
                  </li>
                  <li className="text_para">
                    3. View our physicians who are accepting new patients, use
                    the online scheduling tool to select an appointment time.
                  </li>
                </ul>
              </div>
              <div className="relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0">
                <img
                  src={img}
                  className="relative lg:w-3/4 xl:w-[680px] z-10 order-2 lg:order-1 rounded-tl-[50px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="xl:w-[470px] mx-auto">
              <h2 className="heading text-center">Our greatest doctors</h2>
            </div>
            <DoctorList />
          </div>
        </section>

        <section>
          <div className="container">
            <div className="flex justify-center items-center gap-[50px] lg:gap-0">
              <div className="w-3/4 hidden md:flex justify-center">
                <img
                  src={dimg}
                  style={{ borderBottomLeftRadius: "50px" }}
                  className="w-5/6"
                  alt="Description of Image"
                />
              </div>
              <div className="w-full md:w-3/4 flex flex-col justify-center items-center md:items-start">
                <h2 className="heading md:text-left">
                  Most frequent questions asked by our beloved patients
                </h2>
                <FaqList />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="xl:w-[470px] mx-auto">
              <h2 className="heading text-center">What our patients say</h2>
              <p className="text_para text-center">
                World-class care for everyone. Our health system offers
                unmatched, expert health care.
              </p>
            </div>
            <Testimonial />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
