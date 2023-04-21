import { render } from '@testing-library/react';

import CustomerMyPurchase from './customer-my-purchase';

describe('CustomerMyPurchase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerMyPurchase />);
    expect(baseElement).toBeTruthy();
  });
});
