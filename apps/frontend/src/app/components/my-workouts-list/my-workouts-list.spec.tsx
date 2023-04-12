import { render } from '@testing-library/react';

import MyWorkoutsList from './my-workouts-list';

describe('MyWorkoutsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MyWorkoutsList />);
    expect(baseElement).toBeTruthy();
  });
});
