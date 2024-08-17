import PropTypes from 'prop-types';

/**
 * GifItem component that renders a single GIF with its title.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the GIF.
 * @param {string} props.url - The URL of the GIF image.
 * @returns {JSX.Element} The rendered GifItem component.
 */
const GifItem = ({ title, url }) => {
  return (
    <div className='card'>
      <img src={url} alt={title} />
      <p>{title}</p>
    </div>
  );
};

GifItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default GifItem;
