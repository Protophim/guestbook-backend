import express from 'express';
import { getEntries, createEntry } from '../controllers/guestbook.controller.js';
import { updateEntry } from '../controllers/guestbook.controller.js';
import { deleteEntry } from '../controllers/guestbook.controller.js';

const router = express.Router();

router.post('/', createEntry);
router.get('/', getEntries);
router.put('/:id', updateEntry);
router.delete('/:id', deleteEntry);

export default router;
