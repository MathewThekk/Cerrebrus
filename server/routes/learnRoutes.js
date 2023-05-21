import express from "express";
import { getTutorials, addTutorialPage, getTutorialPage, updateTutorialPage, deleteTutorialPage } from "../controllers/tutorialController.js";
import { addSubject, getSubjects } from "../controllers/subjectController.js";
import { addField, getFields } from "../controllers/fieldController.js";
import { addUnit, getUnits } from "../controllers/unitController.js";

const router = express.Router();
// import auth from "../middleware/auth.js";

router.get("/subjectselect", getSubjects);
router.post("/subjectselect", addSubject);

router.get("/:subject/fieldSelect", getFields);
router.post("/:subject/fieldselect/addfield", addField);

router.get("/:subject/:field/unitselect", getUnits);
router.post("/:subject/:field/addunit", addUnit);

router.get("/:subject/:field/:unit/", getTutorials);
router.get("/:subject/:field/:unit?chapter=", getTutorialPage);
router.post("/:subject/:field/:unit/", addTutorialPage);
router.put("/:subject/:field/:unit/", updateTutorialPage);
router.delete("/:subject/:field/:unit/", deleteTutorialPage);

export default router;
