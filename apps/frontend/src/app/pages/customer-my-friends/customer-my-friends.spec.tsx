import { render } from '@testing-library/react';

import CustomerMyFriends from './customer-my-friends';

describe('CustomerMyFriends', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerMyFriends />);
    expect(baseElement).toBeTruthy();
  });
});
