import { getGifs } from '../../src/utils/get-gifs';
import { getEnvironments } from '../../src/utils/get-environments';

// Mocking the getEnvironments function to return a dummy API key
jest.mock('../../src/utils/get-environments', () => ({
  getEnvironments: jest.fn(),
}));

describe('Tests for getGifs function', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructors and methods
    // This ensures that mocks and spies are reset before each test
    jest.clearAllMocks();
  });

  test('should fetch and return gifs correctly', async () => {
    const mockApiKey = 'test_api_key';
    const mockData = {
      data: [
        {
          id: '1',
          title: 'Gif 1',
          images: { downsized_medium: { url: 'https://example.com/gif1.gif' } },
        },
        {
          id: '2',
          title: 'Gif 2',
          images: { downsized_medium: { url: 'https://example.com/gif2.gif' } },
        },
      ],
    };

    // Mock the getEnvironments function to return a dummy API key
    getEnvironments.mockReturnValue({ VITE_GIPHY_API_KEY: mockApiKey });

    // Mock the global fetch function to return a resolved promise with mockData
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    // Call the getGifs function and check the result
    const gifs = await getGifs('developer');

    // Verify the returned GIFs match the expected structure
    expect(gifs).toEqual([
      { id: '1', title: 'Gif 1', url: 'https://example.com/gif1.gif' },
      { id: '2', title: 'Gif 2', url: 'https://example.com/gif2.gif' },
    ]);

    // Ensure fetch was called with the correct URL and was called only once
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.giphy.com/v1/gifs/search?api_key=${mockApiKey}&q=developer&limit=12`
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('should handle fetch errors', async () => {
    const mockApiKey = 'test_api_key';
    // Mock the getEnvironments function to return a dummy API key
    getEnvironments.mockReturnValue({ VITE_GIPHY_API_KEY: mockApiKey });

    // Mock the global fetch function to return a rejected promise
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch error'));

    // Call getGifs and assert it throws the expected error
    await expect(getGifs('developer')).rejects.toThrow('Fetch error');

    // Ensure fetch was called with the correct URL and was called only once
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.giphy.com/v1/gifs/search?api_key=${mockApiKey}&q=developer&limit=12`
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('should handle JSON parsing errors', async () => {
    const mockApiKey = 'test_api_key';
    // Mock the getEnvironments function to return a dummy API key
    getEnvironments.mockReturnValue({ VITE_GIPHY_API_KEY: mockApiKey });

    // Mock the global fetch function to return a resolved promise with a JSON parsing error
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockRejectedValue(new Error('JSON parse error')),
    });

    // Call getGifs and assert it throws the expected error
    await expect(getGifs('developer')).rejects.toThrow('JSON parse error');

    // Ensure fetch was called with the correct URL and was called only once
    expect(global.fetch).toHaveBeenCalledWith(
      `https://api.giphy.com/v1/gifs/search?api_key=${mockApiKey}&q=developer&limit=12`
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
