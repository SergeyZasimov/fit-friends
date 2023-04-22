import { render } from '@testing-library/react';

import CustomerAccountProgress from './customer-account-progress';

describe('CustomerAccountProgress', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerAccountProgress />);
    expect(baseElement).toBeTruthy();
  });
});
