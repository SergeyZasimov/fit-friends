import { render } from '@testing-library/react';

import FilterGymParameters from './filter-gym-parameters';

describe('FilterGymParameters', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterGymParameters />);
    expect(baseElement).toBeTruthy();
  });
});
