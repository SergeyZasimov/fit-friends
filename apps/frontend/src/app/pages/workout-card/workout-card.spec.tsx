import { render } from '@testing-library/react';

import WorkoutCard from './workout-card';

describe('WorkoutCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkoutCard />);
    expect(baseElement).toBeTruthy();
  });
});
