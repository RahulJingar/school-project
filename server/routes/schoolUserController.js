
const express=require("express");
const router=express.Router();
const schoolUserController=require("../controller/schoolUserController");


router.post("/signup",schoolUserController.userSignup);
router.post("/login",schoolUserController.userLogin);

module.exports=router;
