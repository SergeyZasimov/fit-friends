import { render } from '@testing-library/react';

import CustomerAccount from './customer-account';

describe('CustomerAccount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerAccount />);
    expect(baseElement).toBeTruthy();
  });
});
