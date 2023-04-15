import { render } from '@testing-library/react';

import PromoGym from './promo-gym';

describe('PromoGym', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PromoGym />);
    expect(baseElement).toBeTruthy();
  });
});
