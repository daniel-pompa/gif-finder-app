/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getGifs } from '../utils';

/**
 * Custom Hook for fetching GIFs based on a category.
 *
 * This hook manages the fetching of GIFs from an external source based on the specified category.
 * It provides the current state of the GIFs and the loading status to the component that uses this hook.
 *
 * @param {String} category - The category of GIFs to fetch. This determines which GIFs are retrieved from the API.
 * @returns {Object} An object containing:
 *   - {Array} images - An array of GIF objects retrieved from the API.
 *   - {boolean} isLoading - A boolean indicating whether the GIFs are still being fetched.
 *
 * @example
 * const { images, isLoading } = useFetch('Developer');
 *
 * if (isLoading) {
 *   return <h3>Loading...</h3>;
 * }
 *
 * return (
 *   <div>
 *     {images.map(image => (
 *       <img key={image.id} src={image.url} alt={image.title} />
 *     ))}
 *   </div>
 * );
 */
export const useFetch = category => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetches GIFs based on the provided category and updates the state.
   * This function retrieves GIFs from the API and updates the `images` state with the fetched data.
   * It also updates the `isLoading` state to false once the fetching is complete.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the fetching and state updates are complete.
   * @throws {Error} Throws an error if the fetching process fails.
   */
  const getImages = async () => {
    try {
      const newImages = await getGifs(category);
      setImages(newImages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
      setIsLoading(false); // Ensure loading state is updated even if an error occurs
    }
  };

  // Fetch the GIFs when the component mounts
  useEffect(() => {
    getImages();
  }, []);

  return {
    images,
    isLoading,
  };
};
