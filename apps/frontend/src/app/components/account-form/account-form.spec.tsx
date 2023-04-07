import { render } from '@testing-library/react';

import AccountForm from './account-form';

describe('AccountForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountForm />);
    expect(baseElement).toBeTruthy();
  });
});
