import { render } from '@testing-library/react';

import CustomerPromoWorkoutsSlider from './customer-promo-workouts-section';

describe('CustomerPromoWorkoutsSector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerPromoWorkoutsSlider />);
    expect(baseElement).toBeTruthy();
  });
});
