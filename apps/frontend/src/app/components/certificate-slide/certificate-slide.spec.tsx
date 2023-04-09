import { render } from '@testing-library/react';

import CertificateSlide from './certificate-slide';

describe('CertificateSlide', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CertificateSlide />);
    expect(baseElement).toBeTruthy();
  });
});
