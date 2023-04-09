import { render } from '@testing-library/react';

import LoadAvatar from './load-avatar';

describe('LoadAvatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoadAvatar />);
    expect(baseElement).toBeTruthy();
  });
});
