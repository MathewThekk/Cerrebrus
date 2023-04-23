import Subject from "../models/subjectModel.js";

export const addSubject = async (req, res) => {
  const { subject } = req.body;
  const newSubject = new Subject({
    name: subject,
  });

  try {
    await newSubject.save();

    res.status(201).json(newSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while saving new subject" });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    console.log(3, subjects);

    res.status(201).send(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while getting all subjects" });
  }
};
