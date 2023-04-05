import { render } from '@testing-library/react';

import QuestionnaireUser from './questionnaire-user';

describe('QuestionnaireUser', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionnaireUser />);
    expect(baseElement).toBeTruthy();
  });
});
