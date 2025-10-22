import React from 'react';
import { Space } from '../types/Space';

interface Props {
  space: Space;
}

const SpaceCard: React.FC<Props> = ({ space }) => {
  return (
    <div className="card">
      <h3>{space.name}</h3>
      <p>{space.description}</p>
      <p><strong>Capacity:</strong> {space.capacity}</p>
    </div>
  );
};

export default SpaceCard;
