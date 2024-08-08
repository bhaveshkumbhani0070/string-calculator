import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../app/page';

describe('String Calculator', () => {
  it('displays sum for a single number', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const button = screen.getByText('Calculate');
    
    fireEvent.change(input, { target: { value: '1' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      const sum = screen.getByText(/Sum: 1/i);
      expect(sum).toBeInTheDocument();
    });
  });

  it('displays sum for multiple comma-separated numbers', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const button = screen.getByText('Calculate');
    
    fireEvent.change(input, { target: { value: '1,2,3' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      const sum = screen.getByText(/Sum: 6/i);
      expect(sum).toBeInTheDocument();
    });
  });

  it('displays sum for numbers separated by new lines', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const button = screen.getByText('Calculate');
    
    fireEvent.change(input, { target: { value: '1\n2,3' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      const sum = screen.getByText(/Sum: 6/i);
      expect(sum).toBeInTheDocument();
    });
  });

  it('supports custom delimiter', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const button = screen.getByText('Calculate');
    
    fireEvent.change(input, { target: { value: '//;\n1;2' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      const sum = screen.getByText(/Sum: 3/i);
      expect(sum).toBeInTheDocument();
    });
  });

  it('throws error for negative numbers', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Enter numbers');
    const button = screen.getByText('Calculate');
    
    fireEvent.change(input, { target: { value: '1,-2,3' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      const error = screen.getByText(/Negative numbers not allowed: -2/i);
      expect(error).toBeInTheDocument();
    });
  });
});
