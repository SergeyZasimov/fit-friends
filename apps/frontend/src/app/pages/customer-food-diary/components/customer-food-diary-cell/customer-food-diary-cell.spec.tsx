import { render } from '@testing-library/react';

import CustomerFoodDiaryCell from './customer-food-diary-cell';

describe('CustomerFoodDiaryCell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerFoodDiaryCell />);
    expect(baseElement).toBeTruthy();
  });
});
