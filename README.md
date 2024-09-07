# GIF Finder

**GIF Finder** is a React-based application that allows you to search for and view GIFs using the [GIPHY API](https://developers.giphy.com/). Easily explore and browse a diverse range of GIFs and images through an intuitive and user-friendly interface.

## Project Goal

The primary goal of this project is to explore and demonstrate the practical implementation of custom Hooks in React. It aims to:

- **Showcase** the effectiveness of custom Hooks in addressing specific challenges.
- **Enhance** development skills and understanding of advanced React concepts.

## Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Hooks](#hooks)
8. [Demo](#live-demo)
9. [Contributing](#contributing)
10. [License](#license)
11. [Author](#author)
12. [Acknowledgements](#acknowledgements)

## Features

- Search for GIFs using the GIPHY API.
- Display search results in a grid layout.
- Responsive design to ensure compatibility across various devices.
- Custom Hooks for API calls and state management.
- Error handling and loading states.

## Requirements

You need to have the following installed:

A source code editor such as [VSCode](https://code.visualstudio.com/), [Sublime Text](https://www.sublimetext.com/), or any other editor of your choice.

[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F.svg?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![npm](https://img.shields.io/badge/npm-%23CB3837.svg?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)

> [!NOTE]
> Clicking on the Node.js badge will take you to the Node.js website, where you can download the installer. It is recommended to use the stable version. When you install Node.js, npm will be installed automatically.

Check your Node.js and npm installation by running:

```bash
node --version
npm --version
```

## Technology Stack

<div>
  <img src="https://skillicons.dev/icons?i=vite" alt="Vite" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=react" alt="React" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=js" alt="JavaScript" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=html" alt="HTML5" width="40" height="40" />
  <img src="https://skillicons.dev/icons?i=css" alt="CSS3" width="40" height="40" />
</div>

## Project structure

```bash
├───📁 public/
├───📁 src/
│   ├───📁 assets/
│   │   ├───📁 fonts/
│   ├───📁 components/
│   ├───📁 hooks/
│   ├───📁 utils/
│   ├───📄 App.jsx
│   ├───📄 index.css
│   └───📄 main.jsx
├───📁 tests/
├───📄 eslint.config.js
├───📄 example.env
├───📄 babel.config.cjs
├───📄 index.html
├───📄 jest.config.cjs
├───📄 jest.setup.js
├───📄 LICENSE
├───📄 package.json
├───📄 README.md
└───📄 vite.config.js
```

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/daniel-pompa/gif-finder-app.git
```

2. **Navigate to the project directory:**

```bash
cd gif-finder-app
```

3. **Install dependencies:**

```bash
npm install
```

4. **Run the development server:**

```bash
npm run dev
```

> [!NOTE]
> The server will typically run on <http://localhost:5173>, but check the output on your terminal to be sure.

## Hooks

`useFetch` a custom Hook to handle API requests to GIPHY and manage loading, data, and error states.

```js
import { useEffect, useState } from 'react';
import { getGifs } from '../utils';

export const useFetch = category => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    const newImages = await getGifs(category);
    setImages(newImages);
    setIsLoading(false);
  };

  useEffect(() => {
    getImages();
  }, []);

  return {
    images,
    isLoading,
  };
};
```

### Example

```js
import PropTypes from 'prop-types';
import { useFetch } from '../hooks/useFetch';
import GifItem from './GifItem';
import { Spinner } from './Spinner';

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
```

## Usage

Once the development server is running, you can open your browser and navigate to <http://localhost:5173> to view the application. The main functionalities include searching for GIFs and viewing the results in a grid layout.

### Main Features

1. **Search for GIFs**:
   - Enter a search term in the search bar at the top of the page and press `Enter`.
   - The application will fetch and display GIFs related to your search term.

2. **View GIFs**:
   - The fetched GIFs will be displayed in a responsive grid layout.
   - Scroll through the grid to browse the available GIFs.

> [!TIP]
> If you encounter issues while using the application, refer to the following troubleshooting tips:
>
> - **No Results**: If you don't see any results, try a different search term or check your internet connection.
> - **Loading Issues**: If the GIFs are not loading, ensure that your development server is running correctly and check the console for any errors.

## Live Demo

Explore the live demo of the application at the following link: [GIF Finder](https://gif-finder-react.vercel.app/)

<div>
  <img src="./src/assets/images/dragon-ball.gif" alt="Dragon Ball GIF" width="300" height="200">
</div>

Discover the features live and see the app in action!

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.

[![MIT License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)

> [!NOTE]
> Clicking on the MIT License badge for see the LICENSE file for details.

## Author

This project is maintained and developed by **Daniel Pompa Pareja**.

## Acknowledgements

Special thanks to the developers and contributors of:

- **[Vite](https://vitejs.dev/)** for the fast and modern build tool.
- **[React](https://es.react.dev/)** for the powerful UI library.
- **[GIPHY](https://developers.giphy.com/)** for providing a robust and accessible API that powers the core functionality of this application.

I would like to extend my sincere thanks to:

- **[Node.js](https://nodejs.org/en)** for offering a powerful and efficient runtime environment for JavaScript.
- **[npm](https://www.npmjs.com/)** for being a crucial tool in managing project dependencies and packages.
- **[Skillicons](https://skillicons.dev/)** for high-quality icons that enhance the visual appeal of this project.
- **Open Source Community** for the countless resources, tutorials, and tools available that have supported our learning journey.

[Back to Top](#table-of-contents)
