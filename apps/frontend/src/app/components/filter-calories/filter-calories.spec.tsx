import { render } from '@testing-library/react';

import FilterCalories from './filter-calories';

describe('FilterCalories', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterCalories />);
    expect(baseElement).toBeTruthy();
  });
});
