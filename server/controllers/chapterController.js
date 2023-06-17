import ChapterPage from "../models/chapterPageModel.js";
import Unit from "../models/unitModel.js";
import Subject from "../models/subjectModel.js";
import Field from "../models/fieldModel.js";

// @desc      Add a chapter
// @route     POST /api/subjects/:subjectId/subsubjects/:subsubjectId/units/:unitId/chapters
// @access    Private
export const addChapterPage = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params;
    const chapter = req.query.chapter; // Access chapter query parameter
    const page = req.query.page; // Access page query parameter
    const { pageType, content } = req.body;

    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
    });

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    // Find the unit that belongs to the field and subject
    const unit = await Unit.findOne({
      name: { $regex: new RegExp(unitName, "i") },
      field: field._id,
    });

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const chapterPage = await ChapterPage.findOne({
      unit: unit._id,
      chapter: chapter,
      page: page,
    });

    if (chapterPage) {
      // Update the chapter page with new content
      chapterPage.content = content;

      const updatedChapterPage = await chapterPage.save();

      res.status(200).json(updatedChapterPage);
    } else {
      const newChapterPage = new ChapterPage({
        pageType: pageType,
        content: content,
        page: page,
        chapter: chapter,
        unit: unit._id,
      });

      const createdChapterPage = await newChapterPage.save();

      res.status(201).json(createdChapterPage);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getChapters = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params;

    // Find the Subject document that matches the subjectName
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
    });

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    // Find the unit that belongs to the field and subject
    const unit = await Unit.findOne({
      name: { $regex: new RegExp(unitName, "i") },
      field: field._id,
    });

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const unitId = unit._id;
    const chapters = await ChapterPage.find({
      unit: unitId,
    });


    res.status(200).send(chapters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while getting all units" });
  }
};

export const getChapterPage = async (req, res) => {
  try {
    const { field: fieldName, unit: unitName, subject: subjectName } = req.params;
    const chapterName = req.query.chapter; // Access chapter query parameter
    const page = req.query.page; // Access page query parameter

    // Find the field document
    const field = await Field.findOne({
      name: { $regex: new RegExp(fieldName, "i") },
    });

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    // Find the unit that belongs to the field
    const unit = await Unit.findOne({
      name: { $regex: new RegExp(unitName, "i") },
      field: field._id,
    });

    if (!unit) {
      return res.status(404).json({ message: "Unit not found" });
    }

    const unitId = unit._id;
    const chapter = await ChapterPage.findOne({
      unit: unitId,
      chapter: chapterName,
      page: page,
    });


    res.status(200).send(chapter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error while getting all units" });
  }
};
