import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { VscChevronDown } from "react-icons/vsc";
import {
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import starIcon from "../../assets/images/Star.png";

const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, experiences } =
    doctor;

  return (
    <Box
      borderWidth="1px"
      className="shadow-lg"
      borderRadius="10px"
      paddingTop={17}
      paddingLeft={17}
      paddingBottom={13}
      paddingRight={17}
      width="100%"
      overflow="hidden"
      _hover={{
        transform: "scale(1.03)",
        transition: "trandform .15s ease-in ",
      }}
    >
      <Link to={`/doctors/${doctor._id}`}>
        <Image src={photo} alt={name} borderRadius="20px" mb={4} padding={7} />
      </Link>

      <Heading fontSize="md" padding={4} textAlign="center" fontWeight="bold">
        {name}
      </Heading>

      <Flex align="center" justify="space-between" mb={4} padding={5}>
        <Badge
          // ml="1"
          fontSize="0.8em"
          variant="outline"
          bgColor="#136cfb"
          padding={8}
          color="white"
          borderRadius={5}
          border="4px"
          borderColor="#136cfb"
          fontWeight="bold"
        >
          {specialization}
        </Badge>

        <Flex align="center" gap={2}>
          <Image src={starIcon} alt="star icon" w={20} h={20} />
          <Text ml={1} fontWeight="bold" color="gray.700">
            {avgRating}
          </Text>
          {totalRating && (
            <Text ml={1} fontSize="sm" color="gray.600">
              ({totalRating})
            </Text>
          )}
        </Flex>
      </Flex>

      <Flex align="center" justify="space-between">
        <Text fontSize="sm" color="gray.600">
          {experiences && experiences[0]?.hospital}
        </Text>
        <Link to={`/doctors/${doctor._id}`}>
          <IconButton
            padding={8}
            aria-label="View Doctor"
            icon={<VscChevronDown />}
            colorScheme="blue"
            variant="outline"
            borderRadius="full"
            _hover={{ bg: "blue.500", color: "blue" }}
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default DoctorCard;
