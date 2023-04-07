import { render } from '@testing-library/react';

import Specialization from './specialization';

describe('Specialization', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Specialization />);
    expect(baseElement).toBeTruthy();
  });
});
