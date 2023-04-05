import { render } from '@testing-library/react';

import QuestionnaireCoach from './questionnaire-coach';

describe('QuestionnaireCoach', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionnaireCoach />);
    expect(baseElement).toBeTruthy();
  });
});
