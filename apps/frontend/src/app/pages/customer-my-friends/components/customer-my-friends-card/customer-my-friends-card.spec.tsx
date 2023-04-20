import { render } from '@testing-library/react';

import CustomerMyFriendsCard from './customer-my-friends-card';

describe('CustomerMyFriendsCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerMyFriendsCard />);
    expect(baseElement).toBeTruthy();
  });
});
