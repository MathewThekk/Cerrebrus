import Unit from "../models/unitModel.js";
import Subject from "../models/subjectModel.js";
import Field from "../models/fieldModel.js";

export const addUnit = async (req, res) => {
  const { subject: subjectName, field:fieldName } = req.params;
  const { unit: unitName } = req.query;

  try {
    // Find the Subject document that matches the subject
    const subject = await Subject.findOne({
      name: { $regex: new RegExp(subjectName, "i") },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Find the Field document that matches the field name and belongs to the subject
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
      subject: subject._id,
    });

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    // Create a new Unit document and save it to the database
    const newUnit = new Unit({
      name: unitName,
      field: field._id,
    });
    await newUnit.save();

    // Add the new Unit to the units array of the field and save the field
    field.units.push(newUnit._id);
    await field.save();

    console.log(newUnit);

    // Return the new Unit document as the response
    res.status(201).send(newUnit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while saving new unit" });
  }
};

export const getUnits = async (req, res) => {
  try {
    const { subject: subjectName, field: fieldName } = req.params;

    // Find the Subject document that matches the subjectName
    const subject = await Subject.findOne({
      name: { $regex: new RegExp(subjectName, "i") },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Find the Field document that matches the fieldName and belongs to the subject
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
      subject: subject._id,
    });

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    const fieldId = field._id;
    const units = await Unit.find({ field: fieldId });

    res.status(200).send(units);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while getting all units" });
  }
};
