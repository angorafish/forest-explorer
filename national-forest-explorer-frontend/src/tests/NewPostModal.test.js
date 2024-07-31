import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewPostModal from './NewPostModal';
import axios from '../services/axiosConfig';

jest.mock('../services/axiosConfig');

describe('NewPostModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders NewPostModal component', () => {
    render(<NewPostModal isOpen={true} onClose={onClose} />);
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByLabelText('Post Type:')).toBeInTheDocument();
    expect(screen.getByLabelText('Location:')).toBeInTheDocument();
  });

  it('handles post submission correctly', async () => {
    axios.post.mockResolvedValue({});
    render(<NewPostModal isOpen={true} onClose={onClose} />);
    fireEvent.change(screen.getByLabelText('Location:'), { target: { value: 'Test Location' } });
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('handles post type change correctly', () => {
    render(<NewPostModal isOpen={true} onClose={onClose} />);
    fireEvent.change(screen.getByLabelText('Post Type:'), { target: { value: 'review' } });
    expect(screen.getByLabelText('Rating:')).toBeInTheDocument();
    expect(screen.getByLabelText('Review Text:')).toBeInTheDocument();
  });
});