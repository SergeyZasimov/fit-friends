import { render } from '@testing-library/react';

import TrainerRestrictPage from './trainer-restrict-page';

describe('TrainerRestrictPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TrainerRestrictPage />);
    expect(baseElement).toBeTruthy();
  });
});
