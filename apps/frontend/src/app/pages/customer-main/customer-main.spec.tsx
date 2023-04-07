import { render } from '@testing-library/react';

import CustomerMain from './customer-main';

describe('CustomerMain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerMain />);
    expect(baseElement).toBeTruthy();
  });
});
