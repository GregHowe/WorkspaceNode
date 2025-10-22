import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Place } from '../entities/Place';
import { handleError } from '../utils/errorHandler';

const placeRepository = AppDataSource.getRepository(Place);

export const getPlaces = async (req: Request, res: Response) => {
  try {
    const places = await placeRepository.find({ relations: ['spaces'] });
    res.json({ ok: true, data: places });
  } catch (error) {
    handleError(res, error, 'Error fetching places');
  }
};

export const createPlace = async (req: Request, res: Response) => {
  try {
    const { name, location, capacity } = req.body;
    const newPlace = placeRepository.create({ name, location, capacity });
    const savedPlace = await placeRepository.save(newPlace);
    res.status(201).json({ ok: true, data: savedPlace });
  } catch (error) {
    handleError(res, error, 'Error creating place');
  }
};

export const updatePlace = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, location, capacity } = req.body;

    const place = await placeRepository.findOneBy({ id });
    if (!place) {
      return res.status(404).json({ ok: false, msg: 'Place not found' });
    }

    place.name = name ?? place.name;
    place.location = location ?? place.location;
    place.capacity = capacity ?? place.capacity;

    const updated = await placeRepository.save(place);
    res.json({ ok: true, data: updated });
  } catch (error) {
    handleError(res, error, 'Error updating place');
  }
};

export const deletePlace = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await placeRepository.delete(id);

    if (result.affected === 0) {
      return res.status(404).json({ ok: false, msg: 'Place not found' });
    }

    res.json({ ok: true, msg: 'Place deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Error deleting place');
  }
};
