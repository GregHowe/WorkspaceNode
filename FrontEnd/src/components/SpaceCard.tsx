import React from 'react';
import { Space } from '../types/Space';

interface Props {
  space: Space;
}

const SpaceCard: React.FC<Props> = ({ space }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
      <h3>{space.name}</h3>
      <p>{space.description}</p>
      <p><strong>Capacity:</strong> {space.capacity}</p>
    </div>
  );
};

export default SpaceCard;
