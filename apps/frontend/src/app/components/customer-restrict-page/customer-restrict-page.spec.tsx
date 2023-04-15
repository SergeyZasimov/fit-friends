import { render } from '@testing-library/react';

import CustomerRestrictPage from './customer-restrict-page';

describe('CustomerRestrictPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerRestrictPage />);
    expect(baseElement).toBeTruthy();
  });
});
