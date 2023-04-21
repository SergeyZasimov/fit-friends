import { render } from '@testing-library/react';

import CustomerMyGyms from './customer-my-gyms';

describe('CustomerMyGyms', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerMyGyms />);
    expect(baseElement).toBeTruthy();
  });
});
