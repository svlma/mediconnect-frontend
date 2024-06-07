import React from "react";
import { Link } from "react-router-dom";
import aboutImg from "../../assets/images/shvetsa.jpg";
import aboutCardImg from "../../assets/images/tima.jpg";
import hero from "../../assets/images/hero.jpg";
const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between flex-col lg:flex-row">
          <div className="relative xl:w-[770px] z-10 order-2 lg:order-1">
            <img
              src={hero}
              className="relative lg:w-3/4 xl:w-[680px] z-10 order-2 lg:order-1 rounded-br-[50px]"
            />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]"></div>
          </div>

          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the nation's best</h2>
            <p className="text_para">
              Empowering Healthcare Heroes: Our dedicated team of medical
              professionals stands as pillars of strength and compassion,
              ensuring your well-being every step of the way.
            </p>
            <p className="text_para mt-[30px]">
              Proudly Serving as Pioneers in Healthcare: With a commitment to
              excellence and a passion for patient care, we strive to set the
              standard for healthcare excellence nationwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
