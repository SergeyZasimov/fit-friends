import { render } from '@testing-library/react';

import FoodDiaryRows from './food-diary-rows';

describe('FoodDiaryRows', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FoodDiaryRows />);
    expect(baseElement).toBeTruthy();
  });
});
