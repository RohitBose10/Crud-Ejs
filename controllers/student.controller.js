const studentRepo = require("../repository/student.repo");
const teacherRepo = require("../repository/teacher.repo");

class StudentController {
  async renderStudentPage(req, res) {
    try {
      const students = await studentRepo.findAll();
      const teachers = await teacherRepo.findAll();
      res.render("add", { students, teachers });
    } catch (error) {
      console.error(error);
      req.flash("error", "Unable to render student page");
      res.redirect("/add");
    }
  }

  async createStudent(req, res) {
    try {
      const { name, age, email, phoneNumber, teacherId } = req.body;
      await studentRepo.create({ name, age, email, phoneNumber, teacherId });
      req.flash("success", "Student created successfully");
      res.redirect("/list");
    } catch (error) {
      console.error(error);
      req.flash("error", "Error creating student");
      res.redirect("/add");
    }
  }

  async listStudents(req, res) {
    try {
      const students = await studentRepo.findAll();
      res.render("list", { students });
    } catch (error) {
      console.error(error);
      req.flash("error", "Error fetching students");
      res.redirect("/add");
    }
  }

  async editStudentRender(req, res) {
    try {
      const student = await studentRepo.findById(req.params.id);
      if (!student) {
        req.flash("error", "Student not found");
        return res.redirect("/list");
      }
      res.render("edit", { student });
    } catch (error) {
      console.error(error);
      req.flash("error", "Error loading edit form");
      res.redirect("/list");
    }
  }

  async updateStudent(req, res) {
    try {
      const { name, age, email, phoneNumber } = req.body;
      const student = await studentRepo.updateById(
        req.params.id,
        { name, age, email, phoneNumber },
        { new: true }
      );
      if (!student) {
        req.flash("error", "Student not found");
        return res.redirect("/list");
      }

      req.flash("success", "Student updated successfully");
      res.redirect("/list");
    } catch (error) {
      console.error(error);
      req.flash("error", "Error updating student");
      res.redirect("/list");
    }
  }

  async deleteStudent(req, res) {
    try {
      const student = await studentRepo.deleteById(req.params.id);
      if (!student) {
        req.flash("error", "Student not found");
        return res.redirect("/list");
      }

      req.flash("success", "Student deleted successfully");
      res.redirect("/list");
    } catch (error) {
      console.error(error);
      req.flash("error", "Error deleting student");
      res.redirect("/list");
    }
  }
}

module.exports = new StudentController();
