const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.get("/", studentController.renderStudentPage);

router.post("/insert", studentController.createStudent);

router.get("/list", studentController.listStudents);

router.get("/edit/:id", studentController.editStudentRender);

router.post("/update/:id", studentController.updateStudent);

router.post("/delete/:id", studentController.deleteStudent);

module.exports = router;
