import { render } from '@testing-library/react';

import CreateReviewPopup from './create-review-popup';

describe('CreateReviewPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateReviewPopup />);
    expect(baseElement).toBeTruthy();
  });
});
