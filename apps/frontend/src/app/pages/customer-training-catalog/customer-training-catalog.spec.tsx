import { render } from '@testing-library/react';

import CustomerTrainingCatalog from './customer-training-catalog';

describe('CustomerTrainingCatalog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerTrainingCatalog />);
    expect(baseElement).toBeTruthy();
  });
});
