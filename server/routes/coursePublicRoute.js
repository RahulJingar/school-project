// server/routes/coursePublicRoute.js
const express = require("express");
const route = express.Router();
const coursePublicController = require("../controller/coursePublicController");

route.get("/courses", coursePublicController.getAllPublishedCourses);
route.get("/courses/:id", coursePublicController.getCourseByIdPublic);

module.exports = route;
