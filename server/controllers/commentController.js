import Comment from "../models/commentModel.js"
import Tutorial from "../models/tutorialModel.js"

export const getComments = async (req, res) => {
  const { tutorialid } = req.params

  try {
    const tutorial = await Tutorial.findById(tutorialid)

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" })
    }

    const comments = await Comment.find({
      tutorialId: tutorial._id,
    })

    res.status(200).send(comments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while getting comments" })
  }
}

export const addComment = async (req, res) => {
  const { tutorialid } = req.params
  const { content } = req.body

  try {
    const tutorial = await Tutorial.findById(tutorialid)

    if (!tutorial) {
      return res.status(404).json({ message: "Tutorial not found" })
    }

    const newComment = new Comment({
      tutorialId: tutorial._id,
      content: content,
    })
    await newComment.save()

    tutorial.commentsId.push(newComment._id)
    await tutorial.save()

    const comments = await Comment.find({
      tutorialId: tutorialid,
    })

    res.status(201).send(comments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while saving new comment" })
  }
}

export const deleteComment = async (req, res) => {
  const { commentid } = req.params

  try {
    const comment = await Comment.findById(commentid)

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }

    await Comment.findByIdAndDelete(comment._id)

    const comments = await Comment.find({
      tutorialId: comment.tutorialId,
    })

    res.status(201).send(comments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while deleting comment" })
  }
}

export const updateComment = async (req, res) => {
  const { commentid } = req.params
  const { content } = req.body

  try {
    const comment = await Comment.findById(commentid)

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" })
    }

    comment.content = content
    await comment.save()
    const comments = await Comment.find({
      tutorialId: comment.tutorialId,
    })

    res.status(201).send(comments)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while updating comment" })
  }
}
