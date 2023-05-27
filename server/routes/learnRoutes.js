import express from "express";
import { getTutorials, addTutorialPage, getTutorialPage, updateTutorialPage, deleteTutorialPage, updateChapterName } from "../controllers/tutorialController.js";
import { addSubject, getSubjects } from "../controllers/subjectController.js";
import { addField, getFields } from "../controllers/fieldController.js";
import { addUnit, getUnits, deleteUnit, updateUnitName } from "../controllers/unitController.js";
import { getComments, addComment, updateComment, deleteComment } from "../controllers/commentController.js";

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/subjectselect", getSubjects);
router.post("/subjectselect", addSubject);

router.get("/:subject/fieldSelect", getFields);
router.post("/:subject/fieldselect/addfield", addField);

router.get("/:subject/:field/unitselect", getUnits);
router.post("/:subject/:field/addunit", addUnit);
router.put("/:subject/:field/:unit/updateunitname", updateUnitName)
router.delete("/:subject/:field/deleteunit", deleteUnit);

router.get("/:subject/:field/:unit/", getTutorials);
router.get("/:subject/:field/:unit?chapter=", getTutorialPage);
router.post("/:subject/:field/:unit/", addTutorialPage);
router.put("/:subject/:field/:unit/", updateTutorialPage);
router.put("/:subject/:field/:unit/updatechaptername", updateChapterName);
router.delete("/:subject/:field/:unit/", deleteTutorialPage);

router.get("/:subject/:field/:unit/comments/:tutorialid", getComments);
router.post("/:subject/:field/:unit/comments/:tutorialid", addComment);
router.put("/:subject/:field/:unit/comments/:commentid", updateComment);
router.delete("/:subject/:field/:unit/comments/:commentid", deleteComment);

export default router;
