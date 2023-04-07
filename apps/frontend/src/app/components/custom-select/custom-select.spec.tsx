import { render } from '@testing-library/react';

import CustomSelect from './custom-select';

describe('CustomSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomSelect />);
    expect(baseElement).toBeTruthy();
  });
});
