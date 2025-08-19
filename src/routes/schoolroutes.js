import express from "express";

import { getSchoolList, postSchool } from "../controller/schoolcontroller.js";

const router = express.Router();


router.post("/addSchool", postSchool
 
);


router.get("/listSchools", getSchoolList);

export default router;
