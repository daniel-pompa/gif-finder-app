/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getGifs } from '../utils/get-gifs';
import GifItem from './GifItem';

/**
 * GifGrid component displays a grid of GIFs based on the given category.
 *
 * Fetches GIFs from the Giphy API using the provided category and displays them in a grid layout.
 * The GIFs are retrieved when the component mounts.
 *
 * @param {Object} props - The component props.
 * @param {string} props.category - The category of GIFs to display.
 * @returns {JSX.Element} The rendered GifGrid component.
 */
export const GifGrid = ({ category }) => {
  const [images, setImages] = useState([]);

  const getImages = async () => {
    const newImages = await getGifs(category);
    setImages(newImages);
  };

  // Fetch the GIFs when the component mounts
  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <h2>{category}</h2>
      <div className='card-grid'>
        {images.map(image => (
          <GifItem key={image.id} {...image} />
        ))}
      </div>
    </>
  );
};

GifGrid.propTypes = {
  category: PropTypes.string.isRequired,
};
