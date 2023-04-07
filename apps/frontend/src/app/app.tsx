import { Route, Routes } from 'react-router-dom';
import CustomerMain from './pages/customer-main/customer-main';
import Intro from './pages/intro/intro';
import QuestionnaireCoach from './pages/questionnaire-coach/questionnaire-coach';
import QuestionnaireUser from './pages/questionnaire-user/questionnaire-user';
import Register from './pages/register/register';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import TrainerAccount from './pages/trainer-account/trainer-account';
import { AppRoute } from './utils/constants';


export function App() {
  return (
    <Routes>
      <Route path={ AppRoute.Root } element={ <Intro /> } />
      <Route path={ AppRoute.SignUp } element={ <SignUp /> }>
        <Route index element={ <Register /> } />
        <Route path={ AppRoute.QuestionnaireTrainer } element={ <QuestionnaireCoach /> } />
        <Route path={ AppRoute.QuestionnaireCustomer } element={ <QuestionnaireUser /> } />
      </Route>
      <Route path={ AppRoute.SignIn } element={ <SignIn /> } />
      <Route path={ AppRoute.TrainerAccount } element={ <TrainerAccount /> } />
      <Route path={ AppRoute.CustomerMain } element={ <CustomerMain /> } />
    </Routes>

  );
}

export default App;
