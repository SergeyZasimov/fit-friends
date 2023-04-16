import { render } from '@testing-library/react';

import CustomerUsersCatalogFilter from './customer-users-catalog-filter';

describe('CustomerUsersCatalogFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerUsersCatalogFilter />);
    expect(baseElement).toBeTruthy();
  });
});
