import { render } from '@testing-library/react';

import CertificatesPopup from './certificates-popup';

describe('CertificatesPopup', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CertificatesPopup />);
    expect(baseElement).toBeTruthy();
  });
});
