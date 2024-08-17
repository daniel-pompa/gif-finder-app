import { useState } from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';

function App() {
  const [categories, setCategories] = useState(['Dragon Ball']);

  /**
   * Handles the addition of new categories.
   * Checks if the new category already exists (case-insensitive).
   * Adds the new category to the beginning of the array if it does not exist.
   *
   * @param {String} newCategory - The new category to be added.
   */
  const handleAddCategory = newCategory => {
    // Validate that categories are not repeated
    const categoryExists = categories.find(element => {
      return element.toLowerCase() === newCategory.toLowerCase();
    });
    if (categoryExists) return;
    setCategories([newCategory, ...categories]);
  };

  return (
    <>
      <div className='header'>
        <div className='container'>
          <h1>Gif Finder</h1>
          <p>Encuentra GIFs con la API de GIPHY y React con Vite.</p>
          <AddCategory onNewCategory={handleAddCategory} />
        </div>
      </div>

      <div className='container'>
        {categories.map(category => (
          <div className='category-container' key={category}>
            <GifGrid category={category} />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
