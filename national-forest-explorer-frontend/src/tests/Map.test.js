import React from 'react';
import { render } from '@testing-library/react';
import Map from './Map';
import '@testing-library/jest-dom/extend-expect';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn(),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    setPopup: jest.fn().mockReturnThis(),
    addTo: jest.fn()
  })),
  Popup: jest.fn(() => ({
    setText: jest.fn().mockReturnThis()
  }))
}));

describe('Map', () => {
  it('should render the Map component', () => {
    render(<Map />);
    expect(document.querySelector('.mapboxgl-map')).toBeInTheDocument();
  });
});