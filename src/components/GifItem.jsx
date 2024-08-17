import PropTypes from 'prop-types';

/**
 * Component that renders a single GIF with its title.
 * Allows users to download the GIF directly to their PC when the image is clicked.
 *
 * @param {Object} props - The component props.
 * @param {String} props.title - The title of the GIF.
 * @param {String} props.url - The URL of the GIF image.
 * @returns {JSX.Element} The rendered GifItem component.
 */
const GifItem = ({ title, url }) => {
  /**  Handles the download of a GIF file. */
  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement('a');
      const urlObject = URL.createObjectURL(blob);

      link.href = urlObject;
      link.download = `${title}.gif`; // Filename for the download
      link.click();

      // Cleanup
      URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error('Error downloading the GIF:', error);
    }
  };

  return (
    <div className='card' onClick={handleDownload} style={{ cursor: 'pointer' }}>
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
