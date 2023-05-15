import TutorialPage from "../models/tutorialPageModel.js"
import Unit from "../models/unitModel.js"
import Field from "../models/fieldModel.js"

export const addTutorialPage = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params
    const chapterNumber = req.query.chapter // Access chapterNumber query parameter
    const page = req.query.page // Access page query parameter
    const { pageType, content, chapterName } = req.body

    console.log(1234, chapterNumber)

    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
    })

    if (!field) {
      return res.status(404).json({ message: "Field not found" })
    }

    // Find the unit that belongs to the field and subject
    const unit = await Unit.findOne({
      name: { $regex: new RegExp(unitName, "i") },
      field: field._id,
    })

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" })
    }

    const tutorialPage = await TutorialPage.findOne({
      unit: unit._id,
      chapterNumber: chapterNumber,
      page: page,
    })

    if (tutorialPage) {
      // Update the tutorial page with new content
      tutorialPage.content = content

      const updatedTutorialPage = await tutorialPage.save()

      res.status(200).json(updatedTutorialPage)
    } else {
      const newTutorialPage = new TutorialPage({
        pageType: pageType,
        content: content,
        page: page,
        chapterNumber: chapterNumber,
        chapterName: chapterName,
        unit: unit._id,
      })

      const createdTutorialPage = await newTutorialPage.save()

      res.status(201).json(createdTutorialPage)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

export const getTutorials = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params

    // Find the Subject document that matches the subjectName
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
    })

    if (!field) {
      return res.status(404).json({ message: "Field not found" })
    }

    // Find the unit that belongs to the field and subject
    const unit = await Unit.findOne({
      name: { $regex: new RegExp(unitName, "i") },
      field: field._id,
    })

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" })
    }

    const unitId = unit._id
    const tutorials = await TutorialPage.find({
      unit: unitId,
    })

    console.log(tutorials)
    res.status(200).send(tutorials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while getting all units" })
  }
}

export const getTutorialPage = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params
    const chapter = req.query.chapter // Access chapter query parameter
    const page = req.query.page // Access page query parameter

    // Find the field document
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
    })

    if (!field) {
      return res.status(404).json({ message: "Field not found" })
    }

    // Find the unit that belongs to the field
    const unit = await Unit.findOne({
      name: { $regex: new RegExp(unitName, "i") },
      field: field._id,
    })

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" })
    }

    const unitId = unit._id
    const tutorial = await TutorialPage.findOne({
      unit: unitId,
      chapter: chapter,
      page: page,
    })

    console.log(tutorial)
    res.status(200).send(tutorial)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while getting all units" })
  }
}
