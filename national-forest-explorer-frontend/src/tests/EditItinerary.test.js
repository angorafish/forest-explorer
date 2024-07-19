import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditItineraryModal from './EditItineraryModal';
import Modal from 'react-modal';
import axios from '../services/axiosConfig';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/axiosConfig');

const mockItinerary = {
  id: 1,
  name: 'Mock Trip',
  startDate: '2023-07-01',
  endDate: '2023-07-10',
  description: 'A mock description'
};

describe('EditItineraryModal', () => {
  beforeAll(() => {
    Modal.setAppElement('body');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props) => {
    return render(<EditItineraryModal {...props} />);
  };

  it('should render the modal with correct title for editing an itinerary', () => {
    renderComponent({ isOpen: true, onClose: jest.fn(), itinerary: mockItinerary });
    expect(screen.getByText('Edit Itinerary')).toBeInTheDocument();
    expect(screen.getByLabelText('Name').value).toBe(mockItinerary.name);
    expect(screen.getByLabelText('Start Date').value).toBe(mockItinerary.startDate);
    expect(screen.getByLabelText('End Date').value).toBe(mockItinerary.endDate);
    expect(screen.getByLabelText('Description').value).toBe(mockItinerary.description);
  });

  it('should render the modal with correct title for creating a new itinerary', () => {
    renderComponent({ isOpen: true, onClose: jest.fn(), itinerary: null });
    expect(screen.getByText('Create New Trip')).toBeInTheDocument();
    expect(screen.getByLabelText('Name').value).toBe('');
    expect(screen.getByLabelText('Start Date').value).toBe('');
    expect(screen.getByLabelText('End Date').value).toBe('');
    expect(screen.getByLabelText('Description').value).toBe('');
  });

  it('should call the correct API endpoint when saving an edited itinerary', async () => {
    axios.put.mockResolvedValue({});

    renderComponent({ isOpen: true, onClose: jest.fn(), itinerary: mockItinerary });
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Updated Trip' } });
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(`/api/itineraries/${mockItinerary.id}`, {
        name: 'Updated Trip',
        startDate: mockItinerary.startDate,
        endDate: mockItinerary.endDate,
        description: mockItinerary.description
      });
    });
  });

  it('should call the correct API endpoint when creating a new itinerary', async () => {
    axios.post.mockResolvedValue({});

    renderComponent({ isOpen: true, onClose: jest.fn(), itinerary: null });
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Trip' } });
    fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2023-07-01' } });
    fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2023-07-10' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'A new description' } });
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/itineraries', {
        name: 'New Trip',
        startDate: '2023-07-01',
        endDate: '2023-07-10',
        description: 'A new description'
      });
    });
  });

  it('should close the modal without making an API call when the cancel button is clicked', () => {
    const onCloseMock = jest.fn();
    renderComponent({ isOpen: true, onClose: onCloseMock, itinerary: mockItinerary });

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCloseMock).toHaveBeenCalled();
    expect(axios.put).not.toHaveBeenCalled();
    expect(axios.post).not.toHaveBeenCalled();
  });
});
