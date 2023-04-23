import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Heading, HStack, Button } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFields, addField } from "../actions/fieldActions";
import CustomModal from "./modals/customModal";

const FieldSelectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newField, setnewField] = useState("");
  const dispatch = useDispatch();
  const { subject } = useParams(); // <-- use `useParams` to get the subject from the URL

  const fields = useSelector((state) => state.fields?.entities?.fields);
  console.log(fields);

  useEffect(() => {
    dispatch(getFields(subject)); 
  }, [subject]); 

  const handleAddField = async () => {
    if (newField.trim() === "") return;

    await dispatch(addField(newField, subject));
    setIsModalOpen(false);
  };

  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center" bgGradient="linear(to-b, #4F3BA8, #141E30)">
      <Box textAlign="center">
        <Heading color="white" mb={4}>
          Choose a field to learn
        </Heading>
        <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          Add Field
        </Button>
        <HStack spacing={4}>
          {fields &&
            Object.values(fields).map((field) => (
              <Button
                key={field._id}
                as={RouterLink}
                to={`/learn/${subject}/${field.name.toLowerCase()}/unitselect`}
                colorScheme="blue"
                size="small"
                // bgImage={`url(${field.imageUrl})`}
                // bgSize="cover"
                fontSize="xl"
                p={5}
                _hover={{ opacity: 0.8 }}
              >
                {field.name}
              </Button>
            ))}
        </HStack>
      </Box>
      <CustomModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bodyPlaceHoderText={"Add Field"} modalValue={newField} setModalValue={setnewField} headerText={"Add Field"} footerText={"Add"} handleModalAdd={handleAddField} />
    </Box>
  );
};

export default FieldSelectPage;
