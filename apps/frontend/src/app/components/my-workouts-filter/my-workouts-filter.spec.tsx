import { render } from '@testing-library/react';

import MyWorkoutsFilter from './my-workouts-filter';

describe('MyWorkoutsFilter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyWorkoutsFilter />);
    expect(baseElement).toBeTruthy();
  });
});
