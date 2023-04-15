import { render } from '@testing-library/react';

import CustomerLookForCompanyList from './customer-look-for-company-list';

describe('CustomerLookForCompanyList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerLookForCompanyList />);
    expect(baseElement).toBeTruthy();
  });
});
