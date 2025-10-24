import React from 'react';

interface Props {
  spaces: any[];
  selectedSpaceId: string;
  onChange: (value: string) => void;
}

const SpaceSelector: React.FC<Props> = ({ spaces, selectedSpaceId, onChange }) => (
  <span>Space: &nbsp;
    <select value={selectedSpaceId} onChange={e => onChange(e.target.value)}>
      <option value="">Selecciona un espacio</option>
      {spaces.map(space => (
        <option key={space.id} value={space.id}>
          {space.name} ({space.type}) - Capacidad: {space.capacity}
        </option>
      ))}
    </select>
  </span>
);

export default SpaceSelector;
