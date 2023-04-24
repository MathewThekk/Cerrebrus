import express from 'express';
import addTutorial from '../controllers/tutorialController.js';
import { addSubject, getSubjects } from '../controllers/subjectController.js';
import { addField, getFields } from '../controllers/fieldController.js';
import { addUnit, getUnits } from '../controllers/unitController.js';

const router = express.Router();
// import auth from "../middleware/auth.js";



router.post("/:subject/:subsubject/:unit/add-slide/:type", addTutorial);

router.get("/subjectselect", getSubjects);
router.post("/subjectselect", addSubject);

router.get("/:subject/fieldSelect", getFields);
router.post("/:subject/fieldselect/addfield", addField);

router.get("/:subject/:field/unitselect", getUnits);
router.post("/:subject/:field/addunit", addUnit);

router.get("/:subject/:field/:unit/chapter", getUnits);
router.post("/:subject/:field/addunit", addUnit);



export default router;