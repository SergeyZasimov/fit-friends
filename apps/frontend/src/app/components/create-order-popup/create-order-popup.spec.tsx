import { render } from '@testing-library/react';

import CreateOrderPopup from './create-order-popup';

describe('CreateOrderPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateOrderPopup />);
    expect(baseElement).toBeTruthy();
  });
});
