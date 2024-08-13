import { useState } from 'react';

function App() {
  const [categories, setCategories] = useState(['Laboris Proident']);

  return (
    <>
      <div className='header'>
        <div className='container'>
          <h1>Gif Finder</h1>
          <p>Encuentra GIFs con la API de GIPHY y React con Vite.</p>
          <input type='text' placeholder='Buscar GIFs' />
        </div>
      </div>

      <div className='container'>
        <section className='container'>
          {categories.map(category => (
            <div className='category-container' key={category}>
              <h2>{category}</h2>
              <div className='card-grid'>
                <div className='card'>
                  <img src='https://placehold.co/600x400/png' alt='Image' />
                  <p>
                    Laboris proident eiusmod ex sint qui incididunt nostrud anim in magna.
                  </p>
                </div>
                <div className='card'>
                  <img src='https://placehold.co/600x400/png' alt='Image' />
                  <p>
                    Laboris proident eiusmod ex sint qui incididunt nostrud anim in magna.
                  </p>
                </div>
                <div className='card'>
                  <img src='https://placehold.co/600x400/png' alt='Image' />
                  <p>
                    Laboris proident eiusmod ex sint qui incididunt nostrud anim in magna.
                  </p>
                </div>
                <div className='card'>
                  <img src='https://placehold.co/600x400/png' alt='Image' />
                  <p>
                    Laboris proident eiusmod ex sint qui incididunt nostrud anim in magna.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
