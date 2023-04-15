import { useEffect } from 'react';
import Header from '../../components/header/header';
import { fetchSportGyms } from '../../store/features/sport-gyms/api-actions';
import { useAppDispatch } from '../../store/store.hooks';
import CustomerLookForCompanyList from './components/customer-look-for-company-list/customer-look-for-company-list';
import CustomerPopularWorkoutsList from './components/customer-popular-workouts-list/customer-popular-workouts-list';
import CustomerPromoWorkoutsSlider from './components/customer-promo-workouts-section/customer-promo-workouts-section';
import CustomerSpecialWorkoutsSlider from './components/customer-special-workouts-slider/customer-special-workouts-slider';


export function CustomerMain() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSportGyms());
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <CustomerSpecialWorkoutsSlider />
        <CustomerPromoWorkoutsSlider />
        <CustomerPopularWorkoutsList />
        <CustomerLookForCompanyList />
      </main>
    </>
  );
}

export default CustomerMain;
