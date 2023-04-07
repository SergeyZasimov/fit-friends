import { render } from '@testing-library/react';

import TrainerAccount from './trainer-account';

describe('TrainerAccount', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainerAccount />);
    expect(baseElement).toBeTruthy();
  });
});
