import { render } from '@testing-library/react';

import CustomerGymsCatalogCard from './customer-gyms-catalog-card';

describe('CustomerGymsCatalogCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerGymsCatalogCard />);
    expect(baseElement).toBeTruthy();
  });
});
