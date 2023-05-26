import TutorialPage from "../models/tutorialPageModel.js"
import Unit from "../models/unitModel.js"
import Field from "../models/fieldModel.js"

export const addTutorialPage = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params
    const chapterNumber = req.query.chapter // Access chapterNumber query parameter
    const page = req.query.page // Access page query parameter
    const { pageType, content, chapterName } = req.body

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
      //since we are inserting a new tutorial in existing page, all existing tutorials pushed forward by 1 page
      await TutorialPage.updateMany(
        {
          unit: unit._id,
          chapterNumber: chapterNumber,
          page: { $gte: page },
        },
        {
          $inc: { page: 1 },
        }
      )
    }
    const newTutorialPage = new TutorialPage({
      pageType: pageType,
      content: content,
      page: page,
      chapterNumber: chapterNumber,
      chapterName: chapterName,
      unit: unit._id,
    })

    const createdTutorialPage = await newTutorialPage.save()
    unit.tutorials.push(createdTutorialPage)
    unit.tutorialIds.push(createdTutorialPage._id)
    await unit.save()

    const tutorials = await TutorialPage.find({
      unit: unit._id,
    })
    res.status(200).send(tutorials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

export const deleteTutorialPage = async (req, res) => {
  try {
    const id = req.query.pageId

    console.log(456, id)

    const tutorialPageToDelete = await TutorialPage.findById(id) // Find the tutorial by id

    if (!tutorialPageToDelete) {
      return res.status(404).json({ message: "Tutorial page not found" })
    }

    const unit = await Unit.findById(tutorialPageToDelete.unit)

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" })
    }

    // Decrement the page number of the following tutorials
    await TutorialPage.updateMany(
      {
        unit: unit._id,
        chapterNumber: tutorialPageToDelete.chapterNumber,
        page: { $gt: tutorialPageToDelete.page },
      },
      {
        $inc: { page: -1 },
      }
    )

    // Delete the tutorial
    await TutorialPage.findByIdAndDelete(id)

    // Remove tutorial from unit's tutorials array
    unit.tutorials = unit.tutorials.filter((tutorial) => tutorial._id.toString() !== id)
    unit.tutorialIds = unit.tutorialIds.filter((tutorialId) => tutorialId.toString() !== id)
    await unit.save()

    const tutorials = await TutorialPage.find({
      unit: unit._id,
    })
    res.status(200).send(tutorials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

export const updateTutorialPage = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params
    const chapterNumber = req.query.chapter // Access chapterNumber query parameter
    const page = req.query.page // Access page query parameter
    const { pageType, content, chapterName } = req.body

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
      tutorialPage.content = content

      const updatedTutorialPage = await tutorialPage.save()
      unit.tutorials.map((tutorial) => {
        if (tutorial._id === updateTutorialPage._id) tutorial.content = updateTutorialPage.content
      })
      await unit.save()
      const tutorials = await TutorialPage.find({
        unit: unit._id,
      })
      res.status(200).send(tutorials)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}

export const updateChapterName = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params
    const chapterNumber = req.query.chapter // Access chapterNumber query parameter
    const {newChapterName} = req.body
    console.log(999, req.body, newChapterName)

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

    await TutorialPage.updateMany(
      {
        unit: unit._id,
        chapterNumber: chapterNumber,
      },
      {
        chapterName: newChapterName,
      }
    )

    const tutorials = await TutorialPage.find({
      unit: unit._id,
    })
    res.status(200).send(tutorials)
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
