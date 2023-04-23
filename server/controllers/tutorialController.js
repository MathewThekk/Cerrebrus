import Tutorial from '../models/tutorialModel.js'

// @desc      Add a tutorial
// @route     POST /api/subjects/:subjectId/subsubjects/:subsubjectId/units/:unitId/tutorials
// @access    Private
const addTutorial = async (req, res) => {
  try {
    console.log(1, req.params)
    console.log(2, req.body)
    const { subject, subsubject, unit, type } = req.params;
    const { slide, page } = req.body;

    const newTutorial = new Tutorial({
      content: slide.content,
      slide: JSON.stringify(slide),
      subject: subject,
      subsubject: subsubject,
      unit: unit,
      user: req.user._id,
    });

    const createdTutorial = await newTutorial.save();

    res.status(201).json(createdTutorial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default addTutorial;
