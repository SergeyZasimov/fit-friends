import { render } from '@testing-library/react';

import WorkoutListCard from './workout-list-card';

describe('WorkoutListCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WorkoutListCard />);
    expect(baseElement).toBeTruthy();
  });
});
