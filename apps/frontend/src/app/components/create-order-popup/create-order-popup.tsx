import { CreateOrder, OrderType, PaymentMethods, Workout } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import { createOrder } from '../../store/features/order/api-actions';
import { getOrderRequestStatus, resetOrderRequestStatus } from '../../store/features/order/order-slice';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { RequestStatus } from '../../utils/constants';
import { formatPrice } from '../../utils/helpers';
import ModalOverlay from '../modal-overlay/modal-overlay';

export interface CreateOrderPopupProps {
  onClose: () => void;
  workout?: Workout;
}

export function CreateOrderPopup({ onClose, workout }: CreateOrderPopupProps) {

  const dispatch = useAppDispatch();
  const orderRequestStatus = useAppSelector(getOrderRequestStatus);

  const [ newOrder, setNewOrder ] = useState<CreateOrder>({
    amount: 1,
    orderType: OrderType.Workout,
    purchaseId: workout?.id as number,
    paymentMethod: ''
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

  const changePaymentMethod = (method: string) => {
    setNewOrder({ ...newOrder, paymentMethod: method });
  };

  const handleSubmit = () => {
    dispatch(createOrder(newOrder));
  };

  const totalPrice = formatPrice(newOrder.amount * (workout?.price as number));

  return (
    <ModalOverlay target='buy' onClose={ onClose }>
      <div className="popup__content popup__content--purchases">
        <div className="popup__product">
          <div className="popup__product-image">
            <picture>
              <img
                src={ workout?.backgroundImage }
                width="98"
                height="80"
                alt=""
              />
            </picture>
          </div>
          <div className="popup__product-info">
            <h3 className="popup__product-title">{ workout?.title }</h3>
            <p className="popup__product-price">{ workout?.price } ₽</p>
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
                  <input type="text" value={ newOrder.amount } size={ 2 } readOnly />
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
        <section className="payment-method">
          <h4 className="payment-method__title">Выберите способ оплаты</h4>
          <ul className="payment-method__list">
            <li className="payment-method__item">
              <div className="btn-radio-image">
                <label>
                  <input
                    type="radio"
                    name="payment-purchases"
                    aria-label="Visa."
                    onChange={ () => changePaymentMethod(PaymentMethods[ 0 ]) }
                  />
                  <span className="btn-radio-image__image">
                    <svg width="58" height="20" aria-hidden="true">
                      <use xlinkHref="#visa-logo"></use>
                    </svg></span>
                </label>
              </div>
            </li>
            <li className="payment-method__item">
              <div className="btn-radio-image">
                <label>
                  <input
                    type="radio"
                    name="payment-purchases"
                    aria-label="Мир."
                    onChange={ () => changePaymentMethod(PaymentMethods[ 1 ]) }
                  />
                  <span className="btn-radio-image__image">
                    <svg width="66" height="20" aria-hidden="true">
                      <use xlinkHref="#mir-logo"></use>
                    </svg></span>
                </label>
              </div>
            </li>
            <li className="payment-method__item">
              <div className="btn-radio-image">
                <label>
                  <input
                    type="radio"
                    name="payment-purchases"
                    aria-label="Iomoney."
                    onChange={ () => changePaymentMethod(PaymentMethods[ 2 ]) }
                  />
                  <span className="btn-radio-image__image">
                    <svg width="106" height="24" aria-hidden="true">
                      <use xlinkHref="#iomoney-logo"></use>
                    </svg></span>
                </label>
              </div>
            </li>
          </ul>
        </section>
        <div className="popup__total">
          <p className="popup__total-text">Итого</p>
          <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
            <use xlinkHref="#dash-line"></use>
          </svg>
          <p className="popup__total-price">
            { totalPrice }&nbsp;₽
          </p>
        </div>
        <div className="popup__button">
          <button
            className="btn"
            type="button"
            onClick={ handleSubmit }
          >Купить</button>
        </div>
      </div>
    </ModalOverlay>
  );
}

export default CreateOrderPopup;
