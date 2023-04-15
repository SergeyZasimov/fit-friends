import { render } from '@testing-library/react';

import CustomerSpecialWorkoutsSlider from './customer-special-workouts-slider';

describe('CustomerSpecialWorkoutsSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerSpecialWorkoutsSlider />);
    expect(baseElement).toBeTruthy();
  });
});
