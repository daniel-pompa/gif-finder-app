/**
 * Retrieves the current environment variables as an object.
 *
 * @returns {Object} An object containing all environment variables accessible via `import.meta.env`.
 */
export const getEnvironments = () => {
  import.meta.env;

  return {
    ...import.meta.env,
  };
};
