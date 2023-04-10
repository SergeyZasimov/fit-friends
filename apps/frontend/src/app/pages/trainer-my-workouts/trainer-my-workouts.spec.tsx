import { render } from '@testing-library/react';

import TrainerMyWorkouts from './trainer-my-workouts';

describe('TrainerMyWorkouts', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainerMyWorkouts />);
    expect(baseElement).toBeTruthy();
  });
});
