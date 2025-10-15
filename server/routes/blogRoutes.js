import express from "express";
import { addBlog } from "../controllers/blog-controller.js";
import { upload } from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";
import { getAllBlogs, getBlogById, deleteBlogByid, togglePublish, addComment, getBlogcomments } from "../controllers/blogController.js";

const blogRouter = express.Router();


blogRouter.post("/add", upload.single('image'),auth, addBlog);
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete', auth, deleteBlogByid);
blogRouter.post('/toggle-publish', auth, togglePublish);

blogRouter.post('./add-comment', addComment);
blogRouter.post('./comments', getBlogcomments)

export default blogRouter;