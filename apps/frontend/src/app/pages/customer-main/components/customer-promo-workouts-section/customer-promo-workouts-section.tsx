import CustomerPromoWorkoutsSlider from '../customer-promo-workouts-slider/customer-promo-workouts-slider';
import PromoGym from '../promo-gym/promo-gym';


export function CustomerPromoWorkoutsSection() {
  return (
    <section className="special-offers">
      <div className="container">
        <div className="special-offers__wrapper">
          <h2 className="visually-hidden">Специальные предложения</h2>
          <CustomerPromoWorkoutsSlider />
          <PromoGym />
        </div>
      </div>
    </section>
  );
}

export default CustomerPromoWorkoutsSection;
