import PropTypes from 'prop-types';
import { useFetch } from '../hooks/useFetch';
import GifItem from './GifItem';
import { Spinner } from './Spinner';

/**
 * GifGrid component displays a grid of GIFs based on the given category.
 *
 * This component fetches GIFs from the Giphy API based on the provided category and displays them in a grid layout.
 * It also shows a loading indicator while the GIFs are being fetched.
 *
 * @param {Object} props - The component props.
 * @param {String} props.category - The category of GIFs to display.
 * @returns {JSX.Element} The rendered GifGrid component.
 */
export const GifGrid = ({ category }) => {
  const { images, isLoading } = useFetch(category);

  return (
    <>
      <h2>{category}</h2>
      {isLoading && <Spinner />}
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
