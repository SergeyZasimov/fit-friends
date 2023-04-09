import { render } from '@testing-library/react';

import CertificateSlider from './certificate-slider';

describe('CertificateSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CertificateSlider />);
    expect(baseElement).toBeTruthy();
  });
});
