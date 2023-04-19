import { CreateOrder, GymParameters, OrderType, PaymentMethods, SportGym } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import { createOrder } from '../../store/features/order/api-actions';
import { getOrderRequestStatus, resetOrderRequestStatus } from '../../store/features/order/order-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { RequestStatus } from '../../utils/constants';
import { capitalizeWord, checkValueInCollection, formatPrice } from '../../utils/helpers';
import ModalOverlay from '../modal-overlay/modal-overlay';


export const PAYMENT_LOGO_SIZE = {
  'visa': { width: "58", height: "20" },
  'mir': { width: "66", height: "20" },
  'iomoney': { width: "106", height: "24" }
};

const DEFAULT_SERVICES_COST = 1000;

export interface CreateMembershipPopupProps {
  onClose: () => void,
  gym: SportGym;
  title: string;
}

export function CreateMembershipPopup({ onClose, gym, title }: CreateMembershipPopupProps) {
  const dispatch = useAppDispatch();
  const orderRequestStatus = useAppSelector(getOrderRequestStatus);
  const [ newOrder, setNewOrder ] = useState<CreateOrder>({
    orderType: OrderType.SportGym,
    amount: 1,
    paymentMethod: '',
    purchaseId: gym.id as number,
    parameters: []
  });

  useEffect(() => {
    if (orderRequestStatus === RequestStatus.Success) {
      dispatch(resetOrderRequestStatus());
      onClose();
    }
  }, [ orderRequestStatus ]);

  const increaseAmount = () => {
    const newAmount = newOrder.amount + 1;
    setNewOrder({ ...newOrder, amount: newAmount });
  };

  const decreaseAmount = () => {
    const newAmount = newOrder.amount - 1 > 1 ? newOrder.amount - 1 : 1;
    setNewOrder({ ...newOrder, amount: newAmount });
  };

  const handlePaymentMethodChange = (value: string) => {
    setNewOrder({ ...newOrder, paymentMethod: value });
  };

  const handleParametersChange = (value: string) => {
    setNewOrder({ ...newOrder, parameters: checkValueInCollection(newOrder.parameters as string[], value) });
  };

  const handleSubmit = () => {
    dispatch(createOrder(newOrder));
  };

  const totalPrice = formatPrice(gym.oneWorkoutPrice * newOrder.amount + (newOrder.parameters as string[]).length * DEFAULT_SERVICES_COST);

  return (
    <ModalOverlay onClose={ onClose } title={ title } >
      <div className="popup__content popup__content--membership">
        <div className="popup__product">
          <div className="popup__product-image">
            <picture>
              <img
                src={ gym?.photos && gym.photos[ 0 ] }
                width="98" height="80" alt={ gym.title } />
            </picture>
          </div>
          <div className="popup__product-info">
            <h3 className="popup__product-title">{ gym.title }</h3>
            <p className="popup__product-price">{ gym.oneWorkoutPrice } ₽</p>
          </div>
          <div className="popup__product-quantity">
            <p className="popup__quantity">Количество</p>
            <div className="input-quantity">
              <button
                className="btn-icon btn-icon--quantity"
                type="button"
                aria-label="minus"
                onClick={ decreaseAmount }
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-minus"></use>
                </svg>
              </button>
              <div className="input-quantity__input">
                <label>
                  <input
                    type="text"
                    value={ newOrder.amount }
                    size={ 2 }
                    readOnly
                  />
                </label>
              </div>
              <button
                className="btn-icon btn-icon--quantity"
                type="button"
                aria-label="plus"
                onClick={ increaseAmount }
              >
                <svg width="12" height="12" aria-hidden="true">
                  <use xlinkHref="#icon-plus"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <section className="services-check">
          <h4 className="services-check__title">Дополнительные услуги ({ DEFAULT_SERVICES_COST } ₽)</h4>
          <ul className="services-check__list">
            {
              GymParameters.map(item => (
                <li className="services-check__item" key={ item }>
                  <div className="custom-toggle custom-toggle--checkbox">
                    <label>
                      <input
                        type="checkbox"
                        value={ item }
                        name="parameters"
                        onChange={ () => handleParametersChange(item) }
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg></span>
                      <span className="custom-toggle__label">{ capitalizeWord(item) }</span>
                    </label>
                  </div>
                </li>
              ))
            }
          </ul>
        </section>
        <section className="payment-method">
          <h4 className="payment-method__title">Выберите способ оплаты</h4>
          <ul className="payment-method__list">
            { PaymentMethods.map(method => (
              <li className="payment-method__item" key={ method }>
                <div className="btn-radio-image">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      aria-label={ method }
                      value={ method }
                      checked={ newOrder.paymentMethod === method }
                      onChange={ () => handlePaymentMethodChange(method) }
                    />
                    <span className="btn-radio-image__image">
                      <svg
                        width={ PAYMENT_LOGO_SIZE[ method ].width }
                        height={ PAYMENT_LOGO_SIZE[ method ].height }
                        aria-hidden="true"
                      >
                        <use xlinkHref={ `#${method}-logo` }></use>
                      </svg></span>
                  </label>
                </div>
              </li>
            )) }
          </ul>
        </section>
        <div className="popup__total">
          <p className="popup__total-text">Итого</p>
          <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
            <use xlinkHref="#dash-line"></use>
          </svg>
          <div>
            <p className="popup__total-price">{ totalPrice }&nbsp;₽&nbsp;</p>
          </div>
        </div>
        <div className="popup__button">
          <button
            className="btn"
            type="button"
            onClick={ handleSubmit }
          >
            Купить
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

export default CreateMembershipPopup;
