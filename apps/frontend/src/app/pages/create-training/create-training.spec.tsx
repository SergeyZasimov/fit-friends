import { render } from '@testing-library/react';


describe('CreateWorkout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateWorkout />);
    expect(baseElement).toBeTruthy();
  });
});
