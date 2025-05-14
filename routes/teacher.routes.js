const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");

router.get("/teacher", teacherController.renderTeacherPage);

router.post("/insertteacher",  teacherController.createTeacher);



module.exports = router;
