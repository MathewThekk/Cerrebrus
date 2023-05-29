import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Heading, Flex, Button, VStack } from "@chakra-ui/react"
import { Link as RouterLink, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getFields, addField } from "../../../actions/fieldActions"
import CustomModalDialog from "../../modals/CustomModalDialog"

const FieldSelectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newField, setnewField] = useState("")
  const dispatch = useDispatch()
  const { subject } = useParams() // <-- use `useParams` to get the subject from the URL

  const fields = useSelector((state) => state.fields)
  console.log(fields)

  useEffect(() => {
    dispatch(getFields(subject))
  }, [dispatch, subject])

  const handleAddField = async () => {
    if (newField.trim() === "") return

    // replace spaces with hyphens
    const fieldWithHyphens = newField.replace(/\s+/g, "-")

    dispatch(addField(fieldWithHyphens, subject))
    setIsModalOpen(false)
  }

  return (
    <VStack align="center" justify="center" textAlign="center" maxW="100%" w="100%" minH="70vh" mt="5">
      <Button align="flex-start" onClick={() => setIsModalOpen(true)}>
        Add Field
      </Button>
      <Heading mb={4}>Choose a field</Heading>
      <Flex align="center" justify="center" spacing={4} wrap="wrap">
        {fields &&
          Object.values(fields).map((field) => (
            <Button key={field._id} as={RouterLink} to={`/learn/${subject}/${field.name.toLowerCase()}/unitselect`} _hover={{ opacity: 0.8 }}>
              {field.name.replace(/-/g, " ")}
            </Button>
          ))}
      </Flex>

      <CustomModalDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} bodyPlaceHoderText={"Add Field"} modalValue={newField} setModalValue={setnewField} headerText={"Add Field"} footerText={"Add"} handleModalAdd={handleAddField} />
    </VStack>
  )
}

export default FieldSelectPage
