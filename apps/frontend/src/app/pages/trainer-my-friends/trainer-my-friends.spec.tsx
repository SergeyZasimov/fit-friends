import { render } from '@testing-library/react';

import TrainerMyFriends from './trainer-my-friends';

describe('TrainerMyFriends', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainerMyFriends />);
    expect(baseElement).toBeTruthy();
  });
});
