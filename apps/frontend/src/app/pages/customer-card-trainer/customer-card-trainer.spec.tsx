import { render } from '@testing-library/react';

import CustomerCardTrainer from './customer-card-trainer';

describe('CustomerCardTrainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerCardTrainer />);
    expect(baseElement).toBeTruthy();
  });
});
