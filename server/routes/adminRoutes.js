import express from "express";
import { adminLogin, getAllComments, approveCommentById, getAllBlogsAdmin, deleteCommentbyId, getDashbooard } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentbyId);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getDashbooard);
export default adminRouter;