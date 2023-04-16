import { render } from '@testing-library/react';

import CustomerUsersCatalogList from './customer-users-catalog-list';

describe('CustomerUsersCatalogList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerUsersCatalogList />);
    expect(baseElement).toBeTruthy();
  });
});
