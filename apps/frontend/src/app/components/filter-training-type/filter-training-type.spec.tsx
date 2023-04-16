import { render } from '@testing-library/react';

import FilterTrainingType from './filter-training-type';

describe('FilterTrainingType', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterTrainingType />);
    expect(baseElement).toBeTruthy();
  });
});
