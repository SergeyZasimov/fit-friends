import { render } from '@testing-library/react';

import CustomerWorkoutDiary from './customer-workout-diary';

describe('WorkoutDiary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerWorkoutDiary />);
    expect(baseElement).toBeTruthy();
  });
});
