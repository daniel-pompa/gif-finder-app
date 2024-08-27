import { render, screen, fireEvent } from '@testing-library/react';
import { AddCategory } from '../../src/components/AddCategory';

describe('<AddCategory /> Component Tests', () => {
  let onNewCategory;

  // This function runs before each test, initializing the mock function.
  beforeEach(() => {
    onNewCategory = jest.fn();
  });

  test('should render correctly and match snapshot', () => {
    const { container } = render(<AddCategory onNewCategory={onNewCategory} />);
    expect(container).toMatchSnapshot();
  });

  test('should update the input value when typing', () => {
    render(<AddCategory onNewCategory={onNewCategory} />);
    const input = screen.getByPlaceholderText('Buscar GIFs');

    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(input.value).toBe('Hello');
  });

  test('should call onNewCategory with valid input and clear the input', () => {
    render(<AddCategory onNewCategory={onNewCategory} />);
    const input = screen.getByPlaceholderText('Buscar GIFs');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'Goku' } });
    fireEvent.submit(form);

    expect(input.value).toBe(''); // Ensure the input is cleared
    expect(onNewCategory).toHaveBeenCalledTimes(1); // Ensure the function is called once
    expect(onNewCategory).toHaveBeenCalledWith('Goku'); // Ensure it was called with the correct argument
  });

  test('should not call onNewCategory if the input is empty or has a single character', () => {
    render(<AddCategory onNewCategory={onNewCategory} />);
    const input = screen.getByPlaceholderText('Buscar GIFs');
    const form = screen.getByRole('form');

    // Test with a single character
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.submit(form);
    expect(onNewCategory).not.toHaveBeenCalled();

    // Test with an empty input
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.submit(form);
    expect(onNewCategory).not.toHaveBeenCalled();
  });
});
