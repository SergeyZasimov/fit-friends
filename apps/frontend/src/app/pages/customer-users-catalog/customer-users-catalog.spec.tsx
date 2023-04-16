import { render } from '@testing-library/react';

import CustomerUsersCatalog from './customer-users-catalog';

describe('CustomerUsersCatalog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerUsersCatalog />);
    expect(baseElement).toBeTruthy();
  });
});
