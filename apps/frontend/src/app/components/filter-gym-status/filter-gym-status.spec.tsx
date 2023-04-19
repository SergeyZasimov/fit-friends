import { render } from '@testing-library/react';

import FilterGymStatus from './filter-gym-status';

describe('FilterGymStatus', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterGymStatus />);
    expect(baseElement).toBeTruthy();
  });
});
