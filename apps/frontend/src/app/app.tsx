import { Route, Routes } from 'react-router-dom';
import CustomerRestrictPage from './components/customer-restrict-page/customer-restrict-page';
import TrainerRestrictPage from './components/trainer-restrict-page/trainer-restrict-page';
import { CreateTraining } from './pages/create-training/create-training';
import CustomerMain from './pages/customer-main/customer-main';
import CustomerTrainingCatalog from './pages/customer-training-catalog/customer-training-catalog';
import Intro from './pages/intro/intro';
import QuestionnaireCoach from './pages/questionnaire-coach/questionnaire-coach';
import QuestionnaireUser from './pages/questionnaire-user/questionnaire-user';
import Register from './pages/register/register';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import TrainerAccount from './pages/trainer-account/trainer-account';
import TrainerMyFriends from './pages/trainer-my-friends/trainer-my-friends';
import TrainerMyOrders from './pages/trainer-my-orders/trainer-my-orders';
import TrainerMyWorkouts from './pages/trainer-my-workouts/trainer-my-workouts';
import WorkoutCard from './pages/workout-card/workout-card';
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
      <Route path={ AppRoute.TrainerAccount }  >
        <Route index element={ <TrainerRestrictPage><TrainerAccount /></TrainerRestrictPage> } />
        <Route path={ AppRoute.CreateWorkout } element={ <TrainerRestrictPage><CreateTraining /></TrainerRestrictPage> } />
        <Route path={ AppRoute.MyWorkouts }  >
          <Route index element={ <TrainerRestrictPage><TrainerMyWorkouts /></TrainerRestrictPage> } />
          <Route path={ `:id` } element={ <TrainerRestrictPage><WorkoutCard /></TrainerRestrictPage> } />
        </Route>
        <Route path={ AppRoute.MyOrders } element={ <TrainerRestrictPage><TrainerMyOrders /></TrainerRestrictPage> } />
        <Route path={ AppRoute.MyFriends } element={ <TrainerRestrictPage><TrainerMyFriends /></TrainerRestrictPage> } />
      </Route>
      <Route path={ AppRoute.CustomerMain } element={ <CustomerRestrictPage><CustomerMain /></CustomerRestrictPage> } />
      <Route path={ AppRoute.CustomerWorkoutCatalog } element={ <CustomerRestrictPage><CustomerTrainingCatalog /></CustomerRestrictPage> } />
    </Routes>

  );
}

export default App;
