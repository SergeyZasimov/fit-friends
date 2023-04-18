import { render } from '@testing-library/react';

import MapPopup from './map-popup';

describe('MapPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MapPopup />);
    expect(baseElement).toBeTruthy();
  });
});
