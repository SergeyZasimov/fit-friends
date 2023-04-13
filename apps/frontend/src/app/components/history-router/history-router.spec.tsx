import { render } from '@testing-library/react';

import HistoryRouter from './history-router';

describe('HistoryRouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HistoryRouter />);
    expect(baseElement).toBeTruthy();
  });
});
