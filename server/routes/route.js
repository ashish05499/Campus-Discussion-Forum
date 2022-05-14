import express from 'express';
import { Register, Login, Logout } from '../controller/auth-controller.js'
import { requireLogin } from '../middleware/requireLogin.js';
import { CreatePost, getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controller.js';
import upload from '../utils/upload.js'
import {uploadImage, getImage} from '../controller/image-controller.js'
import { newAnswer, getAnswers, deleteAnswer } from '../controller/answer-controller.js';


const router = express.Router();

router.post('/register', Register);
router.post ('/login', Login);
router.get('/logout', Logout)

router.post('/create', requireLogin, CreatePost);
router.get('/posts', requireLogin, getAllPosts);
router.get('/post/:id', requireLogin, getPost);
router.put('/update/:id', requireLogin, updatePost)
router.delete('/delete/:id', requireLogin, deletePost)

router.post('/file/upload',upload.single('file'), uploadImage)
router.get('/file/:filename', requireLogin, getImage);

router.post('/answer/new', requireLogin, newAnswer);
router.get('/answers/:id', requireLogin, getAnswers);
router.delete('/answer/delete/:id', requireLogin, deleteAnswer);

export default router;