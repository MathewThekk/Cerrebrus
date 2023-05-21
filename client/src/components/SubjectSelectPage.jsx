import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Heading, HStack, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSubjects, addSubject } from "../actions/subjectActions";
import CustomModal from "./modals/customModal";

const SubjectSelectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subjects);
  console.log(subjects);

  useEffect(() => {
    dispatch(getSubjects());
  }, []);

  const handleAddSubject = async () => {
    if (newSubjectName.trim() === "") return;

    await dispatch(addSubject(newSubjectName));
    setIsModalOpen(false);
  };

  return (
    <Box h="100vh" display="flex" justifyContent="center" alignItems="center" bgGradient="linear(to-b, #4F3BA8, #141E30)">
      <Box textAlign="center">
        <Heading color="white" mb={4}>
          Choose a subject to learn
        </Heading>
        <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
          Add Subject
        </Button>
        <HStack spacing={4}>
          {subjects && Object.values(subjects).map((subject) => (
            <Button 
              key={subject._id} 
              as={RouterLink} 
              to={`/learn/${subject.name.toLowerCase()}/fieldselect`}
              colorScheme="blue" 
              size="small" 
              // bgImage={`url(${subject.imageUrl})`}
              // bgSize="cover"
              fontSize="xl"
              p={5}
              _hover={{ opacity: 0.8 }}
            >
              {subject.name}
            </Button>
          ))}
        </HStack>
      </Box>
      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        bodyPlaceHoderText={"Add Subject"}
        modalValue={newSubjectName}
        setModalValue={setNewSubjectName}
        headerText={"Add Subject"}
        footerText={"Add"}
        handleModalAdd={handleAddSubject}
      />
    </Box>
  );
};

export default SubjectSelectPage;
