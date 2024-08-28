import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../src/App';

// Mock `getEnvironments` to provide a specific API key for testing
jest.mock('../src/utils/get-environments', () => ({
  getEnvironments: jest.fn(() => ({
    VITE_GIPHY_API_KEY: 'test_api_key', // Mocked API key for tests
  })),
}));

describe('App component', () => {
  test('should display initial category', () => {
    render(<App />);
    // Assert that the initial category "Dragon Ball" is displayed in the document
    expect(screen.getByText('Dragon Ball')).toBeInTheDocument();
  });

  test('should add a new category', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Buscar GIFs');
    const form = screen.getByRole('form');

    // Simulate user input for a new category and submit the form
    fireEvent.change(input, { target: { value: 'Ninja Scroll' } });
    fireEvent.submit(form);

    // Wait for the new category to be added and check its presence
    await waitFor(() => {
      expect(screen.getByText('Ninja Scroll')).toBeInTheDocument();
    });
  });

  test('should not add a duplicate category (case insensitive)', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Buscar GIFs');

    // Simulate user input of a duplicate category with different case and submit
    fireEvent.change(input, { target: { value: 'dragon ball' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Wait for the categories to update and verify only one instance is present
    await waitFor(() => {
      expect(screen.getAllByText('Dragon Ball')).toHaveLength(1);
    });
  });

  test('should not add an empty category', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText('Buscar GIFs');

    // Simulate user input of an empty category and submit
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    // Wait for the categories to update and verify the initial category remains
    await waitFor(() => {
      const categories = screen.getAllByText('Dragon Ball');
      expect(categories).toHaveLength(1); // Only the initial category should be present
      expect(categories[0].textContent).toBe('Dragon Ball');
    });
  });
});
