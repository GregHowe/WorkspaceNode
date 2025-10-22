import { Router } from 'express';
import {
  getSpaces,
  createSpace,
  getSpaceById,
  updateSpace,
  deleteSpace
} from '../controllers/spaceController';

const router = Router();

router.get('/', getSpaces);
router.get('/:id', getSpaceById);
router.post('/', createSpace);
router.put('/:id', updateSpace);
router.delete('/:id', deleteSpace);

export default router;
