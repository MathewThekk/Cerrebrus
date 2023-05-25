import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Button, Heading, HStack } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getUnits, addUnit } from "../actions/unitActions";
import CustomModalDialog from "./learnComponents/subjectPage/AddSubjectModal";


const UnitSelectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUnit, setNewUnit] = useState("");
  const dispatch = useDispatch();
  const { subject, field } = useParams(); // <-- use `useParams` to get the field from the URL

  const units = useSelector((state) => state.units);



  useEffect(() => {
    dispatch(getUnits(subject, field)); // <-- pass `field` to `getUnits` action
  }, [field]); // <-- add `field` to the dependency array to re-fetch when it changes

  const handleAddUnit = async () => {
    if (newUnit.trim() === "") return;

    dispatch(addUnit(newUnit, field, subject));
    setIsModalOpen(false);
  };

  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center" >
      <Box textAlign="center">
        <Heading  mb={4}>
          Choose a unit to learn
        </Heading>
        <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          Add Unit
        </Button>
        <HStack spacing={4}>
          {units && 
            Object.values(units).map((unit) => (
              <Button
                key={unit._id}
                as={RouterLink}
                to={{ 
                  pathname: `/learn/${subject}/${field.toLowerCase()}/${unit?.name.toLowerCase()}`,
                  search: `?chapter=1&page=1`
                }}
                colorScheme="blue"
                size="small"
                fontSize="xl"
                p={5}
                _hover={{ opacity: 0.8 }}
              >
                {unit.name}
              </Button>
            ))}
        </HStack>
      </Box>
      <CustomModalDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        bodyPlaceHoderText={"Add Unit"}
        modalValue={newUnit}
        setModalValue={setNewUnit}
        headerText={"Add Unit"}
        footerText={"Add"}
        handleModalAdd={handleAddUnit}
      />
    </Box>
  );
};

export default UnitSelectPage;
