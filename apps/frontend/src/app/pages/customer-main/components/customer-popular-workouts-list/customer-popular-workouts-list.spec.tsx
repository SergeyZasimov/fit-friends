import { render } from '@testing-library/react';

import CustomerPopularWorkoutsList from './customer-popular-workouts-list';

describe('CustomerPopularWorkoutsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerPopularWorkoutsList />);
    expect(baseElement).toBeTruthy();
  });
});
