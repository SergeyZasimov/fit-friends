import { render } from '@testing-library/react';

import RangeSlider from './range-slider';

describe('RangeSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RangeSlider />);
    expect(baseElement).toBeTruthy();
  });
});
