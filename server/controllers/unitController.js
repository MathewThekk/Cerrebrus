import Unit from "../models/unitModel.js"
import Subject from "../models/subjectModel.js"
import Field from "../models/fieldModel.js"
import Tutorial from "../models/tutorialModel.js"

export const addUnit = async (req, res) => {
  const { subject: subjectName, field: fieldName } = req.params
  const { unit: unitName } = req.query

  try {
    // Find the Subject document that matches the subject
    const subject = await Subject.findOne({
      name: { $regex: new RegExp(subjectName, "i") },
    })

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" })
    }

    // Find the Field document that matches the field name and belongs to the subject
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
      subject: subject._id,
    })

    if (!field) {
      return res.status(404).json({ message: "Field not found" })
    }

    // Create a new Unit document and save it to the database
    const newUnit = new Unit({
      name: unitName,
      field: field._id,
    })
    await newUnit.save()

    // Add the new Unit to the units array of the field and save the field
    field.units.push(newUnit._id)
    await field.save()

    const units = await Unit.find({
      field: field._id,
    })

    res.status(201).send(units)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while saving new unit" })
  }
}

export const getUnits = async (req, res) => {
  try {
    const { subject: subjectName, field: fieldName } = req.params

    const populatetutorial = JSON.parse(req.query.populatetutorial)

    // Find the Subject document that matches the subjectName
    const subject = await Subject.findOne({
      name: { $regex: new RegExp(subjectName, "i") },
    })

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" })
    }

    // Find the Field document that matches the fieldName and belongs to the subject
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
      subject: subject._id,
    })

    if (!field) {
      return res.status(404).json({ message: "Field not found" })
    }

    const fieldId = field._id
    const units = await Unit.find({ field: fieldId })

    if (populatetutorial === true) {
      const units = await Unit.find({ field: fieldId }).populate("tutorialIds")
      return res.status(200).send(units)
    }

    res.status(200).send(units)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while getting all units" })
  }
}

export const deleteUnit = async (req, res) => {
  const { subject: subjectName, field: fieldName } = req.params
  const { unitname: unitName } = req.query

  try {
    // Find the Subject document that matches the subject
    const subject = await Subject.findOne({
      name: { $regex: new RegExp(subjectName, "i") },
    })

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" })
    }

    // Find the Field document that matches the field name and belongs to the subject
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
      subject: subject._id,
    })

    if (!field) {
      return res.status(404).json({ message: "Field not found" })
    }

    const unit = await Unit.findOne({
      field: field._id,
      name: unitName,
    })

    console.log(unitName, "deleting", unit.name)

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" })
    }

    await Unit.findByIdAndDelete(unit._id)
    await Tutorial.deleteMany({
      unit: unit._id,
    })

    const units = await Unit.find({
      field: field._id,
    })

    res.status(201).send(units)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while saving new unit" })
  }
}

export const updateUnitName = async (req, res) => {
  const { subject: subjectName, field: fieldName, unit: unitName } = req.params
  const { newUnitName } = req.body

  try {
    // Find the Subject document that matches the subject
    const subject = await Subject.findOne({
      name: { $regex: new RegExp(subjectName, "i") },
    })

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" })
    }

    // Find the Field document that matches the field name and belongs to the subject
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
      subject: subject._id,
    })

    if (!field) {
      return res.status(404).json({ message: "Field not found" })
    }

    const unit = await Unit.findOne({
      field: field._id,
      name: unitName,
    })

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" })
    }
    const a = await Unit.findByIdAndUpdate(unit._id, { name: newUnitName }, { new: true })
    console.log(a)

    const units = await Unit.find({
      field: field._id,
    })

    res.status(201).send(units)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error while saving new unit" })
  }
}
