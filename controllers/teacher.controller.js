const teacherRepo = require("../repository/teacher.repo");

class TeacherController {
  async renderTeacherPage(req, res) {
    try {
      const teachers = await teacherRepo.findAll();
      res.render("addTeacher", { teachers });
    } catch (error) {
      console.error(error);
      req.flash("error", "Unable to render teacher page");
      res.redirect("/teacher");
    }
  }

  async createTeacher(req, res) {
    try {
      const { name } = req.body;
      await teacherRepo.create({ name });
      req.flash("success", "Teacher created successfully");
      res.redirect("/teacher");
    } catch (error) {
      console.error(error);
      req.flash("error", "Error creating teacher");
      res.redirect("/teacher");
    }
  }
}

module.exports = new TeacherController();
