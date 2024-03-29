import { Route, Routes } from 'react-router-dom';
import CustomerRestrictPage from './components/customer-restrict-page/customer-restrict-page';
import TrainerRestrictPage from './components/trainer-restrict-page/trainer-restrict-page';
import { CreateTraining } from './pages/create-training/create-training';
import CustomerAccount from './pages/customer-account/customer-account';
import CustomerCardTrainer from './pages/customer-card-trainer/customer-card-trainer';
import CustomerCardUser from './pages/customer-card-user/customer-card-user';
import CustomerFoodDiary from './pages/customer-food-diary/customer-food-diary';
import CustomerGymCard from './pages/customer-gym-card/customer-gym-card';
import CustomerGymsCatalog from './pages/customer-gyms-catalog/customer-gyms-catalog';
import CustomerMain from './pages/customer-main/customer-main';
import CustomerMyFriends from './pages/customer-my-friends/customer-my-friends';
import CustomerMyGyms from './pages/customer-my-gyms/customer-my-gyms';
import CustomerMyPurchase from './pages/customer-my-purchase/customer-my-purchase';
import CustomerTrainingCatalog from './pages/customer-training-catalog/customer-training-catalog';
import CustomerUsersCatalog from './pages/customer-users-catalog/customer-users-catalog';
import CustomerWorkoutDiary from './pages/customer-workout-diary/customer-workout-diary';
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
        </Route>
        <Route path={ AppRoute.MyOrders } element={ <TrainerRestrictPage><TrainerMyOrders /></TrainerRestrictPage> } />
        <Route path={ AppRoute.MyFriends } element={ <TrainerRestrictPage><TrainerMyFriends /></TrainerRestrictPage> } />
      </Route>
      <Route path={ AppRoute.CustomerMain } element={ <CustomerRestrictPage><CustomerMain /></CustomerRestrictPage> } />
      <Route path={ AppRoute.CustomerWorkoutCatalog } element={ <CustomerRestrictPage><CustomerTrainingCatalog /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.WorkoutCard}/:id` } element={ <WorkoutCard /> } />
      <Route path={ AppRoute.CustomerUsersCatalog } element={ <CustomerRestrictPage><CustomerUsersCatalog /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.CustomerCardUser}/:id` } element={ <CustomerRestrictPage><CustomerCardUser /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.CustomerCardTrainer}/:id` } element={ <CustomerRestrictPage><CustomerCardTrainer /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.CustomerGymsCatalog}` } element={ <CustomerRestrictPage><CustomerGymsCatalog /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.CustomerGymCard}/:id` } element={ <CustomerRestrictPage><CustomerGymCard /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.CustomerAccount}` } element={ <CustomerRestrictPage><CustomerAccount /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.CustomerFoodDiary}` } element={ <CustomerRestrictPage><CustomerFoodDiary /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.CustomerWorkoutDiary}` } element={ <CustomerRestrictPage><CustomerWorkoutDiary /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.MyGyms}` } element={ <CustomerRestrictPage><CustomerMyGyms /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.MyFriends}` } element={ <CustomerRestrictPage><CustomerMyFriends /></CustomerRestrictPage> } />
      <Route path={ `${AppRoute.MyPurchase}` } element={ <CustomerRestrictPage><CustomerMyPurchase /></CustomerRestrictPage> } />
    </Routes>

  );
}

export default App;
