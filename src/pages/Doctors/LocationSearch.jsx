import React, { useState } from "react";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard";
import { BsSearch } from "react-icons/bs";
import {
  Input,
  InputGroup,
  InputRightElement,
  Box,
  Container,
} from "@chakra-ui/react";

const LocationSearch = () => {
  const [location, setLocation] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/doctors?location=${location}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      setDoctors(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-3xl pt-5 font-bold mb-4 flex justify-center">
          Search Doctors by Location
        </h1>
        <form onSubmit={handleSearch} className="mb-4 py-4 flex justify-center">
          <Container className="max-w-screen-xl mx-auto text-black">
            <Box w="100%" className="flex justify-center">
              <InputGroup>
                <Input
                  placeholder="Enter location"
                  className="py-3 px-60 w-full placeholder-gray-500"
                  value={location}
                  border="1px solid blue"
                  borderRadius="10px"
                  onChange={handleInputChange}
                />
                <InputRightElement className="py-4 px-3">
                  <BsSearch color="blue" />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Container>
        </form>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <Box key={doctor._id} className="p-4" width="100%">
                <DoctorCard doctor={doctor} />
              </Box>
            ))}
          </Box>
        )}
      </div>
    </>
  );
};

export default LocationSearch;
