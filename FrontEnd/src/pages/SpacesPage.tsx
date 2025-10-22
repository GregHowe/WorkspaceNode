import React, { useEffect, useState } from 'react';
import { getSpaces } from '../api/spaces';
import { Space } from '../types/Space';
import SpaceCard from '../components/SpaceCard';

const SpacesPage: React.FC = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const data = await getSpaces();
        debugger;
        setSpaces(data.data);
      } catch (err) {
        setError('Failed to load spaces.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Spaces</h2>
      {spaces.map(space => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  );
};

export default SpacesPage;
