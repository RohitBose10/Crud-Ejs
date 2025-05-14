const Teacher = require("../models/teacher.model");

class TeacherRepository {
  async findAll() {
    try {
      return Teacher.find();
    } catch (err) {
      return err;
    }
  }

  async create(data) {
    try {
      return Teacher.create(data);
    } catch (err) {
      return err;
    }
  }
}

module.exports = new TeacherRepository();
