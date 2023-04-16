import { render } from '@testing-library/react';

import FilterLocation from './filter-location';

describe('FilterLocation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterLocation />);
    expect(baseElement).toBeTruthy();
  });
});
