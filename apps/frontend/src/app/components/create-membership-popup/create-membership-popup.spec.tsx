import { render } from '@testing-library/react';

import CreateMembershipPopup from './create-membership-popup';

describe('CreateMembershipPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateMembershipPopup />);
    expect(baseElement).toBeTruthy();
  });
});
