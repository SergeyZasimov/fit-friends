import { render } from '@testing-library/react';

import CustomerGymsCatalog from './customer-gyms-catalog';

describe('CustomerGymsCatalog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerGymsCatalog />);
    expect(baseElement).toBeTruthy();
  });
});
