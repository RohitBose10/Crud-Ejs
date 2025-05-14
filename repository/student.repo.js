const Student = require("../models/student.model");

class StudentRepository {
  async findById(id) {
    try {
      return Student.findById(id);
    } catch (err) {
      return err;
    }
  }

  async create(data) {
    try {
      return Student.create(data);
    } catch (err) {
      return err;
    }
  }

  async updateById(id, data) {
    try {
      return Student.findByIdAndUpdate(id, data, { new: true });
    } catch (err) {
      return err;
    }
  }

  async deleteById(id) {
    try {
      return Student.findByIdAndDelete(id);
    } catch (err) {
      return err;
    }
  }
  async findAll() {
    try {
      return await Student.aggregate([
        {
          $match: { isdeleted: false },
        },
        {
          $lookup: {
            from: "teachers",
            let: { tId: "$teacherId" },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$tId"] },
                  isdeleted: false,
                },
              },
              {
                $project: {
                  name: 1,
                  _id: 0,
                },
              },
            ],
            as: "teacherInfo",
          },
        },
        {
          $unwind: {
            path: "$teacherInfo",
          },
        },
        {
          // Final output shape
          $project: {
            _id: 1,
            name: 1,
            age: 1,
            email: 1,
            phoneNumber: 1,
            teacherName: "$teacherInfo.name",
          },
        },
      ]);
    } catch (err) {
      console.error("Error fetching student list:", err);
      throw err;
    }
  }
}

module.exports = new StudentRepository();
