import { render } from '@testing-library/react';

import FilterTrainingLevel from './filter-training-level';

describe('FilterTrainingLevel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilterTrainingLevel />);
    expect(baseElement).toBeTruthy();
  });
});
