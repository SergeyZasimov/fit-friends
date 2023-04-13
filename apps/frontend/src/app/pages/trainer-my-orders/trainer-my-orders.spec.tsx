import { render } from '@testing-library/react';

import TrainerMyOrders from './trainer-my-orders';

describe('TrainerMyOrders', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainerMyOrders />);
    expect(baseElement).toBeTruthy();
  });
});
