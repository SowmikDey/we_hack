import express from 'express';
import { protectUser } from '../middleware/protectUser.js';
import { postPrompt,fetchData } from '../prompts/fetch.js';

const router = express.Router();

router.post('/postprompt',protectUser,postPrompt);
router.get('/fetchdata',protectUser,fetchData);

export default router;