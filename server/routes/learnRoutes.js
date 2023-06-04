import express from "express";
import { getTutorials, addTutorialPage, getTutorialPage, updateTutorialPage, deleteTutorialPage, updateChapterName } from "../controllers/tutorialController.js";
import { addSubject, getSubjects } from "../controllers/subjectController.js";
import { addField, getFields } from "../controllers/fieldController.js";
import { addUnit, getUnits, deleteUnit, updateUnitName } from "../controllers/unitController.js";
import { getComments, addComment, updateComment, deleteComment } from "../controllers/commentController.js";
import { authenticationCheck, adminCheck } from "../middleware/authMiddleware.js";

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/subjectselect", getSubjects);
router.post("/subjectselect",authenticationCheck, adminCheck, addSubject);

router.get("/:subject/fieldSelect", getFields);
router.post("/:subject/fieldselect/addfield",authenticationCheck, adminCheck, addField);

router.get("/:subject/:field/unitselect", getUnits);
router.post("/:subject/:field/addunit",authenticationCheck, adminCheck, addUnit);
router.put("/:subject/:field/:unit/updateunitname",authenticationCheck, adminCheck, updateUnitName)
router.delete("/:subject/:field/deleteunit",authenticationCheck, adminCheck, deleteUnit);

router.get("/:subject/:field/:unit/", getTutorials);
router.get("/:subject/:field/:unit?chapter=", getTutorialPage);
router.post("/:subject/:field/:unit/", authenticationCheck, adminCheck, addTutorialPage);
router.put("/:subject/:field/:unit/", authenticationCheck, adminCheck, updateTutorialPage);
router.put("/:subject/:field/:unit/updatechaptername", authenticationCheck, adminCheck, updateChapterName);
router.delete("/:subject/:field/:unit/",authenticationCheck, adminCheck, deleteTutorialPage);

router.get("/comments/:tutorialid",authenticationCheck, getComments);
router.post("/:subject/:field/:unit/comments/:tutorialid", authenticationCheck, addComment);
router.put("/:subject/:field/:unit/comments/:commentid", authenticationCheck, updateComment);
router.delete("/:subject/:field/:unit/comments/:commentid",authenticationCheck, deleteComment);

export default router;
