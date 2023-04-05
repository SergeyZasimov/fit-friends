import { Route, Routes } from 'react-router-dom';
import Intro from './pages/intro/intro';
import QuestionnaireCoach from './pages/questionnaire-coach/questionnaire-coach';
import QuestionnaireUser from './pages/questionnaire-user/questionnaire-user';
import Register from './pages/register/register';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';

export function App() {
  return (
    <Routes>
      <Route path='/' element={ <Intro /> } />
      <Route path='sign-up' element={ <SignUp /> }>
        <Route index element={ <Register /> } />
        <Route path='questionnaire-coach' element={ <QuestionnaireCoach /> } />
        <Route path='questionnaire-user' element={ <QuestionnaireUser /> } />
      </Route>
      <Route path='sign-in' element={ <SignIn /> } />
    </Routes>

  );
}

export default App;
