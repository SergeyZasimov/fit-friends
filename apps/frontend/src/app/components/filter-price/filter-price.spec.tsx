import { render } from '@testing-library/react';

import FilterPrice from './filter-price';

describe('FilterPrice', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterPrice />);
    expect(baseElement).toBeTruthy();
  });
});
