import { render } from '@testing-library/react';

import CustomerGymCardSlider from './customer-gym-card-slider';

describe('CustomerGymCardSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerGymCardSlider />);
    expect(baseElement).toBeTruthy();
  });
});
