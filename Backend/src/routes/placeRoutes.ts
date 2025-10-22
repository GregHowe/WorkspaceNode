import { Router } from 'express';
import { getPlaces, createPlace,updatePlace , deletePlace } from '../controllers/PlaceController';

const router = Router();

router.get('/', getPlaces);
router.post('/', createPlace);
router.put('/:id', updatePlace);
router.delete('/:id', deletePlace);


export default router;
