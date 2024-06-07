import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Tesetimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Box,
  Container,
} from "@chakra-ui/react";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <>
      <h1 className="text-3xl pt-5 font-bold mb-4 flex justify-center">
        Search Doctors by Name
      </h1>
      <section className="py-4 flex justify-center">
        <Container className="max-w-screen-xl mx-auto text-black ">
          <Box w="100%" className="flex justify-center">
            <InputGroup>
              <Input
                placeholder="Search doctors by name"
                className="py-3 px-60 placeholder-gray-500"
                // className="py-3 pl-10 pr-4 w-full focus:outline-none placeholder-gray-500"

                value={query}
                border="1px solid blue"
                borderRadius="10px"
                onChange={(e) => setQuery(e.target.value)}
              />
              <InputRightElement className="py-4 px-3">
                <BsSearch color="blue" />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Container>
      </section>
      <section className="py-8">
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-8">
        <div className="container">
          <h2 className="text-3xl font-semibold text-center mb-4">
            What our patients say
          </h2>
          <p className="text-lg text-center mb-8">
            World-class care for everyone. Our health system offers unmatched,
            expert health care.
          </p>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
