import express from "express";
import { getTutorials, addTutorialPage, getTutorialPage, updateTutorialPage, deleteTutorialPage, updateChapterName } from "../controllers/tutorialController.js";
import { addSubject, getSubjects } from "../controllers/subjectController.js";
import { addField, getFields } from "../controllers/fieldController.js";
import { addUnit, getUnits, deleteUnit, updateUnitName } from "../controllers/unitController.js";
import { getComments, addComment, updateComment, deleteComment, likeComment, dislikeComment } from "../controllers/commentController.js";
import { authenticationCheck, adminAuthorisationCheck } from "../middleware/authMiddleware.js";



const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/subjectselect", authenticationCheck, getSubjects);
router.post("/subjectselect",authenticationCheck, adminAuthorisationCheck, addSubject);

router.get("/:subject/fieldSelect", authenticationCheck, getFields);
router.post("/:subject/fieldselect/addfield",authenticationCheck, adminAuthorisationCheck, addField);

router.get("/:subject/:field/unitselect", authenticationCheck,getUnits);
router.post("/:subject/:field/addunit",authenticationCheck, adminAuthorisationCheck, addUnit);
router.put("/:subject/:field/:unit/updateunitname",authenticationCheck, adminAuthorisationCheck, updateUnitName)
router.delete("/:subject/:field/deleteunit",authenticationCheck, adminAuthorisationCheck, deleteUnit);

router.get("/:subject/:field/:unit/", authenticationCheck, getTutorials);
router.get("/:subject/:field/:unit?chapter=", authenticationCheck, getTutorialPage);
router.post("/:subject/:field/:unit/", authenticationCheck, adminAuthorisationCheck, addTutorialPage);
router.put("/:subject/:field/:unit/", authenticationCheck, adminAuthorisationCheck, updateTutorialPage);
router.put("/:subject/:field/:unit/updatechaptername", authenticationCheck, adminAuthorisationCheck, updateChapterName);
router.delete("/:subject/:field/:unit/",authenticationCheck, adminAuthorisationCheck, deleteTutorialPage);

router.get("/comments/:tutorialid",authenticationCheck, getComments);
router.post("/:subject/:field/:unit/comments/:tutorialid", authenticationCheck, addComment);
router.put("/:subject/:field/:unit/comments/:commentid", authenticationCheck, updateComment);
router.delete("/:subject/:field/:unit/comments/:commentid",authenticationCheck, deleteComment);
router.put("/likecomment/:commentid", authenticationCheck, likeComment);
router.put("/dislikecomment/:commentid", authenticationCheck, dislikeComment);


export default router;
