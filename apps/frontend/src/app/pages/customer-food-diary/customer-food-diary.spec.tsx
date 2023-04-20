import { render } from '@testing-library/react';

import CustomerFoodDiary from './customer-food-diary';

describe('CustomerFoodDiary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerFoodDiary />);
    expect(baseElement).toBeTruthy();
  });
});
