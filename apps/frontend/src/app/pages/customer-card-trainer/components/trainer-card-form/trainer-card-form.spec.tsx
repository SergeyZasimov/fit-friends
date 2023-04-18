import { render } from '@testing-library/react';

import TrainerCardForm from './trainer-card-form';

describe('TrainerCardForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainerCardForm />);
    expect(baseElement).toBeTruthy();
  });
});
