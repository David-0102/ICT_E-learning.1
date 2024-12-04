const Course = require('../models/course'); // Assuming you have a Course model

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses from the database
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newCourse = new Course({ title, description });
    await newCourse.save(); // Save to the database
    res.status(201).json(newCourse); // Respond with the new course
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(updatedCourse); // Respond with the updated course
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" }); // Respond with success message
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};

module.exports = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
};
