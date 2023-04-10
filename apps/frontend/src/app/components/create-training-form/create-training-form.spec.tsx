import { render } from '@testing-library/react';

import CreateTrainingForm from './create-training-form';

describe('CreateTrainingForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateTrainingForm />);
    expect(baseElement).toBeTruthy();
  });
});
