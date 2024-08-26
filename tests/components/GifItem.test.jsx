import { render, screen, fireEvent } from '@testing-library/react';
import GifItem from '../../src/components/GifItem';

describe('Tests for <GifItem /> component', () => {
  const title = 'Dragon Ball';
  const url = 'https://dragon-ball.com/goku.gif';

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocks and original methods
  });

  test('should render correctly', () => {
    const { container } = render(<GifItem title={title} url={url} />);
    expect(container).toMatchSnapshot(); // Ensure the component renders correctly by comparing with a snapshot
  });

  test('should display the correct title and image', () => {
    render(<GifItem title={title} url={url} />);

    // Check if the title is rendered correctly
    expect(screen.getByText(title)).toBeInTheDocument();

    // Check that the image source URL and alt text match the expected values
    const { src, alt } = screen.getByRole('img');
    expect(src).toBe(url);
    expect(alt).toBe(title);
  });

  test('should trigger download on click', async () => {
    render(<GifItem title={title} url={url} />);

    // Mock the fetch function and related behavior
    const blob = new Blob(['GIF89a'], { type: 'image/gif' });
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      blob: () => Promise.resolve(blob),
    });

    // Mock the URL object and its methods
    const mockCreateObjectURL = jest.fn(() => 'blob-url');
    const mockRevokeObjectURL = jest.fn();

    // Override the global URL object methods with mocks
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    const mockClick = jest.fn();

    // Mock the creation of the <a> element
    jest.spyOn(document, 'createElement').mockReturnValue({
      href: '',
      download: '',
      click: mockClick,
    });

    // Simulate a click on the component
    const card = screen.getByText(title).closest('div');
    fireEvent.click(card);

    // Wait for the async operations to complete
    await screen.findByText(title);

    // Verify that the fetch, URL creation, and click actions occurred
    expect(mockFetch).toHaveBeenCalledWith(url);
    expect(mockCreateObjectURL).toHaveBeenCalledWith(blob);
    expect(mockClick).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob-url');

    // Clean up mocks
    mockFetch.mockRestore();
    jest.restoreAllMocks(); // This will restore all URL mocks
  });

  test('should handle errors during download', async () => {
    render(<GifItem title={title} url={url} />);

    // Mock fetch to reject with an error
    const mockFetch = jest
      .spyOn(global, 'fetch')
      .mockRejectedValue(new Error('Fetch error'));
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    // Simulate a click on the component
    const card = screen.getByText(title).closest('div');
    fireEvent.click(card);

    // Wait for the async operations to complete
    await screen.findByText(title);

    // Verify that the error was logged
    expect(mockFetch).toHaveBeenCalledWith(url);
    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error downloading the GIF:',
      expect.any(Error)
    );

    // Clean up mocks
    mockFetch.mockRestore();
    mockConsoleError.mockRestore();
  });
});
