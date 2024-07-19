import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import InviteModal from './InviteModal';
import Modal from 'react-modal';
import axios from '../services/axiosConfig';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/axiosConfig');

const mockItinerary = {
  id: 1,
  name: 'Mock Itinerary'
};

describe('InviteModal', () => {
  beforeAll(() => {
    Modal.setAppElement('body');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props) => {
    return render(<InviteModal {...props} />);
  };

  it('should render the InviteModal component', () => {
    renderComponent({ isOpen: true, onClose: jest.fn(), itinerary: mockItinerary });
    expect(screen.getByText('Invite to Mock Itinerary')).toBeInTheDocument();
  });

  it('should handle email input change', () => {
    renderComponent({ isOpen: true, onClose: jest.fn(), itinerary: mockItinerary });
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should call the correct API endpoint when sending an invitation', async () => {
    axios.post.mockResolvedValue({});
    const onCloseMock = jest.fn();

    renderComponent({ isOpen: true, onClose: onCloseMock, itinerary: mockItinerary });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByText('Send Invitation'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(`/api/itineraries/1/invite`, { email: 'test@example.com' });
      expect(onCloseMock).toHaveBeenCalled();
    });
  });

  it('should close the modal without making an API call when the cancel button is clicked', () => {
    const onCloseMock = jest.fn();
    renderComponent({ isOpen: true, onClose: onCloseMock, itinerary: mockItinerary });

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });
});