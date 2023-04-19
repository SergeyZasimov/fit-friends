import { render } from '@testing-library/react';

import CustomerGymsCatalogList from './customer-gyms-catalog-list';

describe('CustomerGymsCatalogList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerGymsCatalogList />);
    expect(baseElement).toBeTruthy();
  });
});
