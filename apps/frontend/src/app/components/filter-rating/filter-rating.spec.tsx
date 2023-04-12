import { render } from '@testing-library/react';

import FilterRating from './filter-rating';

describe('FilterRating', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterRating />);
    expect(baseElement).toBeTruthy();
  });
});
