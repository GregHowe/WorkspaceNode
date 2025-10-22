import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Space } from '../entities/Space';
import { handleError } from '../utils/errorHandler';

const spaceRepository = AppDataSource.getRepository(Space);

export const getSpaces = async (req: Request, res: Response) => {
  try {
    const spaces = await spaceRepository.find({ relations: ['place'] });
    res.json({ ok: true, data: spaces });
  } catch (error) {
      handleError(res, error, 'Error fetching spaces');
  }
};

export const createSpace = async (req: Request, res: Response) => {
  try {
    const { name, type, placeId, capacity} = req.body;

    const space = spaceRepository.create({
      name,
      type,
      capacity,
      place: { id: placeId },
    });

    const savedSpace = await spaceRepository.save(space);
    res.status(201).json({ ok: true, data: savedSpace });
  } catch (error) {
      handleError(res, error, 'Error creating space');
  }
};

export const getSpaceById = async (req: Request, res: Response) => {
  try {
    const space = await spaceRepository.findOne({
      where: { id: req.params.id },
      relations: ['place'],
    });

    if (!space) {
      return res.status(404).json({ ok: false, msg: 'Space not found' });
    }

    res.json({ ok: true, data: space });
  } catch (error) {
    handleError(res, error, 'Error fetching space by ID');
  }
};

export const updateSpace = async (req: Request, res: Response) => {
  try {
    const { name, type, placeId, capacity } = req.body;

    const space = await spaceRepository.findOneBy({ id: req.params.id });
    if (!space) {
      return res.status(404).json({ ok: false, msg: 'Space not found' });
    }

    space.name = name ?? space.name;
    space.type = type ?? space.type;
    space.capacity = capacity ?? space.capacity;
    if (placeId) space.place = { id: placeId };

    const updatedSpace = await spaceRepository.save(space);
    res.json({ ok: true, data: updatedSpace });
  } catch (error) {
    handleError(res, error, 'Error updating space');
  }
};

export const deleteSpace = async (req: Request, res: Response) => {
  try {
    const result = await spaceRepository.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ ok: false, msg: 'Space not found' });
    }

    res.json({ ok: true, msg: 'Space deleted successfully' });
  } catch (error) {
    handleError(res, error, 'Error deleting space');
  }
};
