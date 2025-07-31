const mongodb = require("../database/connect");
//const ObjectId = require("mongodb").ObjectId;

const getAllDevices = async (req, res) => {
  //#swagger.tags=['classes']
  try {
    const result = await mongodb.getDb().db().collection("devices").find();
    const devices= await result.toArray();
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error to get devices", error);
    res.status(500).json({ message: "Error in server to get devices." });
  }
};
/** 
const getSingleClass = async (req, res) => {
  //#swagger.tags=['classes']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a class.");
    }

    const classId = ObjectId.createFromHexString(req.params.id);
    const class_ = await mongodb
      .getDb()
      .db()
      .collection("classes")
      .findOne({ _id: classId });

    if (!class_) {
      res.status(404).json({ message: "Class no found" });
      return;
    }
    res.status(200).json(class_);
  } catch (error) {
    console.error("Error to get class:", error);

    res.status(500).json({ message: "Error Server to get class" });
  }
};

const createClass = async (req, res) => {
  //#swagger.tags=['classes']
  try {
    if (!req.body.course_code || !req.body.course_name || !req.body.rolled_students) {
      return res
        .status(400)
        .json({ message: "course_code, course_name and rolled_students are necesary. something was wrong" });
    }
    const class_ = {
      course_code: req.body.course_code,
      course_name: req.body.course_name,
      rolled_students: req.body.rolled_students,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection("classes")
      .insertOne(class_);
    if (response.acknowledged) {
      res.status(201).json({
        message: "Class created successfully",
        classId: response.insertedId, // Return the ID of the newly created class
      });
    } else {
      res
        .status(500)
        .json({
          message:
            "Failed to create class: Operation not acknowledged by database.",
        });
    }
  } catch (error) {
    console.error("Error creating class:", error); // Log the actual error for debugging

    // Generic catch-all for other unexpected errors
    res
      .status(500)
      .json({
        message:
          error.message ||
          "An unexpected error occurred while creating the class.",
      });
  }
};

const updateClass = async (req, res) => {
  //#swagger.tags=['classes']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a class.");
    }
    const classId = ObjectId.createFromHexString(req.params.id);
    if (!req.body.course_code || !req.body.course_name) {
      return res.status(400).json({ message: " course_code, course_name." });
    }
    const class_ = {
      course_code: req.body.course_code,
      course_name: req.body.course_name,
      rolled_students: req.body.rolled_students,
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection("classes")
      .replaceOne({ _id: classId }, class_);
    if (response.modifiedCount > 0) {
      res.status(200).json({
        message: "Class update successfully",
        classId: classId, //  as
      });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while updating the class");
    }
  } catch (error) {
    console.error("Error updating the class:", error); // Log the actual error for debugging

    // Generic catch-all for other unexpected errors
    res
      .status(500)
      .json({
        message:
          error.message ||
          "An unexpected error occurred while updating the class.",
      });
  }
};

const deleteClass = async (req, res) => {
  //#swagger.tags=['classes']

  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid contact id to find a class.");
    }

    const classId = ObjectId.createFromHexString(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection("classes")
      .deleteOne({ _id: classId });
    if (response.deletedCount > 0) {
      res.status(200).json({
        message: "Class delete successfully",
        classId: classId,
      });
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while delete the class");
    }
  } catch (error) {
    console.error("Error creating class:", error); // Log the actual error for debugging

    // Generic catch-all for other unexpected errors
    res
      .status(500)
      .json({
        message:
          error.message ||
          "An unexpected error occurred while creating the class.",
      });
  }
};
*/
module.exports = {
  getAllDevices,
  //getSingleClass,
  //createClass,
  //updateClass,
  //deleteClass,
};
