// server/routes/coursePublicRoute.js
const express = require("express");
const route = express.Router();
const coursePublicController = require("../controller/coursePublicController");

route.get("/getAllPublishedCourses", coursePublicController.getAllPublishedCourses);
route.get("/getCourseByIdPublic/:id", coursePublicController.getCourseByIdPublic);

module.exports = route;
