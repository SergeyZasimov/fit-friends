import { render } from '@testing-library/react';

import CustomerScheduleForm from './customer-schedule-form';

describe('CustomerScheduleForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomerScheduleForm />);
    expect(baseElement).toBeTruthy();
  });
});
