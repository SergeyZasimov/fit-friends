import { render } from '@testing-library/react';

import ModalOverlay from './modal-overlay';

describe('ModalOverlay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ModalOverlay />);
    expect(baseElement).toBeTruthy();
  });
});
