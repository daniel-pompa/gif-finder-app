import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * AddCategory component.
 *
 * This component renders a form with an input field to add new categories.
 * When a new category is submitted, the `onNewCategory` function is called.
 *
 * @prop {Function} onNewCategory - A function that is called when a new category is added.
 * @returns {JSX.Element} The rendered AddCategory component.
 */
export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setInputValue] = useState('');

  /**
   * Event handler for the input change event.
   * Updates the state with the new value of the input field.
   *
   * @param {Object} event - The event object from the input field.
   */
  const onInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  /**
   * Event handler for form submission.
   * Prevents the default form submission.
   * Trims the input value and calls `onNewCategory` if the value is valid.
   * Clears the input field after submission.
   *
   * @param {Object} event - The event object from the form submission.
   */
  const onSubmit = event => {
    event.preventDefault();
    const newInputValue = inputValue.trim();
    if (newInputValue.length <= 1) return;
    onNewCategory(newInputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={onSubmit} aria-label='form'>
      <input
        type='text'
        placeholder='Buscar GIFs'
        value={inputValue}
        onChange={onInputChange}
      />
    </form>
  );
};

AddCategory.propTypes = {
  onNewCategory: PropTypes.func.isRequired,
};
