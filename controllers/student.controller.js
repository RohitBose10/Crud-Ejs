const Student = require("../models/student.model");

class StudentController {
  //RENDER STUDENT PAGE
  async renderStudentPage(req, res) {
    try {
      const students = await Student.find();
      res.render("add", { students });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
  //CREATE STUDENT
  async createStudent(req, res) {
    try {
      const { name, age, email, phoneNumber } = req.body;
      await Student.create({
        name,
        age,
        email,
        phoneNumber,
      });
      
      req.flash("success", "Student created successfully");
    } catch (error) {
      console.error("Error creating student:", error);
      req.flash("error", "Error creating student");
    }
  }
  //list students in ejs
  async listStudents(req, res) {
    try {
      const students = await Student.find();
      res.render("list", { students });
      req.flash("success", "Student data fetched successfully");
    } catch (error) {
      console.error("Error fetching students:", error);
      req.flash("error", "Error fetching students");
    }

  }


  //edit student render
  async editStudentRender(req, res) {
    try {
      const students = await Student.findById(req.params.id);
      if (!students) {
        console.log("Student not found");
        
      }
      res.render("edit", { students });
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  }
    //update student
    async updateStudent(req, res) {
      try {
        const { name, age, email, phoneNumber } = req.body;
        const students = await Student.findByIdAndUpdate(
          req.params.id,
          {
            name,
            age,
            email,
            phoneNumber,
          },
          { new: true }
        );
        if (!students) {
         
          console.log("Student not found");
          
        }
       
        req.flash("success", "Student updated successfully");
      } catch (error) {
        console.error("Error updating student:", error);
        req.flash("error", "Error updating student");
      }
    }
    //delete student
    async deleteStudent(req, res) {
      try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
          return res.status(404).send("Student not found");
        }
        
        req.flash("success", "Student deleted successfully");
      } catch (error) {
        console.error("Error deleting student:", error);
        req.flash("error", "Error deleting student");
      }
    }
}

module.exports = new StudentController();
