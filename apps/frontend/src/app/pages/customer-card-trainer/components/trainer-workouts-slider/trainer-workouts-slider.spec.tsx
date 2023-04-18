import { render } from '@testing-library/react';

import TrainerWorkoutsSlider from './trainer-workouts-slider';

describe('TrainerWorkoutsSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainerWorkoutsSlider />);
    expect(baseElement).toBeTruthy();
  });
});
