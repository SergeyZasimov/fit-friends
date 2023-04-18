import { render } from '@testing-library/react';

import CustomerCardUser from './customer-card-user';

describe('CustomerCardUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerCardUser />);
    expect(baseElement).toBeTruthy();
  });
});
