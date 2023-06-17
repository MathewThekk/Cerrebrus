import Subject from "../models/subjectModel.js";
import Field from "../models/fieldModel.js";

export const addField = async (req, res) => {
  const { subject: subjectName } = req.params;
  const { field } = req.query;

  try {
    // Find the Subject document that matches the subject
    const subject = await Subject.findOne({
      name: { $regex: new RegExp(subjectName, "i") },
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Create a new Field document and save it to the database
    const newField = new Field({
      name: field,
      subject: subject._id, // Set the subject property to the _id of the subject
    });
    await newField.save();


    // Add the new Field to the fields array of the subject and save the subject
    subject.fields.push(newField._id);
    await subject.save();

    // Return the new Field document as the response
    res.status(201).send(newField);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while saving new field" });
  }
};

export const getFields = async (req, res) => {
  try {
    const { subject: subjectName } = req.params;

    // Find the Subject document that matches the subjectName
    const subject = await Subject.findOne({  name: { $regex: new RegExp(subjectName, "i") } })

    // If no matching subject is found, return a 404 error response
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    const subjectId = subject._id;
    const fields = await Field.find({ subject: subjectId });
    res.status(200).json(fields);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while getting all fields" });
  }
};
