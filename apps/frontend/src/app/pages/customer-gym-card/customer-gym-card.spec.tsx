import { render } from '@testing-library/react';

import CustomerGymCard from './customer-gym-card';

describe('CustomerGymCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerGymCard />);
    expect(baseElement).toBeTruthy();
  });
});
