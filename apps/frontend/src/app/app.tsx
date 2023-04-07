import { Route, Routes } from 'react-router-dom';
import CustomerMain from './pages/customer-main/customer-main';
import Intro from './pages/intro/intro';
import QuestionnaireCoach from './pages/questionnaire-coach/questionnaire-coach';
import QuestionnaireUser from './pages/questionnaire-user/questionnaire-user';
import Register from './pages/register/register';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import TrainerAccount from './pages/trainer-account/trainer-account';

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
      <Route path='trainer-account' element={ <TrainerAccount /> } />
      <Route path='customer-main' element={ <CustomerMain /> } />
    </Routes>

  );
}

export default App;
