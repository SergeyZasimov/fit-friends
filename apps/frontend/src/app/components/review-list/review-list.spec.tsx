import { render } from '@testing-library/react';

import ReviewList from './review-list';

describe('ReviewList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReviewList />);
    expect(baseElement).toBeTruthy();
  });
});
