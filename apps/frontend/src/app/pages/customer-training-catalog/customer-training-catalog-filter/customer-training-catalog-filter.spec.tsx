import { render } from '@testing-library/react';

import CustomerTrainingCatalogFilter from './customer-training-catalog-filter';

describe('CustomerTrainingCatalogFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerTrainingCatalogFilter />);
    expect(baseElement).toBeTruthy();
  });
});
