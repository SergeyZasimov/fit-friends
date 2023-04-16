import { render } from '@testing-library/react';

import SortUserRole from './sort-user-role';

describe('SortUserRole', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SortUserRole />);
    expect(baseElement).toBeTruthy();
  });
});
