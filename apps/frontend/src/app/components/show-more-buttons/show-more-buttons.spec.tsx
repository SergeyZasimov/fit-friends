import { render } from '@testing-library/react';

import ShowMoreButtons from './show-more-buttons';

describe('ShowMoreButtons', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ShowMoreButtons />);
    expect(baseElement).toBeTruthy();
  });
});
