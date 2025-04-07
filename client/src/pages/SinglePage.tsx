import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type ItemType = {
  id: number;
  name: string;
  description: string;
};

function SinglePage() {
  const { id } = useParams();
  
  const [item, setItem] = useState<ItemType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.API_URL}/items/${id}`)
      .then(res => res.json())
      .then(data => setItem(data))
      .catch(err => {
        setError('Failed to fetch item');
        console.error('Failed to fetch item', err);
      });
  }, [id]);

  return (
    <div className="detail">
      <Link to="/">Go Back</Link>
      <h2>Item Details</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      {item ? (
        <>
          <p>ID: {item.id}</p>
          <p>Name: {item.name}</p>
          <p>Description: {item.description}</p>
        </>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
  
}

export default SinglePage;
