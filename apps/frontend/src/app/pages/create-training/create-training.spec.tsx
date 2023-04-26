import { render } from '@testing-library/react';
import CreateTraining from './create-training';


describe('CreateWorkout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateTraining />);
    expect(baseElement).toBeTruthy();
  });
});
