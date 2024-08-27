import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../../src/hooks/useFetch';
import { getGifs } from '../../src/utils';

// Mocking getGifs function to control its behavior during tests
jest.mock('../../src/utils', () => ({
  getGifs: jest.fn(),
}));

describe('useFetch Custom Hook Tests', () => {
  let originalConsoleError;

  beforeEach(() => {
    // Preserve the original console.error to restore it after tests
    originalConsoleError = console.error;
    // Suppress console.error output during tests to avoid clutter
    console.error = jest.fn();
    // Clear any previous mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Restore the original console.error after each test
    console.error = originalConsoleError;
  });

  const category = 'Dragon Ball';
  const mockGifs = [
    { id: '1', title: 'Test Gif 1', url: 'https://example.com/gif1.gif' },
    { id: '2', title: 'Test Gif 2', url: 'https://example.com/gif2.gif' },
  ];

  test('should return initial state', async () => {
    // Render the hook and wait for it to settle
    const { result } = renderHook(() => useFetch(category));

    // Wait for the hook's state to be updated
    await waitFor(() => {
      const { images, isLoading } = result.current;
      // Verify that the initial state is correctly set
      expect(images).toBeDefined();
      expect(images).toHaveLength(0); // Ensure images array is initially empty
      expect(isLoading).toBe(true); // isLoading should be true initially
    });
  });

  test('should return an array of GIFs and isLoading = false after successful fetch', async () => {
    // Mock the getGifs function to return mock data
    getGifs.mockResolvedValue(mockGifs);

    // Render the hook and wait for it to settle
    const { result } = renderHook(() => useFetch(category));

    // Wait for the hook's state to be updated
    await waitFor(() => {
      const { images, isLoading } = result.current;
      // Verify that the GIFs are returned and isLoading is set to false
      expect(images).toBeDefined();
      expect(images).toHaveLength(mockGifs.length); // Check the number of GIFs
      expect(isLoading).toBe(false); // Ensure isLoading is false after fetch
    });

    // Verify the exact data returned
    const { images, isLoading } = result.current;
    expect(images).toEqual(mockGifs);
    expect(isLoading).toBe(false);
  });

  test('should handle errors gracefully', async () => {
    const errorMessage = 'Failed to fetch GIFs';
    // Mock the getGifs function to reject with an error
    getGifs.mockRejectedValue(new Error(errorMessage));

    // Render the hook and wait for it to settle
    const { result } = renderHook(() => useFetch(category));

    // Wait for the hook's state to be updated
    await waitFor(() => {
      const { images, isLoading } = result.current;
      // Verify that the state handles the error gracefully
      expect(images).toBeDefined();
      expect(images).toHaveLength(0); // No GIFs should be returned on error
      expect(isLoading).toBe(false); // isLoading should be false after error
    });
  });

  test('should handle empty category', async () => {
    const emptyCategory = '';
    // Mock the getGifs function to return an empty array
    getGifs.mockResolvedValue([]);

    // Render the hook and wait for it to settle
    const { result } = renderHook(() => useFetch(emptyCategory));

    // Wait for the hook's state to be updated
    await waitFor(() => {
      const { images, isLoading } = result.current;
      // Verify that the state handles an empty category correctly
      expect(images).toBeDefined();
      expect(images).toHaveLength(0); // No GIFs should be returned for an empty category
      expect(isLoading).toBe(false); // isLoading should be false after fetch
    });
  });
});
