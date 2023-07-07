import Tutorial from "../models/tutorialModel.js"
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

    const tutorialPage = await Tutorial.findOne({
      unit: unit._id,
      chapterNumber: chapterNumber,
      page: page,
    })

    if (tutorialPage) {
      //since we are inserting a new tutorial in existing page, all existing tutorials pushed forward by 1 page
      await Tutorial.updateMany(
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
    const newTutorialPage = new Tutorial({
      pageType: pageType,
      content: content,
      page: page,
      chapterNumber: chapterNumber,
      chapterName: chapterName,
      unit: unit._id,
    })

    const createdTutorialPage = await newTutorialPage.save()
    unit.tutorialIds.push(createdTutorialPage._id)
    await unit.save()

    const tutorials = await Tutorial.find({
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

    const tutorialPageToDelete = await Tutorial.findById(id) // Find the tutorial by id

    if (!tutorialPageToDelete) {
      return res.status(404).json({ message: "Tutorial page not found" })
    }

    const unit = await Unit.findById(tutorialPageToDelete.unit)

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" })
    }

    // Decrement the page number of the following tutorials
    await Tutorial.updateMany(
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
    await Tutorial.findByIdAndDelete(id)

    // Remove tutorial from unit's tutorials array
    unit.tutorialIds = unit.tutorialIds.filter((tutorialId) => tutorialId.toString() !== id)
    await unit.save()

    const tutorials = await Tutorial.find({
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

    const tutorialPage = await Tutorial.findOne({
      unit: unit._id,
      chapterNumber: chapterNumber,
      page: page,
    })

    if (tutorialPage) {
      tutorialPage.content = content

      await tutorialPage.save()

      const tutorials = await Tutorial.find({
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
    const { newChapterName } = req.body

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

    await Tutorial.updateMany(
      {
        unit: unit._id,
        chapterNumber: chapterNumber,
      },
      {
        chapterName: newChapterName,
      }
    )

    const tutorials = await Tutorial.find({
      unit: unit._id,
    })
    res.status(200).send(tutorials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}
export const updateChapterNumber = async (req, res) => {
  try {
    const { tutorialid } = req.params

    const newChapterNumber = req.query.newChapterNumber // Access chapterNumber query parameter

    const tutorialPage = await Tutorial.findById(tutorialid)

    if (tutorialPage) {
      tutorialPage.chapterNumber = parseInt(newChapterNumber)
      console.log(tutorialPage)

      await tutorialPage.save()

      res.status(200).send(tutorialPage)
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

    const tutorials = await Tutorial.find({
      unit: unit._id,
    })

    res.status(200).send(tutorials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while getting all units", error: error.message })
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

    const tutorial = await Tutorial.findOne({
      unit: unit._id,
      chapter: chapter,
      page: page,
    })

    res.status(200).send(tutorial)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while getting all units" })
  }
}

export const addOrUpdateAdditionalInformation = async (req, res) => {
  const { tutorialid } = req.params
  const { additionalInformationContent } = req.body

  try {
    const tutorialPage = await Tutorial.findById(tutorialid)

    if (tutorialPage) {
      tutorialPage.additionalInformationContent = additionalInformationContent

      await tutorialPage.save()

      res.status(200).send(tutorialPage)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

export const deleteAdditionalInformation = async (req, res) => {
  const { tutorialid } = req.params

  try {
    const tutorialPage = await Tutorial.findById(tutorialid)

    if (tutorialPage) {
      tutorialPage.additionalInformationContent = null

      await tutorialPage.save()

      return res.status(200).send(tutorialPage)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
