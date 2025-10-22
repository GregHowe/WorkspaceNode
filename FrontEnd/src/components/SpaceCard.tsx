import React from 'react';
import { Space } from '../types/Space';

interface Props {
  space: Space;
}

const SpaceCard: React.FC<Props> = ({ space }) => {
  return (
    <div className="card">
        <h3>{space.name}</h3>
        <hr />
        <p>{space.description}</p>
        <p><b>Tipo:</b> {space.type}</p>
        <p><strong>Capacity:</strong> {space.capacity}</p>
        <p><b>Ubicación:</b> {space.place?.name}</p>
    </div>
  );
};

export default SpaceCard;
