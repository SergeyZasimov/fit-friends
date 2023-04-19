import { render } from '@testing-library/react';

import CustomerGymsCatalogFilter from './customer-gyms-catalog-filter';

describe('CustomerGymsCatalogFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerGymsCatalogFilter />);
    expect(baseElement).toBeTruthy();
  });
});
