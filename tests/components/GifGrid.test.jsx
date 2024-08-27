import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetch } from '../../src/hooks/useFetch';

// Mock `getEnvironments` to provide a specific API key for testing
jest.mock('../../src/utils/get-environments', () => ({
  getEnvironments: jest.fn(() => ({
    VITE_GIPHY_API_KEY: 'test_api_key', // Mocked API key for tests
  })),
}));

// Mock the custom hook `useFetch`
jest.mock('../../src/hooks/useFetch');

describe('<GifGrid /> Component Tests', () => {
  // Reset mocks before each test to ensure clean test state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render correctly and match snapshot while loading', () => {
    // Mock the hook to simulate loading state
    useFetch.mockReturnValue({
      images: [],
      isLoading: true,
    });

    const category = 'Dragon Ball';
    const { container } = render(<GifGrid category={category} />);

    // Ensure component renders correctly in loading state
    expect(container).toMatchSnapshot();
  });

  test('should render correctly and match snapshot with images', () => {
    // Mock the hook to simulate loaded state with images
    useFetch.mockReturnValue({
      images: [
        { id: '1', title: 'Test Gif 1', url: 'https://example.com/gif1.gif' },
        { id: '2', title: 'Test Gif 2', url: 'https://example.com/gif2.gif' },
      ],
      isLoading: false,
    });

    const category = 'Dragon Ball';
    const { container } = render(<GifGrid category={category} />);

    // Ensure component renders correctly with images
    expect(container).toMatchSnapshot();

    // Verify if images are rendered
    expect(screen.getByText('Test Gif 1')).toBeInTheDocument();
    expect(screen.getByText('Test Gif 2')).toBeInTheDocument();
  });

  test('should display the correct category title', () => {
    // Mock the hook to simulate a non-loading state with no images
    useFetch.mockReturnValue({
      images: [],
      isLoading: false,
    });

    const category = 'Dragon Ball';
    render(<GifGrid category={category} />);

    // Verify if the category title is correctly rendered
    expect(screen.getByText(category)).toBeInTheDocument();
  });

  test('should handle missing images correctly', () => {
    // Mock the hook to simulate a non-loading state with no images
    useFetch.mockReturnValue({
      images: [],
      isLoading: false,
    });

    const category = 'Dragon Ball';
    render(<GifGrid category={category} />);

    // Verify that no images are rendered when the list is empty
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
