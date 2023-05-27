import { useState, useEffect } from "react"
import { Flex, Box, Button, Input, Avatar, IconButton, Heading, Text, HStack } from "@chakra-ui/react"
import {  ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import { addComment, getComments, updateComment,deleteComment } from "../../../actions/commentAction"
import { useLocation } from "react-router-dom"

const CommentsSection = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const queryParams = new URLSearchParams(useLocation().search)

  // const [comments, setComments] = useState([])
  const [newCommentContent, setNewCommentContent] = useState("")
  // const [chapterNumber, setChapterNumber] = useState(1)
  // const [currentPage, setCurrentPage] = useState(1)
  const chapterNumber = parseInt(queryParams.get("chapter"))
  const currentPage = parseInt(queryParams.get("page"))

  const tutorial = useSelector((state) => Object.values(state.tutorials).find((t) => t.chapterNumber === chapterNumber && t.page === currentPage)) ?? null
  const comments = useSelector((state) => state.comments)
  console.log(comments)

  useEffect(() => {
    // setChapterNumber(parseInt(queryParams.get("chapter")))
    // setCurrentPage(parseInt(queryParams.get("page")))
    if (tutorial) {
      dispatch(getComments(tutorial._id))
    }
  }, [location, tutorial])

  const handleAddComment = () => {
    console.log("adding comment")
    dispatch(addComment(newCommentContent, tutorial._id))
    setNewCommentContent("")
  }

  const handleDeleteComment = (commentId) => {
    console.log("deleting comment")
    dispatch(deleteComment(commentId))
  }

  const handleUpdateComment = (editedContent, commentId) => {
    console.log("updating comment")
    dispatch(updateComment(editedContent, commentId))
    setNewCommentContent("")
  }

  return (
    <Box ml="19%" pt="10" minH="30rem" maxW="80vw" p={5}>
      <Heading size="lg" mb={5}>
        Comments
      </Heading>
      <Text mb={5}>{comments?.length > 0 ? comments.length : 0} comments</Text>
      {comments && comments.length > 0 && comments.map((comment, index) => <Comment key={index} comment={comment} handleDeleteComment={handleDeleteComment} handleUpdateComment={handleUpdateComment} />)}
      <Flex mt={5}>
        <Avatar size="sm" name="User" />
        <Input placeholder="Add a comment" value={newCommentContent} onChange={(e) => setNewCommentContent(e.target.value)} ml={2} flex={1} />
      </Flex>
      <Flex mt={5}>
        <Button mr={5} onClick={handleAddComment}>
          Add comment
        </Button>
        <Button onClick={null} colorScheme="blue">
          Cancel
        </Button>
      </Flex>
    </Box>
  )
}

export default CommentsSection

const Comment = ({ comment, handleDeleteComment, handleUpdateComment }) => {
  const [isEditing, setEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)

  const handleEdit = () => {
    if (isEditing) {
      handleUpdateComment(editedContent, comment._id)
    }
    setEditing(!isEditing)
  }

  const formattedDate = new Date(comment.updatedAt).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", }).replace(" at", "")

  return (
    <Flex my={2}>
      <Avatar size="sm" name="User"  />
      <Box ml={2} flex={1}>
        <HStack spacing="3">
          <Text>{"Mathew"}</Text>
          <Text fontSize="sm" color="gray.500">
            {formattedDate}{" "}
          </Text>
        </HStack>
        {!isEditing && <Text>{comment.content}</Text>}
        {isEditing && <Input value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />}
        <Flex mt={2} align="center">
          <IconButton size="sm" variant="ghost" icon={<ArrowUpIcon />} aria-label="Like" />
          <Text ml={2}>{comment.likes}</Text>
          <IconButton size="sm" variant="ghost" icon={<ArrowDownIcon />} aria-label="Dislike" ml={2} />
          <Text ml={2}>{comment.dislikes}</Text>
          <Button size="sm" variant="ghost" onClick={handleEdit} ml={2}>
            {isEditing ? "Confirm" : "Edit"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              handleDeleteComment(comment._id)
            }}
            ml={2}
          >
            Delete
          </Button>
        </Flex>

        {comment.replies.map((reply) => (
          <Text ml={5} key={reply.id}>
            {reply.text}
          </Text>
        ))}
      </Box>
    </Flex>
  )
}
